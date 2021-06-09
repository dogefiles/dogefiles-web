import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getDaysInMonth } from "date-fns";
import { Flex } from "@chakra-ui/react";

export default function LineChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: [...Array(getDaysInMonth(new Date()) + 1).keys()].splice(1),
      datasets: [
        {
          label: `June Downloads`,
          data: [
            1, 2, 3, 15, 5, 6, 0, 23, 3, 2, 1, 33, 32, 32, 4, 32, 23, 23, 32,
            23, 23, 22, 1, 32, 34, 33, 21, 42, 12, 33,
          ],
          backgroundColor: ["rgba(75, 192, 192, 0.6)"],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <Flex width="100%">
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Downloads Chart", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </Flex>
  );
}
