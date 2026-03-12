import os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

def stickerize(image_path):
    print(f"Processing {image_path}...")
    try:
        # Open and convert to RGBA
        img = Image.open(image_path).convert("RGBA")
        
        # 1. Remove Background (Floodfill from corners)
        # We need a seed point. (0,0) is usually background.
        # ImageDraw.floodfill fills a region. We want to fill with transparency.
        # Note: tolerance is hard with basic PIL floodfill.
        # Let's use a simple difference method if floodfill isn't robust enough,
        # but floodfill is best for preserving internal whites.
        
        # Create a mask image for floodfilling
        mask = Image.new('L', img.size, 0)
        draw = ImageDraw.Draw(mask)
        
        # We calculate a 'difference' image from white to use as tolerance
        bg_color = (255, 255, 255)
        diff = ImageChops.difference(img.convert('RGB'), Image.new('RGB', img.size, bg_color))
        diff = diff.convert('L')
        # Threshold: pixels close to white are black in 'diff'
        # Let's simple floodfill on the main image first
        
        ImageDraw.floodfill(img, (0, 0), (0, 0, 0, 0), thresh=30)
        ImageDraw.floodfill(img, (img.width-1, 0), (0, 0, 0, 0), thresh=30)
        ImageDraw.floodfill(img, (0, img.height-1), (0, 0, 0, 0), thresh=30)
        ImageDraw.floodfill(img, (img.width-1, img.height-1), (0, 0, 0, 0), thresh=30)
        
        # 2. Create Sticker Border
        # Get the alpha channel (silhouette of the character)
        r, g, b, a = img.split()
        
        # Dilate the alpha channel to create the border area
        # We run MaxFilter multiple times to expand the shape
        border_mask = a
        for _ in range(15): # Expand by ~15 pixels
            border_mask = border_mask.filter(ImageFilter.MaxFilter(3))
            
        # Smooth the border slightly (optional)
        # border_mask = border_mask.filter(ImageFilter.GaussianBlur(1))
        # border_mask = border_mask.point(lambda x: 255 if x > 100 else 0)

        # Create the white sticker base
        sticker_base = Image.new("RGBA", img.size, (255, 255, 255, 0))
        sticker_white = Image.new("RGBA", img.size, (255, 255, 255, 255))
        sticker_base.paste(sticker_white, (0,0), mask=border_mask)
        
        # 3. Composite original image on top
        # We need to make sure the original image is centered/placed correctly over the border
        # Since we just expanded the mask in place, usage is direct.
        sticker_base.alpha_composite(img)
        
        # Save
        sticker_base.save(image_path, "PNG")
        print(f"Saved sticker: {image_path}")

    except Exception as e:
        print(f"Failed to stickerize {image_path}: {e}")

# Process all files
mascot_dir = "public/mascots"
for f in os.listdir(mascot_dir):
    if f.endswith(".png"):
        stickerize(os.path.join(mascot_dir, f))
