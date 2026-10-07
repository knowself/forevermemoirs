# ForeverMemoirs 2.0

**No life story should go untold.**

ForeverMemoirs (est. Hermosa Beach, CA) produced A&E Biography-style personal documentary films for ordinary families. This is the 2.0 revival: the same promise, rebuilt on an open-source AI pipeline — no film crew, no LA-only limits, no DVDs.

## The offer ladder

| Tier | Price | What it is |
|------|-------|-----------|
| Memory Rescue | $49 | Single photo restoration, 48-hour turnaround |
| The Shoebox | $149 | 5 photos restored + 60-second video tribute with music |
| The Memoir Film | $997 | Remote Zoom interviews, AI-assisted editing, restored photos woven in |
| The Biography | $2,997 | Multi-session family interviews, full archival treatment |
| LifeCharts 2.0 | $297/yr | Families send videos all year; we cut the annual film |

## What's in this repo

The site lives at the repo root, the way our other projects are arranged:

- `src/app/` — Next.js pages (home, about, order, order API)
- `src/components/` — shared header/footer
- `public/` — static assets (`public/images/logo.jpg` is the original ForeverMemoirs logo)
- `scripts/` — `foremem.ts`, the ForeverMemoirs CLI
- `bin/` — the `foremem` executable
- `drizzle/` — database schema (Neon/PostgreSQL)
- `doc/` — offer ladder and production notes
- `photo-lab/` — open-source photo restoration pipeline (GFPGAN + CodeFormer + Real-ESRGAN). Tested: ~30s–4min per photo on CPU, $0 marginal cost. Human QC on every photo before delivery — AI must never change a face.

## The pipeline

```
Old photo in → CodeFormer (faces, fidelity-first) → Real-ESRGAN (background)
→ human QC → restored photo out → optional video tribute with original music
```

## CLI

```bash
npm install
foremem doctor              # audit the environment
foremem dev                 # start the dev server
foremem restore in.jpg out.jpg   # restore a photo with the photo-lab
```

## Setup (photo-lab)

```bash
python3 -m venv photo-lab/venv
photo-lab/venv/bin/pip install -r photo-lab/requirements.txt  # see photo-lab/README.md
```
