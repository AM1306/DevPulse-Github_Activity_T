import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import languageColors from "../utils/languageColors";

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) {
    return <p>No language data available.</p>;
  }

  const top5 = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const data = {
    datasets: [
      {
        data: top5.map(([, bytes]) => bytes),
        backgroundColor: top5.map(([lang]) => languageColors[lang] || "#ccc"),
      },
    ],

    labels: top5.map(([lang]) => lang),
  };
  console.log("Chart data:", data);

  return (
    <div className="languageChart" style={{ width: "300px", height: "300px" }}>
      <h3>Top Languages</h3>
      <Doughnut data={data} />
    </div>
  );
}

export default LanguageChart;
