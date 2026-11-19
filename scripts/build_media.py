"""Build web media from research/raw (downloaded from rudnik.ua through the browser, see scripts/dl.js).

Usage: <venv>/bin/python -I scripts/build_media.py <project-root> [images|video|all]

- portfolio/NN.*      -> public/images/portfolio/NN.webp   (photos of finished objects, <=1600 px)
- site/*, render/*    -> public/images/{site,render}/*.webp (render PNGs keep their transparency)
- parts/<sys>/*.png   -> public/images/parts/<sys>/*.webp   (component cut-outs, <=720 px, trimmed)
- partners/*          -> public/images/partners/*.webp
- brand/*.svg         -> public/brand/
- video-prod.mp4      -> public/video/production.mp4 (H.264 720x1280, ~5 Mbit -> ~1.3 Mbit) + poster
Writes src/lib/media.json: { "<public path>": [w, h] } for every image.
"""
import glob, json, os, shutil, subprocess, sys
from PIL import Image

root = os.path.abspath(sys.argv[1])
what = sys.argv[2] if len(sys.argv) > 2 else 'all'
RAW = os.path.join(root, 'research/raw')
PUB = os.path.join(root, 'public')


def save(im, out, limit, q=80):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.thumbnail((limit, limit), Image.LANCZOS)
    im.save(out, 'WEBP', quality=q, method=6)


def photo(src, out, limit=1600, q=78):
    im = Image.open(src)
    if im.mode in ('RGBA', 'LA', 'P') and not has_alpha(im):
        im = im.convert('RGB')
    elif im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    save(im, out, limit, q)


def has_alpha(im):
    if im.mode == 'P':
        im = im.convert('RGBA')
    if im.mode not in ('RGBA', 'LA'):
        return False
    return im.getchannel('A').getextrema()[0] < 250


def cutout(src, out, limit, q=82, pad=0.04):
    """Transparent render: crop to the visible object, keep alpha."""
    im = Image.open(src).convert('RGBA')
    box = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    if box:
        x0, y0, x1, y1 = box
        p = int(max(x1 - x0, y1 - y0) * pad)
        im = im.crop((max(0, x0 - p), max(0, y0 - p), min(im.width, x1 + p), min(im.height, y1 + p)))
    save(im, out, limit, q)


def images():
    for f in sorted(glob.glob(f'{RAW}/portfolio/*.*')):
        n = os.path.splitext(os.path.basename(f))[0]
        photo(f, f'{PUB}/images/portfolio/{n}.webp')
    for f in sorted(glob.glob(f'{RAW}/site/*.*')):
        n = os.path.splitext(os.path.basename(f))[0]
        photo(f, f'{PUB}/images/site/{n}.webp')
    for f in sorted(glob.glob(f'{RAW}/render/*.*')):
        n = os.path.splitext(os.path.basename(f))[0]
        im = Image.open(f)
        if has_alpha(im):
            cutout(f, f'{PUB}/images/render/{n}.webp', 1400)
        else:
            photo(f, f'{PUB}/images/render/{n}.webp', 1400)
    for f in sorted(glob.glob(f'{RAW}/parts/*/*.png')):
        sysname = os.path.basename(os.path.dirname(f))
        n = os.path.splitext(os.path.basename(f))[0]
        cutout(f, f'{PUB}/images/parts/{sysname}/{n}.webp', 720)
    for f in sorted(glob.glob(f'{RAW}/partners/*.*')):
        n = os.path.splitext(os.path.basename(f))[0]
        cutout(f, f'{PUB}/images/partners/{n}.webp', 360, q=90, pad=0.0)
    os.makedirs(f'{PUB}/brand', exist_ok=True)
    for f in glob.glob(f'{RAW}/brand/*.svg'):
        shutil.copy(f, f'{PUB}/brand/')
    sizes()


def sizes():
    out = {}
    for f in sorted(glob.glob(f'{PUB}/images/**/*.webp', recursive=True)):
        with Image.open(f) as im:
            out['/' + os.path.relpath(f, PUB)] = [im.width, im.height]
    with open(f'{root}/src/lib/media.json', 'w') as fh:
        json.dump(out, fh, indent=0, ensure_ascii=False)
    print('media.json', len(out))


def video():
    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    src = f'{RAW}/video-prod.mp4'
    os.makedirs(f'{PUB}/video', exist_ok=True)
    run = lambda *a: subprocess.run([ff, '-y', '-loglevel', 'error', *a], check=True)
    run('-i', src, '-vf', 'scale=720:-2,fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', f'{PUB}/video/production.mp4')
    tmp = f'{RAW}/poster.png'
    run('-ss', '3', '-i', src, '-frames:v', '1', '-vf', 'scale=720:-2', tmp)
    photo(tmp, f'{PUB}/images/site/video-poster.webp', 1280)
    sizes()


if what in ('images', 'all'):
    images()
if what in ('video', 'all'):
    video()
if what == 'sizes':
    sizes()
