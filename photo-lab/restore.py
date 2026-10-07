#!/usr/bin/env python3
"""Restore a real customer photo with GFPGAN. Usage: restore.py <in> <out>"""
import sys, time, cv2
from gfpgan import GFPGANer

src, dst = sys.argv[1], sys.argv[2]
img = cv2.imread(src)
print(f'input: {img.shape[1]}x{img.shape[0]}', flush=True)
t0 = time.time()
restorer = GFPGANer(
    model_path='/home/hatch/workspace/photo-lab/weights/GFPGANv1.4.pth',
    upscale=2, arch='clean', channel_multiplier=2, bg_upsampler=None)
_, _, out = restorer.enhance(img, has_aligned=False, only_center_face=False, paste_back=True)
dt = time.time() - t0
cv2.imwrite(dst, out)
print(f'restored in {dt:.1f}s -> {dst}', flush=True)
