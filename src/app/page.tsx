'use client';

import { useCallback, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';

import { SqlRunner } from '@/components/SqlRunner';

type ETLRun = {
  id: number;
  run_timestamp: string;
  processed_file: string;
  valid_count: number;
  invalid_count: number
}

export default function Home() {
  const { data: session, status } = useSession();

  const [etlData, setEtlData] = useState<ETLRun[]>([]);
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [filter, setFilter] = useState("all");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    setLoadingAPI(true);
    setApiError(null);
    try {
      const res = await axios.get(`${apiUrl}/etl_runs`);
      setEtlData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiError("Error loading backend data");
    } finally {
      setLoadingAPI(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, fetchData]);

  if (status === 'loading') {
    return <main className="p-8"><h1>Checking session...</h1></main>;
  }

  if (status === 'unauthenticated') {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">Please login to view the dashboard.</p>
        <button
          onClick={() => signIn('google')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      </main>
    );
  }

  const filteredEtlData = etlData.filter((run) => {
    if (filter === "invalid") {
      return run.invalid_count > 0;
    }
    if (filter === "valid") {
      return run.invalid_count === 0;
    }
    return true; // 'all'
  });

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">ETL Dashboard</h1>
          <p className="text-gray-600">
            Welcome, {session?.user?.name} {session?.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold mb-4">Pipeline runs</h2>

      <div className="flex justify-between items-center mb-4">
        {/* Dropdown de Filtro */}
        <div>
          <label htmlFor="filter-select" className="mr-2 font-medium">
            Filter by:
          </label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All runs</option>
            <option value="valid">Valid runs</option>
            <option value="invalid">Invalid runs</option>
          </select>
        </div>
        <button
          onClick={fetchData}
          disabled={loadingAPI}
          className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          {loadingAPI ? "Loading..." : "Refresh data"}
        </button>
      </div>

      {apiError && <p className="text-red-500">{apiError}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Timestamp</th>
              <th className="py-2 px-4 border">File</th>
              <th className="py-2 px-4 border">Valids</th>
              <th className="py-2 px-4 border">Invalids</th>
            </tr>
          </thead>
          <tbody>
            { filteredEtlData.map((run) => (
              <tr key={run.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-center">{run.id}</td>
                <td className="py-2 px-4 border">{run.run_timestamp}</td>
                <td className="py-2 px-4 border">{run.processed_file}</td>
                <td className="py-2 px-4 border text-center">{run.valid_count}</td>
                <td className="py-2 px-4 border text-center">{run.invalid_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEtlData.length === 0 && etlData.length > 0 && (
          <p className="text-center py-4">
            No runs match with filter.
          </p>
        )}
      </div>

      <SqlRunner />
      {/*TODO: Implementar gráficos */ }
    </main>
  );
}
