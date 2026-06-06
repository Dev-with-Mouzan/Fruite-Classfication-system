import io
import os
import numpy as np
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

# Initialize FastAPI app
app = FastAPI(title="Fruit Classification API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import zipfile
import json

def load_vgg_transfer_model(filepath):
    """Robust loader to bypass Keras 3 Sequential deserialization bugs."""
    z = zipfile.ZipFile(filepath)
    config = json.loads(z.read('config.json'))
    
    x = tf.keras.Input(shape=(256, 256, 3))
    curr = x
    for l in config['config']['layers'][1:]: # Skip InputLayer
        layer = tf.keras.layers.deserialize(l)
        if isinstance(curr, list):
            curr = curr[0]
        curr = layer(curr)
        
    model = tf.keras.Model(inputs=x, outputs=curr)
    
    # Extract weights temporarily and load them
    z.extract('model.weights.h5', '.')
    model.load_weights('model.weights.h5')
    if os.path.exists('model.weights.h5'):
        os.remove('model.weights.h5')
        
    return model

# Load the model
try:
    model = load_vgg_transfer_model("transfer_model.keras")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Class labels and Calories (per 100g)
CLASSES = ["Apple", "Banana", "Grape", "Mango", "Strawberry"]
NUTRITION_DATA = {
    "Apple": {"Calories": "~52 kcal", "Carbohydrates": "~13.8 g", "Dietary Fiber": "~2.4 g", "Sugars": "~10.4 g", "Protein": "~0.3 g", "Fat": "~0.2 g", "Water": "~86 g"},
    "Banana": {"Calories": "~89 kcal", "Carbohydrates": "~22.8 g", "Dietary Fiber": "~2.6 g", "Sugars": "~12.2 g", "Protein": "~1.1 g", "Fat": "~0.3 g", "Water": "~75 g"},
    "Grape": {"Calories": "~69 kcal", "Carbohydrates": "~18.1 g", "Dietary Fiber": "~0.9 g", "Sugars": "~15.5 g", "Protein": "~0.7 g", "Fat": "~0.2 g", "Water": "~81 g"},
    "Mango": {"Calories": "~60 kcal", "Carbohydrates": "~15.0 g", "Dietary Fiber": "~1.6 g", "Sugars": "~13.7 g", "Protein": "~0.8 g", "Fat": "~0.4 g", "Water": "~83 g"},
    "Strawberry": {"Calories": "~32 kcal", "Carbohydrates": "~7.7 g", "Dietary Fiber": "~2.0 g", "Sugars": "~4.9 g", "Protein": "~0.7 g", "Fat": "~0.3 g", "Water": "~91 g"}
}
IMG_SIZE = (256, 256)

def process_image(image_bytes: bytes) -> np.ndarray:
    """Read, resize, and normalize the image for the model."""
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    # Resize to the input size expected by VGG16 model
    image = image.resize(IMG_SIZE)
    
    # Convert to numpy array and normalize
    image_array = np.array(image, dtype=np.float32)
    image_array = image_array / 255.0
    
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        return JSONResponse(status_code=500, content={"error": "Model not loaded."})
    
    try:
        # Read image
        image_bytes = await file.read()
        
        # Process image
        processed_image = process_image(image_bytes)
        
        # Predict
        predictions = model.predict(processed_image)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        predicted_class = CLASSES[predicted_class_idx]
        
        return {
            "class": predicted_class,
            "confidence": confidence,
            "nutrition": NUTRITION_DATA.get(predicted_class, {}),
            "all_scores": {CLASSES[i]: float(predictions[0][i]) for i in range(len(CLASSES))}
        }
        
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

# Mount the static frontend directory
import os
frontend_path = os.path.join(os.path.dirname(__file__), "frontend")
os.makedirs(frontend_path, exist_ok=True)
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
