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
    <section className="flex flex-col items-center justify-center text-center py-20 gap-8">
      <div className="space-y-6 max-w-2xl">
        <h1 className="heading-xl">Predict Crop Success Intelligently</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Data‑driven insights for agriculture. Enter variables like rainfall, soil type, season and pesticides to estimate success probability and guide better planning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/crop" className="btn-primary w-full sm:w-auto">
            Get Started
          </Link>
          <a
            href="https://github.com/leocodeio"
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full sm:w-auto"
          >
            GitHub
          </a>
        </div>
        <p className="muted">
          Built by the catalyst community — <span className="font-medium text-red-600 dark:text-red-400">@leocodeio</span>
        </p>
      </div>
    </section>
  );
}
