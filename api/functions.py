import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
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

# Predict crop success rate
def predict_crop_success(rainfall, crop, soil_type, season, pesticide):
    # Load the model and label mappings
    model = load_model()
    label_mappings = load_label_mappings()

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
