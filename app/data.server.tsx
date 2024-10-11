export async function getPestisides() {
  // console.log(process.env.ML_MODEL_URL);
  const response = await fetch(`${process.env.ML_MODEL_URL}/pesticides`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const pesticides = await response.json();
  return pesticides;
}

export async function predictCropSuccess(payload: {
  rainfall: number;
  crop: string;
  soil_type: string;
  season: string;
  pesticide: string;
}) {
  const { rainfall, crop, soil_type, season, pesticide } = payload;
  //   console.log(payload);
  const response = await fetch(`${process.env.ML_MODEL_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rainfall: rainfall,
      crop: crop,
      soil_type: soil_type,
      season: season,
      pesticide: pesticide,
    }),
  });

  const prediction_value = await response.json();
  //   console.log(prediction_value);
  return prediction_value["success_rate"] || 0;
}
