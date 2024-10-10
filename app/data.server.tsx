export async function getPestisides() {
  const dummyResponse = ["Pesticide 1", "Pesticide 2", "Pesticide 3"];
  const response = dummyResponse;
  return response;
}

export async function predictCropSuccess(payload: {
  rainfall: string;
  crop: string;
  soil_type: string;
  season: string;
  pesticide: string;
}) {
  console.log(payload);
  return 100;
}
