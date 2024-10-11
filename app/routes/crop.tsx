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

  return (
    <div className="h-full w-screen bg-black pt-[200px] p-12 text-white flex flex-col items-center justify-center gap-8 lg:h-screen lg:flex-row">
      <Form
        method="post"
        className="custom-shadow  space-y-4  border border-2 border-white p-8 rounded-[30px]"
      >
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="crop-select"
            className="text-lg font-semibold font-montserrat"
          >
            crop
          </label>
          <select
            id="crop-select"
            name="crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className=" custom-shadow  w-3/6 h-12 bg-black text-white border border-red-600 border-[2wepx] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="rain-fall-value"
            className="text-lg font-semibold font-montserrat"
          >
            rainfall (mm)
          </label>
          <input
            type="number"
            id="rain-fall-value"
            name="rainfall"
            value={rainfall}
            onChange={(e) => setRainfall(parseInt(e.target.value))}
            className="custom-shadow  w-3/6 h-12 bg-black text-white border border-red-600 border-[2wepx] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="soil-type-select"
            className="text-lg font-semibold font-montserrat"
          >
            soil
          </label>
          <select
            id="soil-type-select"
            name="soil_type"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="custom-shadow  w-3/6 h-12 bg-black text-white border border-red-600 border-[2wepx] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="black">Black Soil</option>
            <option value="red">Red Soil</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="season-select"
            className="text-lg font-semibold font-montserrat"
          >
            season
          </label>
          <select
            id="season-select"
            name="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="custom-shadow  w-3/6 h-12 bg-black text-white border border-red-600 border-[2wepx] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="rainy">Rainy</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-2 ">
          <label
            htmlFor="pesticide-select"
            className="text-lg font-semibold font-montserrat "
          >
            pesticide
          </label>
          <select
            id="pesticide-select"
            name="pesticide"
            value={selectedPesticide}
            onChange={(e) => setSelectedPesticide(e.target.value)}
            className="custom-shadow w-3/6 h-12 bg-black text-white border border-red-600 border-[2wepx] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
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
        <div className="w-full flex pt-8 items-center justify-center">
          <button
            type="submit"
            className="custom-shadow btn bg-black text-red-600 border-[2.5px] border-red-600 Z py-3 px-6 rounded-full transition-transform hover:bg-white hover:text-black hover:shadow-lg"
          >
            Get Success Rate
          </button>
        </div>
      </Form>

      <div className="mt-6 text-center text-xl flex flex-col items-center justify-center">
        <FaStar color="red" size={25} />
        Success Rate:
        {JSON.stringify(successRate)}%
      </div>
    </div>
  );
}
