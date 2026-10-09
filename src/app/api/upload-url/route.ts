import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

// Matches the order form's "up to 50MB" copy.
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/tiff",
  "image/heic",
  "image/heif",
]);

function r2Config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET || "forevermemoirs-uploads";
  if (!accountId || !accessKeyId || !secretAccessKey) return null;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return { client, bucket };
}

// POST { filename, contentType, size } -> { uploadUrl, key }
// The browser PUTs the file bytes directly to R2; they never pass through
// our servers. URLs expire after 15 minutes.
export async function POST(req: Request) {
  const cfg = r2Config();
  if (!cfg) {
    // Storage not configured yet — the order form falls back to
    // metadata-only mode when it sees 503.
    return NextResponse.json({ error: "Uploads not configured" }, { status: 503 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { filename, contentType, size } = body ?? {};
  if (!filename || !contentType) {
    return NextResponse.json({ error: "filename and contentType are required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(String(contentType))) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP, TIFF, and HEIC photos are accepted" }, { status: 400 });
  }
  if (typeof size === "number" && size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Files must be under 50MB" }, { status: 400 });
  }

  const safeName = String(filename).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) || "photo";
  const key = `uploads/${randomUUID()}-${safeName}`;

  try {
    const uploadUrl = await getSignedUrl(
      cfg.client,
      new PutObjectCommand({ Bucket: cfg.bucket, Key: key, ContentType: String(contentType) }),
      { expiresIn: 900 }
    );
    return NextResponse.json({ uploadUrl, key });
  } catch (e) {
    console.error("Failed to sign upload URL:", e);
    return NextResponse.json({ error: "Could not prepare upload" }, { status: 500 });
  }
}
