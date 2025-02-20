from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = 'autism_detection_model_deep1.h5'
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found: {model_path}")

try:
    model = load_model(model_path)
    print("Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Error loading model: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    print("Received request for prediction.")

    if 'mri_image' not in request.files or 'fmri_image' not in request.files:
        print("Error: Missing images in request.")
        return jsonify({'error': 'Both MRI and fMRI images are required'}), 400

    mri_file = request.files['mri_image']
    fmri_file = request.files['fmri_image']

    if mri_file.filename == '' or fmri_file.filename == '':
        print("Error: One or both files are not selected.")
        return jsonify({'error': 'Both MRI and fMRI images must be selected'}), 400

    os.makedirs('uploads', exist_ok=True)
    mri_path = os.path.join('uploads', mri_file.filename)
    fmri_path = os.path.join('uploads', fmri_file.filename)
    
    mri_file.save(mri_path)
    fmri_file.save(fmri_path)
    print(f"Saved MRI image: {mri_path}")
    print(f"Saved fMRI image: {fmri_path}")

    def preprocess_image(image_path):
        print(f"Preprocessing image: {image_path}")
        img = cv2.imread(image_path, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError(f"Image not found at {image_path}")
        
        target_size = (64, 64)
        img = cv2.resize(img, target_size)
        img = img.astype('float32') / 255.0
        img = np.expand_dims(img, axis=0)

        print(f"Processed image shape: {img.shape}")
        return img

    try:
        
        mri_img = preprocess_image(mri_path)
        fmri_img = preprocess_image(fmri_path)

        print("Making predictions...")
        mri_prediction = model.predict(mri_img)
        fmri_prediction = model.predict(fmri_img)

        print(f"MRI Prediction Raw Output: {mri_prediction}")
        print(f"fMRI Prediction Raw Output: {fmri_prediction}")

   
        mri_result = 'Autism' if mri_prediction[0][0] > 0.6 else 'Control'
        fmri_result = 'Autism' if fmri_prediction[0][0] > 0.6 else 'Control'

        print(f"MRI Classification Result: {mri_result}")
        print(f"fMRI Classification Result: {fmri_result}")

        final_result = mri_result
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500
    finally:
        
        try:
            os.remove(mri_path)
            os.remove(fmri_path)
            print("Temporary files removed.")
        except Exception as e:
            print(f"Error deleting temporary files: {e}")

    return jsonify({'mri_prediction': mri_result, 'fmri_prediction': fmri_result, 'final_prediction': final_result})

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    print("Starting Flask server...")
    app.run(debug=True)
