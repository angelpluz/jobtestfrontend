'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Assignment Portal
      </h1>

      <div className="space-y-4 w-full max-w-md">
        <Link href="/assignment1">
          <div className="block w-full p-4 bg-blue-100 hover:bg-blue-200 rounded shadow text-center cursor-pointer font-semibold">
            🧩 Assignment 1: Auto Delete Todo List
          </div>
        </Link>

        <Link href="/assignment2">
          <div className="block w-full p-4 bg-green-100 hover:bg-green-200 rounded shadow text-center cursor-pointer font-semibold">
            📊 Assignment 2: Grouped User Data (API)
          </div>
        </Link>
      </div>
    </main>
  );
}
