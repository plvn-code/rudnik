"""Contact sheet: sheet.py <out.jpg> <files...> — labels each tile with its filename."""
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
T = 300; cols = 6
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * T, rows * (T + 18)), 'white')
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    try:
        im = Image.open(f).convert('RGB'); im.thumbnail((T, T))
    except Exception:
        continue
    x, y = (i % cols) * T, (i // cols) * (T + 18)
    sheet.paste(im, (x, y)); d.text((x + 3, y + T + 3), f.split('/')[-1][:44], fill='black')
sheet.save(out, quality=82)
