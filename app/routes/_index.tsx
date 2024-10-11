import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "Catalyst-com" },
    { name: "description", content: "Welcome to catalyst!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center font-sans p-4">
      Welcome - developed by catalyst community -<b>@leocodeio</b>
      <Link
        className="border border-2 border-black px-2 py-1 rounded"
        to="/crop"
      >
        Home
      </Link>
    </div>
  );
}
