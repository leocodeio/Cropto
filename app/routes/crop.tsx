import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPestisides, predictCropSuccess } from "~/data.server";

export let loader: LoaderFunction = async () => {
  const res = await getPestisides();
  return res;
};

export let action: ActionFunction = async ({ request }) => {
  const FormData = (await request.formData()) as any;
  const rainfall = FormData.get("rainfall");
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
  const [rainfall, setRainfall] = useState(50);
  const [crop, setCrop] = useState("rice");
  const [soilType, setSoilType] = useState("black");
  const [season, setSeason] = useState("winter");
  const [selectedPesticide, setSelectedPesticide] = useState("none");

  return (
    <div className="crop-container">
      <Form method="post">
        <label htmlFor="crop-select">Crop Type</label>
        <select
          id="crop-select"
          name="crop"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        >
          <option value="rice">Rice</option>
          <option value="wheat" defaultChecked>
            Wheat
          </option>
        </select>

        <label htmlFor="rain-fall-value">Rainfall (mm)</label>
        <input
          type="number"
          id="rain-fall-value"
          name="rainfall"
          value={rainfall}
          onChange={(e) => setRainfall(parseInt(e.target.value))}
        />

        <label htmlFor="soil-type-select">Soil Type</label>
        <select
          id="soil-type-select"
          name="soil_type"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
        >
          <option value="black">Black Soil</option>
          <option value="red" defaultChecked>
            Red Soil
          </option>
        </select>

        <label htmlFor="season-select">Season</label>
        <select
          id="season-select"
          name="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="summer">Summer</option>
          <option value="winter" defaultChecked>
            Winter
          </option>
          <option value="rainy">Rainy</option>
        </select>

        <label htmlFor="pesticide-select">Pesticide</label>
        <div>
          <select
            id="pesticide-select"
            name="pesticide"
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

      <div>Success Rate: {JSON.stringify(successRate)}%</div>
    </div>
  );
}
