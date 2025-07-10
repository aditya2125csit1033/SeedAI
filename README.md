# 🧠 SeedAI – Autism Spectrum Disorder Detection from MRI Scans

SeedAI is an AI-powered web application for early screening of Autism Spectrum Disorder (ASD) using brain MRI scans. It integrates a deep learning model for medical image classification, a React-based user interface, and a Node.js backend with MongoDB for managing and storing patient data.

---

## 🚀 Features

- 🖼️ Upload MRI scans and receive instant predictions (ASD / Not ASD)
- 🧠 Deep learning models (Keras/TensorFlow) trained on medical imaging data
- 🌐 Intuitive frontend built with React.js
- 🗂️ Patient data management via Node.js + MongoDB
- 🧪 Supports multiple trained models for experimentation
- 🛡️ Clean project architecture with separation of concerns (UI, ML model, DB)

---

## 🛠️ Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| **Frontend** | React.js, HTML5, CSS3                |
| **Backend**  | Python (Flask), Node.js, Express.js  |
| **ML Models**| TensorFlow/Keras (.h5, .keras)       |
| **Database** | MongoDB                              |

---

## 📁 Folder Structure

SeedAI/ │ ├── Model/          # Python backend and trained models │   ├── app.py      # Flask API for ASD prediction │   ├── *.h5        # Trained Keras models │ ├── MongoDB/        # Node.js backend for user/data management │   ├── package.json │   └── src/ │ ├── ui/             # React frontend │   ├── public/ │   ├── src/ │   ├── package.json

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/aditya2125csit1033/SeedAI.git
cd SeedAI
```

---

2. 🔧 Backend – Model (Python Flask)

> Make sure you have Python ≥3.8 and pip installed.


```bash
cd Model
pip install -r requirements.txt  # create this if missing
python app.py
```
Model will serve predictions at http://localhost:5000/



---

3. 💾 MongoDB Backend – Node.js

> Requires Node.js and MongoDB running locally or via Atlas.


```bash
cd MongoDB
npm install
npm start
```
Runs Express backend for user/data handling at http://localhost:4000/



---

4. 🌐 Frontend – React App

> Make sure Node.js is installed.


```bash
cd ui
npm install
npm start
```
Open the frontend at http://localhost:3000/



---

🧪 How It Works

1. User uploads an MRI image from the frontend.


2. Image is sent to the Python model API (/predict) which returns a classification.


3. Results are displayed in the frontend and optionally saved to MongoDB.




---

📌 Future Enhancements

Dockerize the full stack for seamless deployment

Add authentication & role-based access

Enhance model performance with more datasets

Integrate cloud deployment (AWS/GCP)



---
