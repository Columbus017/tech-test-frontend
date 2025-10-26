'use client';

import { useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Se registran los componentes de chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Se define el tipo de la data que se espera
// (con mas types lo recomendable es hacer una carpeta para usar
//  el mismo tipo y no crear uno en cada archivo)
type EtlRun = {
  id: number;
  run_timestamp: string;
  processed_file: string;
  valid_count: number;
  invalid_count: number;
};

interface Props {
  data: EtlRun[];
}

export const DataCharts = ({ data }: Props) => {

  const barChartData = useMemo(() => {
    // Se utilizan los últimos 10 para que no se sature
    const recentData = data.slice(0, 10).reverse();

    return {
      labels: recentData.map((run) => `Run #${run.id}`),
      datasets: [
        {
          label: 'Valid users',
          data: recentData.map(run => run.valid_count),
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Verde
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Invalid users',
          data: recentData.map(run => run.invalid_count),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data]); // Se vuelve a calcurar únicamente si la data cambia

  const pieChartData = useMemo(() => {
    const totalValid = data.reduce((sum, run) => sum + run.valid_count, 0);
    const totalInvalid = data.reduce((sum, run) => sum + run.invalid_count, 0);

    return {
      labels: ["Total Valids", "Total Invalids"],
      datasets: [
        {
          data: [totalValid, totalInvalid],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  }, [data]); // Se vuelve a calcurar únicamente si la data cambia

  const barOptions = {
    responsive: true,
    pluggins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Valid records vs. Invalid records (Last 10 runs)' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const pieOptions = {
    responsive: true,
    pluggins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Total Distribution of Records (According to filter))'}
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Graphic resume</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfica de barras */}
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <Bar options={barOptions} data={barChartData} />
        </div>
        {/* Gráfica de pie */}
        <div className="p-4 border rounded-lg shadow-md bg-white max-h-[400px] lg:max-h-full flex justify-center items-center">
          <Pie options={pieOptions} data={pieChartData} />
        </div>
      </div>
    </div>
  )
}
