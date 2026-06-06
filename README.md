# Fruit Classification API & Web Application ![Overview Icon](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/overview_icon_1780723762913.png)

---

## 📖 Overview
This project delivers a **professional, production‑ready** machine‑learning web application that classifies fruit images and returns detailed nutritional information. Leveraging **Transfer Learning** with **VGG16** (via **TensorFlow/Keras**) the model achieves high accuracy across five fruit categories.

---

## ⚙️ System Architecture ![Architecture Icon](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/architecture_icon_1780723778533.png)

### Backend – FastAPI ![FastAPI](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/fastapi_icon_1780723924158.png)
- High‑performance asynchronous API server
- CORS middleware for seamless frontend integration
- Image preprocessing with **Pillow** and **NumPy**

### Model – TensorFlow/Keras ![TensorFlow](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/tensorflow_icon_1780723936855.png) ![Keras](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/keras_icon_1780723950911.png)
- Transfer learning with **VGG16** backbone
- Optimized loading via custom deserialization

### Frontend – HTML/CSS/JavaScript ![HTML5](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/html5_icon_1780723957120.png) ![CSS3](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/css3_icon_1780723958258.png) ![JavaScript](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/javascript_icon_1780723959711.png)
- Responsive UI for image upload and result display
- Dynamic charts for probability distribution

---

## 🛠️ Tech Stack ![Python](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/python_icon_1780723910547.png)
| Category | Technology |
|---|---|
| **Language** | Python |
| **Web Framework** | FastAPI |
| **Server** | uvicorn |
| **Deep Learning** | TensorFlow, Keras (VGG16) |
| **Image Processing** | Pillow, NumPy |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Version Control** | Git |
| **Deployment (optional)** | Docker |

---

## 📂 Project Structure
```
Fruite/
├── frontend/               # Static web assets (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── Dataset/                # Raw & processed images
├── transfer_model.keras    # Pre‑trained VGG16 weights
├── main.py                 # FastAPI entry point
├── requirements.txt        # Python dependencies
└── README.md               # Documentation (this file)
```

---

## 🚀 Setup & Installation
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Fruite
   ```
2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   # or source .venv/bin/activate for Unix
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```
5. **Open the UI**: `http://localhost:8000/`

---

## � API Endpoints
- `GET /health` – Health check, returns `{ "status": "healthy", "model_loaded": true }`
- `POST /predict` – Accepts an image file and returns:
  ```json
  {
    "class": "Apple",
    "confidence": 0.97,
    "probabilities": {"Apple":0.97, "Banana":0.01, ...},
    "nutrition": {"calories":52, "carbs":14, ...}
  }
  ```

---

## 📊 Nutritional Data
The API provides per‑100 g nutritional metrics for each fruit, including calories, carbs, fiber, sugars, protein, fat, and water.

---

## 📚 Academic Relevance
- **Computer Vision in Agriculture** – Automated fruit identification.
- **Transfer Learning** – Demonstrates fine‑tuning of a pretrained CNN.
- **Model Deployment** – Shows end‑to‑end pipeline from notebook training to production API.

---

## 📜 License
This project is licensed under the MIT License.

---

*Created with ❤️ using Python, FastAPI, TensorFlow, and modern web technologies.* ![Overview Icon](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/overview_icon_1780723762913.png)

## Overview
This project is an end-to-end Machine Learning web application designed to classify images of fruits and provide real-time nutritional information. Using Deep Learning (Convolutional Neural Networks and Transfer Learning with VGG16), the system can accurately identify five different classes of fruits and deliver essential dietary details to the user through an intuitive web interface.

This repository contains the model training pipeline, the FastAPI backend server, and the web frontend.

---

## 🧠 Model Architecture & Methodology

### Deep Learning Approach
The core of this project relies on **Transfer Learning** using the **VGG16** architecture, a powerful Convolutional Neural Network (CNN) pre-trained on the ImageNet dataset. By leveraging VGG16, the model benefits from learned feature representations of millions of images, which significantly improves accuracy and reduces training time for our specific fruit classification task.

### Classes
The model has been trained to classify the following five fruits:
1. Apple
2. Banana
3. Grape
4. Mango
5. Strawberry

### Model Loading & Optimization
The system uses a custom, robust deserialization method to load the pre-trained `transfer_model.keras`. This bypasses common Keras Sequential deserialization bugs, ensuring high availability and seamless integration between the deep learning model and the API backend.

---

## ⚙️ System Architecture ![Architecture Icon](file:///C:/Users/Mouzan%20Raza/.gemini/antigravity-ide/brain/73636887-661b-41e4-a4a7-8f9ebd88f9ca/architecture_icon_1780723778533.png)

### Backend: FastAPI
The backend is built using **FastAPI**, providing a high-performance, asynchronous web server. 
- **CORS Middleware**: Configured to allow cross-origin requests, ensuring the frontend can communicate seamlessly with the API.
- **Image Processing**: Incoming image bytes are processed using `Pillow (PIL)` and `NumPy`. The images are resized to `256x256`, converted to RGB, normalized (scaled between 0 and 1), and expanded to include a batch dimension before being fed into the model.

### Frontend: HTML/CSS/JS
The frontend is a static web interface served directly by the FastAPI backend. It provides a user-friendly way to upload images and view:
- The predicted fruit class.
- The confidence score of the prediction.
- A breakdown of all class probabilities.
- Detailed nutritional information.

---

## 🍏 Nutritional Data Integration
Beyond simple classification, this application serves as a dietary tool by returning estimated nutritional data (per 100g) for the predicted fruit. 

Tracked nutritional metrics include:
- Calories (kcal)
- Carbohydrates (g)
- Dietary Fiber (g)
- Sugars (g)
- Protein (g)
- Fat (g)
- Water (g)

---

## 🚀 API Endpoints

### 1. `GET /health`
Used to check the status of the server and verify if the deep learning model has been loaded successfully into memory.
- **Response**: `{"status": "healthy", "model_loaded": true}`

### 2. `POST /predict`
The main inference endpoint. Expects a `multipart/form-data` request containing an image file.
- **Input**: Image file (`UploadFile`)
- **Output**: JSON payload containing the predicted class, confidence score, full probability distribution, and nutritional metadata.

---

## 📂 Project Structure

```text
Fruite/
│
├── frontend/                                   # Frontend web application
│   ├── index.html                              # Main UI
│   ├── styles.css                              # Styling and layout
│   └── script.js                               # API integration and dynamic updates
│
├── Dataset/                                    # Raw and processed image datasets
├── transfer_model.keras                        # Pre-trained VGG16 model weights and architecture
├── fruit-classification-using-cnn-and-vgg16.ipynb # Jupyter Notebook containing training and evaluation code
├── main.py                                     # FastAPI application entry point
├── requirements.txt                            # Python dependencies
└── README.md                                   # Project documentation
```

---

## 💻 Setup and Installation

### Prerequisites
- Python 3.8+
- pip (Python Package Installer)

### Installation Steps

1. **Clone the repository / Navigate to the directory:**
   ```bash
   cd /path/to/Fruite
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server:**
   ```bash
   python main.py
   ```
   *(Alternatively, run using uvicorn directly: `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`)*

5. **Access the application:**
   - Web UI: `http://localhost:8000/`
   - API Docs (Swagger): `http://localhost:8000/docs`

---

## 🎓 Academic Thesis Relevance
This project can serve as a robust practical implementation for a thesis covering:
- **Computer Vision in Agriculture/Dietetics**: Automating the identification of food items and fetching dietary metadata.
- **Transfer Learning Efficacy**: Demonstrating how VGG16 can be fine-tuned for specific multi-class classification tasks with limited data.
- **Model Deployment**: Showcasing how to transition a trained model from a Jupyter Notebook environment into a production-ready RESTful API using FastAPI and a dynamic web frontend.
