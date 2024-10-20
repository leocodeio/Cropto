from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Define the FastAPI app
app = FastAPI()

# Define the request body model
class CropInput(BaseModel):
    rainfall: float
    crop: str
    soil_type: str
    season: str
    pesticide: str

import json
import numpy as np
import pandas as pd
import joblib

# Load the model
def load_model(model_path='./model/model.pkl'):
    model = joblib.load(model_path)
    return model

# Load label mappings
def load_label_mappings(mapping_path='./model/label_mappings.json'):
    with open(mapping_path, 'r') as json_file:
        label_mappings = json.load(json_file)
    return label_mappings

label_mappings = load_label_mappings()
# Predict crop success rate
def predict_crop_success(rainfall, crop, soil_type, season, pesticide):
    # Load the model and label mappings
    model = load_model()

    # Prepare the input for prediction
    crop_encoded = label_mappings['crop'][crop]
    soil_type_encoded = label_mappings['soil_type'][soil_type]
    season_encoded = label_mappings['season'][season]
    pesticide_encoded = label_mappings['pesticide'][pesticide]

    # Create input DataFrame
    input_data = pd.DataFrame({
        'rainfall': [rainfall],
        'crop': [crop_encoded],
        'soil_type': [soil_type_encoded],
        'season': [season_encoded],
        'pesticide': [pesticide_encoded]
    })

    # Make prediction
    prediction = model.predict(input_data)
    return prediction[0]


# Create the /predict endpoint
@app.post("/predict")
def predict_crop(input: CropInput):
    try:
        prediction = predict_crop_success(
            rainfall=input.rainfall,
            crop=input.crop,
            soil_type=input.soil_type,
            season=input.season,
            pesticide=input.pesticide
        )
        return {"success_rate": prediction}
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred during prediction.")

# Run the app (uncomment to run the server directly)
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get("/")
def read_root():
    return {"Hello": "World!"}

@app.get("/pesticides")
def read_pesticides():
    pestside_map = label_mappings['pesticide']
    pesticides = list(pestside_map.keys())
    return pesticides