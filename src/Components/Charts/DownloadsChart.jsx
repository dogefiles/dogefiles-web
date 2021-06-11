import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getDaysInMonth } from "date-fns";
import { Heading, VStack } from "@chakra-ui/react";

export default function LineChart() {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: [...Array(getDaysInMonth(new Date()) + 1).keys()].splice(1),
      datasets: [
        {
          label: `June Uploads`,
          data: [
            1, 2, 3, 15, 5, 6, 0, 23, 3, 2, 1, 33, 32, 32, 4, 32, 23, 23, 32,
            23, 23, 22, 1, 32, 34, 33, 21, 42, 12, 33,
          ],
          // Line
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          borderWidth: 2.2,
          // Pointer
          pointBackgroundColor: "rgb(75, 192, 255)",
          pointBorderColor: "rgb(75, 192, 255)",
          pointStyle: "circle",
          pointHitRadius: 15,
          pointRadius: 2.2,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <VStack
      width={["100%", "100%", "100%", "50%"]}
      px={[1, 1, 1, 4]}
      my={(4, 4, 4, 0)}
    >
      <Heading as="h3" fontSize="2xl">
        Downloads
      </Heading>
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
    </VStack>
  );
}
