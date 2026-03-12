from PIL import Image, ImageDraw, ImageFont
import os
import shutil

def generate_splash():
    # Path to the official mascot
    mascot_path = "public/mascot/welcome.png"
    bg_color = "#f2e8a6" # app's cc-yellow theme
    app_name = "CODIO"
    
    img_size = (2732, 2732)
    
    try:
        if not os.path.exists(mascot_path):
            print(f"Error: Mascot not found at {mascot_path}")
            return

        # Load mascot
        mascot = Image.open(mascot_path).convert("RGBA")
        
        # Create background
        splash = Image.new("RGBA", img_size, bg_color)
        
        # Scale mascot (approx 35% of width)
        scale_factor = 0.35
        new_width = int(img_size[0] * scale_factor)
        ratio = new_width / mascot.width
        new_height = int(mascot.height * ratio)
        mascot = mascot.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Draw text "CODIO"
        draw = ImageDraw.Draw(splash)
        
        # Try to use a bold font, fallback to default
        try:
            # Common paths for default sans fonts
            font_paths = [
                "/System/Library/Fonts/Supplemental/Arial Black.ttf",
                "/System/Library/Fonts/SFNS.ttf",
                "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            ]
            font = None
            for path in font_paths:
                if os.path.exists(path):
                    font = ImageFont.truetype(path, 300)
                    break
            if not font:
                font = ImageFont.load_default()
        except:
            font = ImageFont.load_default()

        # Calculate positions
        mascot_x = (img_size[0] - new_width) // 2
        mascot_y = (img_size[1] - new_height) // 2 - 200 # Move up a bit to make room for text
        
        # Paste mascot
        splash.paste(mascot, (mascot_x, mascot_y), mascot)
        
        # Write text
        text_bbox = draw.textbbox((0, 0), app_name, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_x = (img_size[0] - text_width) // 2
        text_y = mascot_y + new_height + 50
        
        draw.text((text_x, text_y), app_name, fill="black", font=font)
        
        # Save as splash.png
        res_path = "android/app/src/main/res"
        drawables = [
            "drawable",
            "drawable-land-hdpi", "drawable-land-mdpi", "drawable-land-xhdpi", "drawable-land-xxhdpi", "drawable-land-xxxhdpi",
            "drawable-port-hdpi", "drawable-port-mdpi", "drawable-port-xhdpi", "drawable-port-xxhdpi", "drawable-port-xxxhdpi"
        ]
        
        for d in drawables:
            path = os.path.join(res_path, d)
            if os.path.exists(path):
                # Legacy splash
                file_path = os.path.join(path, "splash.png")
                # Convert back to RGB for final splash
                final_splash = Image.new("RGB", img_size, bg_color)
                final_splash.paste(splash, (0, 0), splash)
                final_splash.save(file_path, "PNG")
                print(f"Saved splash to {file_path}")
                
                # New Android 12+ splash icon (square-ish)
                if d == "drawable":
                    icon_path = os.path.join(path, "splash_icon.png")
                    # For the icon, we can use the composite splash OR just the mascot+text
                    # But the icon should be transparent background ideally for Theme.SplashScreen
                    splash.save(icon_path, "PNG")
                    print(f"Saved splash_icon to {icon_path}")
            else:
                 pass

    except Exception as e:
        print(f"Error generating splash: {e}")

if __name__ == "__main__":
    generate_splash()
