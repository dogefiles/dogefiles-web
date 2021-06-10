import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getDaysInMonth } from "date-fns";
import { Heading, VStack } from "@chakra-ui/react";

export default function LineChart({ data }) {
  const [chartData, setChartData] = useState({});
  const uploadDates = data.map(d => new Date(d.createdAt).getDate());
  const numOfDaysInCurrentMonth = [
    ...Array(getDaysInMonth(new Date()) + 1).keys(),
  ].splice(1);

  let uploadData = [];

  //Create an array with 0s with a size equal to last day of month
  for (let i = 0; i < numOfDaysInCurrentMonth.length; i++) uploadData[i] = 0;

  //Plot the data from uploadDates to the uploadData on equivalent date
  for (let i = 0; i < uploadDates.length; i++)
    uploadData[uploadDates[i] - 1] = uploadData[uploadDates[i] - 1] + 1;

  const chart = () => {
    setChartData({
      labels: numOfDaysInCurrentMonth,
      datasets: [
        {
          label: `June Uploads`,
          data: uploadData,
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
    chart(); // eslint-disable-next-line
  }, [data]);

  return (
    <VStack
      width={["100%", "100%", "100%", "50%"]}
      px={[1, 1, 1, 4]}
      my={(4, 4, 4, 0)}
    >
      <Heading as="h3" fontSize="2xl">
        Uploads
      </Heading>
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Uploads Chart", display: true },
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
