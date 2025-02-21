import os
from PIL import Image


def convert_images_to_png(root_folder):
    # Supported image formats
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.tiff', '.webp'}

    for foldername, subfolders, filenames in os.walk(root_folder):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            file_name, file_ext = os.path.splitext(filename)

            if file_ext.lower() in image_extensions:
                new_file_path = os.path.join(foldername, file_name + ".png")

                try:
                    with Image.open(file_path) as img:
                        img.save(new_file_path, "PNG")
                    print(f"Converted: {file_path} -> {new_file_path}")
                except Exception as e:
                    print(f"Failed to convert {file_path}: {e}")


if __name__ == "__main__":
    folder_path = input("Enter the path of the folder containing images: ")
    if os.path.isdir(folder_path):
        convert_images_to_png(folder_path)
        print("Conversion complete.")
    else:
        print("Invalid folder path.")
