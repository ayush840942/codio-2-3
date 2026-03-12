import os
from PIL import Image

def remove_background(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        # Simple threshold for white background
        # Since the images are likely on pure white or very close to white
        bg_color = (255, 255, 255)
        tolerance = 30 

        # Using a floodfill approach would be better to avoid removing internal whites
        # but for simplicity and speed on small isolated images, corner floodfill is best.
        # However, Pillow's ImageDraw.floodfill is for drawing.
        # Let's use a simple BFS for floodfill starting from corners.
        
        width, height = img.size
        # Create a mask for visited pixels
        visited = set()
        queue = []
        
        # Start BFS from all corners if they are white
        corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        for x, y in corners:
            pixel = img.getpixel((x, y))
            if all(abs(p - 255) < tolerance for p in pixel[:3]):
                queue.append((x, y))
                visited.add((x, y))

        # BFS
        while queue:
            x, y = queue.pop(0)
            # Set pixel to transparent
            img.putpixel((x, y), (255, 255, 255, 0))

            # Check neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    neighbor_pixel = img.getpixel((nx, ny))
                    # Check if neighbor is close to white
                    if all(abs(p - 255) < tolerance for p in neighbor_pixel[:3]):
                        visited.add((nx, ny))
                        queue.append((nx, ny))

        print(f"Processed: {image_path}")
        img.save(image_path, "PNG")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

# Process all mascots
mascot_dir = "public/mascots"
if os.path.exists(mascot_dir):
    for filename in os.listdir(mascot_dir):
        if filename.endswith(".png"):
            file_path = os.path.join(mascot_dir, filename)
            remove_background(file_path)
            print(f"Removed background from {filename}")
else:
    print(f"Directory {mascot_dir} not found.")
