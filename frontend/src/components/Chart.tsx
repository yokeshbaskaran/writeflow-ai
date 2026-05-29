import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
);

interface ContentItem {
  _id: string;
  user_email: string;
  content_type: string;
  words_created: number;
  created_at: string;
}

interface ChartProps {
  contents: ContentItem[];
}

export const LineChart = ({ contents }: ChartProps) => {
  const chartData = useMemo(() => {
    const dailyWords: Record<string, number> = {};

    contents.forEach((item) => {
      const date = new Date(item.created_at).toISOString().split("T")[0];

      dailyWords[date] = (dailyWords[date] || 0) + item.words_created;
    });

    const sortedDates = Object.keys(dailyWords).sort();

    return {
      labels: sortedDates.map((date) =>
        new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
      ),

      datasets: [
        {
          label: "Words Generated",

          data: sortedDates.map((date) => dailyWords[date]),

          borderColor: "#693EE0",

          backgroundColor: "rgba(105,62,224,0.15)",

          fill: true,
          tension: 0.4,

          pointRadius: 4,
          pointHoverRadius: 6,

          pointBackgroundColor: "#693EE0",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [contents]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#111827",
        borderColor: "#693EE0",
        borderWidth: 1,

        callbacks: {
          label: (context) => `${context.parsed.y} words`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#9CA3AF",
        },

        border: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#9CA3AF",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-text text-base">Usage Overview</h2>

        <select className="px-3 py-2 rounded-xl text-text-muted border border-border bg-bg">
          <option>Words</option>
        </select>
      </div>

      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export const DoughnutChart = ({ contents }: ChartProps) => {
  const chartData = useMemo(() => {
    const typeCounts: Record<string, number> = {};

    contents.forEach((item) => {
      typeCounts[item.content_type] =
        (typeCounts[item.content_type] || 0) + item.words_created;
    });

    return {
      labels: Object.keys(typeCounts),

      datasets: [
        {
          data: Object.values(typeCounts),

          backgroundColor: [
            "#693EE0",
            "#4F7CFF",
            "#4FD1C5",
            "#F59E0B",
            "#EF4444",
            "#D1D5DB",
          ],

          borderWidth: 0,
        },
      ],
    };
  }, [contents]);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "72%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#9CA3AF",
          padding: 20,
          usePointStyle: true,
        },
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} words`,
        },
      },
    },
  };

  return (
    <>
      <h2 className="font-medium text-text text-base mb-3">Content By Type</h2>

      <div className="h-80">
        <Doughnut data={chartData} options={options} />
      </div>
    </>
  );
};
