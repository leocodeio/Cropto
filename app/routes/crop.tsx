import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPestisides, predictCropSuccess } from "~/data.server";

export let loader: LoaderFunction = async () => {
  const res = await getPestisides();
  return res;
};

export let action: ActionFunction = async ({ request }) => {
  const FormData = await request.formData();
  const rainfall = FormData.get("rainfall") as string;
  const crop = FormData.get("crop") as string;
  const soilType = FormData.get("soil_type") as string;
  const season = FormData.get("season") as string;
  const pesticide = FormData.get("pesticide") as string;

  const predictCropSuccessPayload = {
    rainfall,
    crop,
    soil_type: soilType,
    season,
    pesticide,
  };

  const successRate = await predictCropSuccess(predictCropSuccessPayload);
  return successRate;
};

export default function Crop() {
  const successRate: any = useActionData();
  const pesticides: any = useLoaderData();
  //   console.log(pesticides);
  const [rainfall, setRainfall] = useState(5);
  const [crop, setCrop] = useState(2);
  const [soilType, setSoilType] = useState(2);
  const [season, setSeason] = useState(2);
  const [selectedPesticide, setSelectedPesticide] = useState("");

  return (
    <div className="crop-container">
      <Form method="post">
        <label htmlFor="crop-select">Crop Type</label>
        <select
          id="crop-select"
          value={crop}
          onChange={(e) => setCrop(parseInt(e.target.value))}
        >
          <option value="1">Rice</option>
          <option value="2" defaultChecked>
            Wheat
          </option>
        </select>

        <label htmlFor="rain-fall-value">Rainfall (mm)</label>
        <input
          type="number"
          id="rain-fall-value"
          value={rainfall}
          onChange={(e) => setRainfall(parseInt(e.target.value))}
        />

        <label htmlFor="soil-type-select">Soil Type</label>
        <select
          id="soil-type-select"
          value={soilType}
          onChange={(e) => setSoilType(parseInt(e.target.value))}
        >
          <option value="1">Black Soil</option>
          <option value="2" defaultChecked>
            Red Soil
          </option>
        </select>

        <label htmlFor="season-select">Season</label>
        <select
          id="season-select"
          value={season}
          onChange={(e) => setSeason(parseInt(e.target.value))}
        >
          <option value="1">Summer</option>
          <option value="2" defaultChecked>
            Winter
          </option>
          <option value="3">Rainy</option>
        </select>

        <label htmlFor="pesticide-select">Pesticide</label>
        <div>
          <select
            id="pesticide-select"
            value={selectedPesticide}
            onChange={(e) => setSelectedPesticide(e.target.value)}
          >
            <option value="" disabled>
              Choose Pesticide
            </option>
            {pesticides.map((pesticide: string, index: number) => (
              <option key={index} value={pesticide}>
                {pesticide}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Get Success Rate</button>
      </Form>

      <div>{successRate !== null && <h2>Success Rate: {successRate}%</h2>}</div>
    </div>
  );
}
