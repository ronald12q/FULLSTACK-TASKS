


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timerId = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [countdown, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(80,80,120,0.25),transparent_30%),linear-gradient(140deg,#070709_0%,#12121a_55%,#09090f_100%)] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/40 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <header className="text-center">
            <p className="text-6xl">😵‍💫</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
            <p className="mt-2 text-sm text-zinc-400">
              It looks like the route you tried to access does not exist.
            </p>
          </header>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-zinc-300">
              You will be redirected to the home page in <span className="font-semibold text-white">{countdown}</span> seconds.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
              <button
                type="button"
                className="w-full sm:w-auto rounded-2xl border border-zinc-700 bg-zinc-100 px-5 py-2 text-sm font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:bg-white"
                onClick={() => navigate("/")}
              >
                Go to home
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto text-center rounded-2xl border border-zinc-700 bg-zinc-900/40 px-5 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
              >
                Go to home now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};