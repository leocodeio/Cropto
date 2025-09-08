import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "cropto | credit" },
    { name: "description", content: "Welcome to catalyst!" },
  ];
};

export const loader: LoaderFunction = async () => {
  return redirect("/crop");
};

export default function Index() {
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center text-center font-sans p-4">
      <p className="bg-white">
        Welcome - developed by catalyst community -
        <a href="https://github.com/leocodeio" className="bg-white">
          <b className="bg-white">@leocodeio</b>
        </a>
      </p>
      <Link
        className="bg-white border border-2 border-black px-2 py-1 rounded"
        to="/crop"
      >
        Home
      </Link>
    </div>
  );
}
