from PIL import Image, ImageDraw, ImageFont
import os

# Tamaños que debe incluir un .ico completo
SIZES = [(16,16), (24,24), (32,32), (48,48), (64,64), (128,128), (256,256)]

# Crear la imagen base en 256x256 con fondo verde y una "P"
base = Image.new('RGBA', (256, 256), (45, 74, 50, 255))
draw = ImageDraw.Draw(base)

# Degradado decorativo (opcional): círculo claro al centro
for i in range(100, 0, -1):
    alpha = int(60 * (i / 100))
    color = (74, 124, 89, alpha)
    draw.ellipse([128-i, 128-i, 128+i, 128+i], fill=color)

# Texto
try:
    font = ImageFont.truetype("arial.ttf", 170)
except OSError:
    font = ImageFont.load_default()

# Centrar el texto
text = "P"
bbox = draw.textbbox((0, 0), text, font=font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]
x = (256 - text_w) // 2 - bbox[0]
y = (256 - text_h) // 2 - bbox[1] - 10

draw.text((x, y), text, fill=(255, 248, 220, 255), font=font)

# Guardar como .ico multi-resolución
base.save("icon.ico", format='ICO', sizes=SIZES)
print(f"✅ icon.ico creado en {os.path.abspath('icon.ico')}")
print(f"   Tamaños incluidos: {SIZES}")