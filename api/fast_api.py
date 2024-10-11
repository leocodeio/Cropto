from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from functions import predict_crop_success

# Define the FastAPI app
app = FastAPI()

# Define the request body model
class CropInput(BaseModel):
    rainfall: float
    crop: str
    soil_type: str
    season: str
    pesticide: str

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
