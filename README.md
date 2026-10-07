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

- `photo-lab/` — open-source photo restoration pipeline (GFPGAN + CodeFormer + Real-ESRGAN). Tested: ~30s–4min per photo on CPU, $0 marginal cost. Human QC on every photo before delivery — AI must never change a face.
- `jingle/` — open-source 15-second jingle composer (numpy + ffmpeg, no samples, no GPU). Every tribute video gets its own music.
- `brand/` — the original ForeverMemoirs logo.
- `docs/` — offer ladder and production notes.

## The pipeline

```
Old photo in → CodeFormer (faces, fidelity-first) → Real-ESRGAN (background)
→ human QC → restored photo out → optional video tribute with original music
```

## Setup (photo-lab)

```bash
python3 -m venv venv && source venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install gfpgan realesrgan
# download GFPGANv1.4.pth from https://github.com/TencentARC/GFPGAN/releases
# optional: CodeFormer for max fidelity → https://github.com/sczhou/CodeFormer
python restore.py input.jpg output.jpg
```

## License

TBD — to be chosen by the founder.
