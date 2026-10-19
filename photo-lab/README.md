# Photo Lab

Open-source photo restoration for the Memory Rescue ($49) tier.

## Models

| Model | Job | Notes |
|-------|-----|-------|
| GFPGAN v1.4 | Face restoration, fidelity-first | Best identity preservation; ~30s/photo on CPU — QC required |
| Real-ESRGAN | Background upscaling | Non-face regions |

**Rule: human eyes on every photo before it ships.** AI rebuilds detail; it must never change who the person is.

## Scripts

- `restore.py` — `python restore.py <input> <output>`: GFPGAN restore with 2x upscale.

## Setup

```bash
python3 -m venv venv && source venv/bin/activate
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install gfpgan realesrgan
```

Download `GFPGANv1.4.pth` from https://github.com/TencentARC/GFPGAN/releases into `weights/`.
