from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

MODEL_PATH = "waste_classifier_model.h5"
model = load_model(MODEL_PATH)

# IMPORTANT: Set folder names in same order as during training
class_labels = ['hazardous', 'non_recyclable', 'organic', 'recyclable']  

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    img_file = request.files['file']
    img_path = "temp.jpg"
    img_file.save(img_path)

    img = image.load_img(img_path, target_size=(150, 150))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    result = class_labels[np.argmax(predictions)]

    os.remove(img_path)
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
