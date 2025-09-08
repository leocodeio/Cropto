import { FaRegSnowflake } from "react-icons/fa";
import ThemeToggle from "~/components/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold tracking-wide text-lg">
          <span className="relative inline-flex items-center gap-1">
            <span className="text-gray-900 dark:text-gray-100">C</span>
            <span className="text-gray-900 dark:text-gray-100">R</span>
            <FaRegSnowflake className="text-red-600" size={18} />
            <span className="text-gray-900 dark:text-gray-100">P</span>
            <span className="text-gray-900 dark:text-gray-100">T</span>
            <FaRegSnowflake className="text-red-600" size={18} />
          </span>
          <span className="text-xs font-normal uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">beta</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
