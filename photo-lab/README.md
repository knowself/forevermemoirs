# Photo Lab

Open-source photo restoration for the Memory Rescue ($49) tier.

## Models

| Model | Job | Notes |
|-------|-----|-------|
| CodeFormer (`w=1.0`) | Face restoration, fidelity-first | Best identity preservation; ~4 min/photo on CPU |
| GFPGAN v1.4 | Face restoration, fast path | ~30s/photo on CPU; can smooth fine detail — QC required |
| Real-ESRGAN | Background upscaling | Non-face regions |

**Rule: human eyes on every photo before it ships.** AI rebuilds detail; it must never change who the person is.

## Scripts

- `restore.py` — `python restore.py <input> <output>`: GFPGAN fast-path restore with 2x upscale.

## Setup

```bash
python3 -m venv venv && source venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install gfpgan realesrgan
```

Download `GFPGANv1.4.pth` from https://github.com/TencentARC/GFPGAN/releases into `weights/`.
For CodeFormer (max fidelity): clone https://github.com/sczhou/CodeFormer — facelib ships inside the repo; you need `lpips` too.
