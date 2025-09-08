import { useTheme } from "~/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-gray-900 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "light" ? (
        <FaMoon className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
      ) : (
        <FaSun className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
      )}
      <span className="pointer-events-none absolute -inset-px rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_4px_16px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_16px_-2px_rgba(0,0,0,0.4)]" aria-hidden />
    </button>
  );
}