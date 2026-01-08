from flask import Flask, request, send_file, jsonify, render_template
from rembg import remove
from PIL import Image
import os, uuid, io

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "frontend/templates"),
    static_folder=os.path.join(BASE_DIR, "frontend/static")
)

@app.route("/")
def home():
    return render_template("index.html")  # serve your frontend HTML

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "image" not in request.files:
        return "No image uploaded", 400

    # Open uploaded image
    image = Image.open(request.files["image"].stream).convert("RGBA")

    # Remove background
    result = remove(image)

    # Save result in memory buffer
    buf = io.BytesIO()
    result.save(buf, format="PNG")
    buf.seek(0)

    # Send the image directly as response
    return send_file(buf, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=False)
