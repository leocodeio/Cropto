import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getPestisides, predictCropSuccess } from "~/data.server";
import { FaStar } from "react-icons/fa";

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
  console.log(successRate);
  return successRate;
};

export default function Crop() {
  const successRate: any = useActionData() as string;
  const pesticides: any = useLoaderData();
  const [rainfall, setRainfall] = useState(50);
  const [crop, setCrop] = useState("rice");
  const [soilType, setSoilType] = useState("black");
  const [season, setSeason] = useState("winter");
  const [selectedPesticide, setSelectedPesticide] = useState("none");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [count, setCount] = useState(4);
  const handleSubmit = () => {
    setIsButtonDisabled(true);
    setCount(4);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          setIsButtonDisabled(false);
          clearInterval(interval);
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-full grid gap-12 lg:grid-cols-[minmax(0,560px)_1fr]">
      <Form
        method="post"
        onSubmit={handleSubmit}
        className="card p-8 space-y-8"
      >
        <header className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Input Variables</h2>
          <p className="muted">
            Provide the environmental and cultivation parameters below. The model
            will estimate a success probability.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="crop-select" className="label">
              Crop
            </label>
            <select
              id="crop-select"
              name="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="select"
            >
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="rain-fall-value" className="label">
              Rainfall (mm)
            </label>
            <input
              type="number"
              id="rain-fall-value"
              name="rainfall"
              value={rainfall}
              onChange={(e) => setRainfall(parseInt(e.target.value) || 0)}
              className="input"
              min={0}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="soil-type-select" className="label">
              Soil Type
            </label>
            <select
              id="soil-type-select"
              name="soil_type"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="select"
            >
              <option value="black">Black Soil</option>
              <option value="red">Red Soil</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="season-select" className="label">
              Season
            </label>
            <select
              id="season-select"
              name="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="select"
            >
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="rainy">Rainy</option>
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="pesticide-select" className="label">
              Pesticide
            </label>
            <select
              id="pesticide-select"
              name="pesticide"
              value={selectedPesticide}
              onChange={(e) => setSelectedPesticide(e.target.value)}
              className="select"
            >
              <option value="none">None</option>
              {pesticides.map((pesticide: string, index: number) => (
                <option key={index} value={pesticide}>
                  {pesticide}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="btn-primary"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Please wait… ${count}` : "Get Success Rate"}
          </button>
        </div>
        <p className="muted text-xs">
          Model output is an estimation only. Always validate with local agronomic
          expertise before large-scale decisions.
        </p>
      </Form>
      <aside className="space-y-6">
        <div className="card p-6 space-y-4 w-full max-w-sm">
          <div className="flex items-center gap-3">
            <FaStar className="text-red-600" size={22} />
            <h3 className="font-semibold tracking-tight">Success Rate</h3>
          </div>
          <div
            className="min-h-[88px] flex items-center justify-center rounded-md bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700"
            aria-live="polite"
          >
            {successRate ? (
              <span className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-500 to-orange-400 dark:from-red-400 dark:via-red-500 dark:to-orange-300 text-transparent bg-clip-text">
                {`${JSON.stringify(successRate).substring(0, 4)}%`}
              </span>
            ) : (
              <span className="muted">Run a prediction to see results</span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
