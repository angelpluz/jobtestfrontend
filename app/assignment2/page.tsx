'use client';

import { useEffect, useState } from 'react';

export default function GroupedUsersPage() {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/group-users')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#eef1f5] p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2">
        <span>👥</span> Grouped Users by Department
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Object.entries(data).map(([dept, value]) => (
          <div
            key={dept}
            className="rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* header bar */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-2xl px-5 py-3">
              <h2 className="text-lg font-semibold tracking-wide">{dept}</h2>
            </div>

            <div className="p-5 text-sm text-gray-700 space-y-2">
              <p><strong>👨‍💼 Male:</strong> {value.male}</p>
              <p><strong>👩‍💼 Female:</strong> {value.female}</p>
              <p><strong>🎂 Age Range:</strong> {value.ageRange}</p>

              <div className="mt-4">
                <p className="font-medium text-gray-600 mb-1">💇 Hair Colors:</p>
                <ul className="list-disc list-inside pl-4">
                  {Object.entries(value.hair).map(([color, count]) => (
                    <li key={color}>{color}: {count}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-600 mb-1">🏡 Address Users:</p>
                <ul className="list-disc list-inside pl-4">
                  {Object.entries(value.addressUser).map(([name, code]) => (
                    <li key={name}>{name}: {code}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
