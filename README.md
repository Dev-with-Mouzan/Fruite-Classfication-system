<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#f97316" opacity="0.15"/>
    <circle cx="50" cy="50" r="42" fill="#f97316" opacity="0.3"/>
    <circle cx="50" cy="50" r="36" fill="#22c55e" opacity="0.4"/>
    <path d="M50 20 Q60 35 50 50 Q40 35 50 20Z" fill="#ef4444"/>
    <path d="M40 30 Q30 40 35 50 Q45 40 40 30Z" fill="#facc15"/>
    <path d="M60 28 Q68 36 62 46 Q55 36 60 28Z" fill="#f97316"/>
    <ellipse cx="50" cy="58" rx="20" ry="16" fill="#22c55e"/>
    <path d="M50 40 L50 60" stroke="#166534" stroke-width="2"/>
    <path d="M50 50 L35 45" stroke="#166534" stroke-width="1.5"/>
    <path d="M50 48 L62 42" stroke="#166534" stroke-width="1.5"/>
  </svg>
</p>

<h1 align="center">Fruit Classification API & Web Application</h1>

<p align="center">
  <strong>Deep Learning fruit recognition with real-time nutritional insights</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=flat-square&logo=tensorflow&logoColor=white" alt="TensorFlow">
  <img src="https://img.shields.io/badge/VGG16-Transfer%20Learning-673AB8?style=flat-square" alt="VGG16">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status">
</p>

---

## Overview

A production-grade machine learning web application that classifies fruit images and returns detailed nutritional data. Built on **transfer learning** with **VGG16**, the system achieves high accuracy across five fruit categories through a complete end-to-end pipeline — from model training to RESTful API deployment.

This repository contains the model training notebook, the FastAPI backend, and a responsive web frontend.

---

## Key Features

<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> &nbsp;**Accurate Classification** — Identifies Apple, Banana, Grape, Mango, and Strawberry with high confidence  
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> &nbsp;**Nutritional Data** — Per-100g breakdown including calories, carbs, fiber, sugars, protein, fat, and water  
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> &nbsp;**Interactive Web UI** — Upload images and view predictions with probability distribution charts  
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> &nbsp;**FastAPI Backend** — Asynchronous, CORS-enabled, with auto-generated Swagger docs

---

## Tech Stack

| Category | Technology |
|---|---|
| <img src="https://img.shields.io/badge/-Language-333?style=flat-square" alt=""> | **Python 3.8+** |
| <img src="https://img.shields.io/badge/-Web%20Framework-333?style=flat-square" alt=""> | **FastAPI** with **Uvicorn** |
| <img src="https://img.shields.io/badge/-Deep%20Learning-333?style=flat-square" alt=""> | **TensorFlow / Keras** — VGG16 Transfer Learning |
| <img src="https://img.shields.io/badge/-Image%20Processing-333?style=flat-square" alt=""> | **Pillow**, **NumPy** |
| <img src="https://img.shields.io/badge/-Frontend-333?style=flat-square" alt=""> | **HTML5**, **CSS3**, **JavaScript** |
| <img src="https://img.shields.io/badge/-Deployment-333?style=flat-square" alt=""> | **Docker** (optional) |

---

## Project Structure

```
Fruite/
├── frontend/                          # Web application assets
│   ├── index.html                     # Main user interface
│   ├── styles.css                     # Layout and styling
│   └── script.js                      # API integration & dynamic UI
├── Dataset/                           # Raw and processed images
├── transfer_model.keras               # Pre-trained VGG16 model
├── fruit-classification-using-cnn-and-vgg16.ipynb  # Training notebook
├── main.py                            # FastAPI server entry point
├── requirements.txt                   # Python dependencies
└── README.md
```

---

## Model Architecture

The core classifier uses **VGG16** — a 16-layer convolutional neural network pre-trained on ImageNet. Transfer learning adapts these rich feature representations to our five-class fruit classification task, delivering strong accuracy with limited training data.

<table>
  <tr>
    <td align="center"><b>Input</b></td>
    <td align="center"><b>Backbone</b></td>
    <td align="center"><b>Head</b></td>
    <td align="center"><b>Output</b></td>
  </tr>
  <tr>
    <td>256×256×3 RGB</td>
    <td>VGG16 (frozen)</td>
    <td>Fine-tuned classifier</td>
    <td>5 fruit classes</td>
  </tr>
</table>

A custom deserialization routine bypasses Keras 3 Sequential loading issues, ensuring reliable model deployment.

---

## API Endpoints

### `GET /health`

Returns server status and model availability.

```json
{ "status": "healthy", "model_loaded": true }
```

### `POST /predict`

Accepts a multipart image upload and returns the classification result.

**Request:** `multipart/form-data` with an image file  
**Response:**

```json
{
  "class": "Apple",
  "confidence": 0.97,
  "all_scores": { "Apple": 0.97, "Banana": 0.01, "Grape": 0.01, "Mango": 0.01, "Strawberry": 0.00 },
  "nutrition": {
    "Calories": "~52 kcal",
    "Carbohydrates": "~13.8 g",
    "Dietary Fiber": "~2.4 g",
    "Sugars": "~10.4 g",
    "Protein": "~0.3 g",
    "Fat": "~0.2 g",
    "Water": "~86 g"
  }
}
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Fruite

# Create virtual environment
python -m venv .venv
# Windows: .venv\Scripts\activate
# Unix:   source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

### Access the Application

| Service | URL |
|---|---|
| **Web UI** | `http://localhost:8000/` |
| **Swagger Docs** | `http://localhost:8000/docs` |
| **Health Check** | `http://localhost:8000/health` |

---

## Nutritional Reference

Nutritional values are displayed per 100 g of edible fruit:

| Nutrient | Apple | Banana | Grape | Mango | Strawberry |
|---|---|---|---|---|---|
| **Calories** | ~52 kcal | ~89 kcal | ~69 kcal | ~60 kcal | ~32 kcal |
| **Carbs** | ~13.8 g | ~22.8 g | ~18.1 g | ~15.0 g | ~7.7 g |
| **Fiber** | ~2.4 g | ~2.6 g | ~0.9 g | ~1.6 g | ~2.0 g |
| **Sugars** | ~10.4 g | ~12.2 g | ~15.5 g | ~13.7 g | ~4.9 g |
| **Protein** | ~0.3 g | ~1.1 g | ~0.7 g | ~0.8 g | ~0.7 g |
| **Fat** | ~0.2 g | ~0.3 g | ~0.2 g | ~0.4 g | ~0.3 g |
| **Water** | ~86 g | ~75 g | ~81 g | ~83 g | ~91 g |

---

## Academic Relevance

- **Computer Vision in Agriculture** — Automated fruit identification for dietary tracking
- **Transfer Learning** — Fine-tuning a pre-trained CNN for domain-specific classification
- **Model Deployment** — End-to-end pipeline from Jupyter notebook to production API

---

## License

This project is licensed under the **MIT License**.

---

<p align="center">
  <sub>Built with Python, FastAPI, TensorFlow, and modern web technologies.</sub>
</p>
