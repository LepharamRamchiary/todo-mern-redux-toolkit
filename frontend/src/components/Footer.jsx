import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <p className="text-sm">
          © 2025 My TODO App | Built with <span className="text-red-500">❤️</span>
        </p>

        {/* Example: Footer links (optional) */}
        <div className="mt-2 sm:mt-0 flex space-x-4">
          <a href="#" className="hover:text-white text-sm transition">Privacy</a>
          <a href="#" className="hover:text-white text-sm transition">Terms</a>
          <a href="#" className="hover:text-white text-sm transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
