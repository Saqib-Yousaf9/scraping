import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const generateChartData = (label, rawData, color) => {
  const counts = {};
  rawData.forEach(item => {
    item[label]?.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });
  });

  return {
    labels: Object.keys(counts),
    datasets: [{
      label: `${label.charAt(0).toUpperCase() + label.slice(1)} Mentions`,
      data: Object.values(counts),
      backgroundColor: color,
    }]
  };
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
        }
      }
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 12
        }
      }
    },
    y: {
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

const Charts = ({ data }) => {
  const authorCounts = {};
  data.forEach(item => {
    authorCounts[item.name] = (authorCounts[item.name] || 0) + 1;
  });

  return (
    <div className="row gy-4">
      <div className="col-md-4">
        <div className="card shadow p-3">
          <h5 className="text-center mb-3 fw-bold text-primary">Author</h5>
          <Bar
            data={{
              labels: Object.keys(authorCounts),
              datasets: [{
                label: "Author Mentions",
                data: Object.values(authorCounts),
                backgroundColor: "#0d6efd",
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow p-3">
          <h5 className="text-center mb-3 fw-bold text-danger">Area</h5>
          <Bar data={generateChartData("area", data, "#dc3545")} options={chartOptions} />
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow p-3">
          <h5 className="text-center mb-3 fw-bold text-success">Person</h5>
          <Bar data={generateChartData("person", data, "#198754")} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
