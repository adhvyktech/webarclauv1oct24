import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Web AR Platform
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/ar-viewer" className="hover:underline">
              AR Viewer
            </Link>
          </li>
          <li>
            <Link href="/save-experience" className="hover:underline">
              Save Experience
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;