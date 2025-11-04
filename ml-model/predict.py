# predict.py
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
model = load_model("model.h5")
classes = ['Recyclable', 'Organic', 'Non-Recyclable']

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    img = image.load_img(file_path, target_size=(150,150))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_index = np.argmax(prediction)
    result = {
        "type": classes[class_index],
        "confidence": float(np.max(prediction))
    }
    return jsonify(result)

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(port=5001)
