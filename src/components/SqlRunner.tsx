'use client';

import { useState } from 'react'
import axios from 'axios';

type SqlResult = {
  columns: string[];
  rows: Record<string, any>[];
}

export const SqlRunner = () => {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM processed_users LIMIT 5;")
  const [sqlResult, setSqlResult] = useState<SqlResult | null>(null)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSqlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    setSqlResult(null);

    try {
      // Llamamos al endpoint que creamos en el backend
      const response = await axios.post(`${apiUrl}/query_sql`, {
        query: sqlQuery,
      });
      setSqlResult(response.data);
    } catch (error: any) {
      console.error("Error running SQL query:", error);
      // 'error.response.data.detail' es el mensaje de error de FastAPI
      setApiError(error.response?.data?.detail || "Error executing query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Execute SQL Query</h2>
      <form onSubmit={handleSqlSubmit} className="flex items-center gap-4 mb-4">
        <label htmlFor="sql-input" className="font-bold">
          SQL:
        </label>
        <input
          id="sql-input"
          type="text"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="grow p-2 border rounded font-mono"
          placeholder="SELECT * FROM processed_users..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Executing..." : "Submit"}
        </button>
      </form>

      {apiError && <p className="text-red-500 font-bold">{apiError}</p>}

      {sqlResult && sqlResult.rows.length > 0 && (
        <div className="overflow-x-auto">
          <p className="mb-2 text-sm text-gray-600">
            Results: {sqlResult.rows.length} rows
          </p>
          <table className="min-w-full bg-white border table-auto">
            <thead className="bg-gray-100">
              <tr>
                {/* Cabeceras dinámicas */}
                {sqlResult.columns.map((colName) => (
                  <th key={colName} className="py-2 px-4 border">
                    {colName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Filas dinámicas */}
              {sqlResult.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {/* Celdas dinámicas */}
                  {sqlResult.columns.map((colName) => (
                    <td key={colName} className="py-2 px-4 border text-sm">
                      {/* Convertimos objetos/listas a JSON para verlos */}
                      {typeof row[colName] === 'object' 
                        ? JSON.stringify(row[colName]) 
                        : row[colName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sqlResult && sqlResult.rows.length === 0 && (
        <p>The query returned no results.</p>
      )}
    </div>
  )
}