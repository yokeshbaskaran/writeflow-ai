import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Words",
        data: [6000, 13000, 21000, 16000, 25000, 20000, 34000],

        borderColor: "#693EE0",

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, "rgba(105,62,224,0.4)");
          gradient.addColorStop(1, "rgba(105,62,224,0)");

          return gradient;
        },

        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#693EE0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <>
      <div className="p-1 flex items-center justify-between mb-3">
        <h2 className="font-medium text-text text-base">Usage Overview</h2>

        <select className="px-3 py-2 rounded-xl text-text-muted border border-border bg-bg">
          <option>Words</option>
        </select>
      </div>

      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

import { ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const data = {
    labels: ["LinkedIn", "Blog", "Twitter", "Other"],

    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ["#693EE0", "#4F7CFF", "#4FD1C5", "#D1D5DB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "72%",

    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "right" as const,

        labels: {
          color: "#9ca3af",
          padding: 20,
        },
      },
    },
  };

  return (
    <>
      <h2 className="font-medium text-text text-base mb-3">Content By Type</h2>

      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
};
