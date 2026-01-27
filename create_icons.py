from PIL import Image
import os

# Create directories
densities = {
    'mdpi': 48,
    'hdpi': 72,
    'xhdpi': 96,
    'xxhdpi': 144,
    'xxxhdpi': 192
}

base_path = 'android/app/src/main/res'
# Using the logo-robot.jpg as the source
source_path = 'public/logo-robot.jpg'

if not os.path.exists(source_path):
    print(f"Error: Source image {source_path} not found!")
    exit(1)

source_img = Image.open(source_path)

# Ensure the source is square or handle padding if needed
# For simplicity, we'll just resize it to the required launcher sizes.
# Most launcher icons are square, potentially with rounded corners handled by Android.

for density, size in densities.items():
    dir_path = os.path.join(base_path, f'mipmap-{density}')
    os.makedirs(dir_path, exist_ok=True)
    
    # Resize image with high-quality resampling
    img = source_img.resize((size, size), Image.Resampling.LANCZOS)
    
    icon_path = os.path.join(dir_path, 'ic_launcher.png')
    # Save as PNG to support transparency if we had any (though JPG doesn't)
    img.save(icon_path, 'PNG')
    
    # Also create the round icon version which is common in Android
    round_icon_path = os.path.join(dir_path, 'ic_launcher_round.png')
    img.save(round_icon_path, 'PNG')
    
    print(f'Created {icon_path} and {round_icon_path}')

print('All launcher icons updated with the robot logo!')
