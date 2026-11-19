"""grid.py <out.jpg> <cols> <files...> — tiles screenshots for a quick review."""
import sys
from PIL import Image
out, cols, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(f).convert('RGB') for f in files]
W = 720 if cols == 2 else 1440 // cols
h = int(ims[0].height * W / ims[0].width)
rows = (len(ims) + cols - 1) // cols
s = Image.new('RGB', (W * cols, h * rows), 'white')
for k, im in enumerate(ims):
    s.paste(im.resize((W, int(im.height * W / im.width))), ((k % cols) * W, (k // cols) * h))
s.save(out, quality=80)
