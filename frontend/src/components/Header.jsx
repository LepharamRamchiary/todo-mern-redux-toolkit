import React from "react";

function Header() {
  return (
    <header className="bg-green-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          📝 My TODO App
        </h1>

        {/* Example: Navigation (optional) */}
        <nav className="mt-2 sm:mt-0">
          <ul className="flex space-x-4 text-sm sm:text-base">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Tasks</li>
            <li className="hover:underline cursor-pointer">About</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
