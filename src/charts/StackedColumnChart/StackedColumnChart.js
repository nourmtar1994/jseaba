import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";

const StackedColumnChart = ({ chartData }) => {
  const [data, setData] = useState([
    {
      year: "1991",
      value: 3,
      type: "Lon",
    },
    {
      year: "1992",
      value: 4,
      type: "Lon",
    },
    {
      year: "1993",
      value: 3.5,
      type: "Lon",
    },
    {
      year: "1994",
      value: 5,
      type: "Lon",
    },
    {
      year: "1995",
      value: 4.9,
      type: "Lon",
    },
    {
      year: "1996",
      value: 6,
      type: "Lon",
    },
    {
      year: "1997",
      value: 7,
      type: "Lon",
    },
    {
      year: "1998",
      value: 9,
      type: "Lon",
    },
    {
      year: "1999",
      value: 13,
      type: "Lon",
    },
    {
      year: "1991",
      value: 3,
      type: "Bor",
    },
    {
      year: "1992",
      value: 4,
      type: "Bor",
    },
    {
      year: "1993",
      value: 3.5,
      type: "Bor",
    },
    {
      year: "1994",
      value: 5,
      type: "Bor",
    },
    {
      year: "1995",
      value: 4.9,
      type: "Bor",
    },
    {
      year: "1996",
      value: 6,
      type: "Bor",
    },
    {
      year: "1997",
      value: 7,
      type: "Bor",
    },
    {
      year: "1998",
      value: 9,
      type: "Bor",
    },
    {
      year: "1999",
      value: 13,
      type: "Bor",
    },
  ]);

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const config = {
    data,
    isStack: true,
    xField: "category",
    yField: "value",
    seriesField: "type",
    dir: "rtl",
    yAxis: {
      min: 0,
      max: 20,
    },
    color: ["#143F6B", "#e52433", "#FEB139"],

    legend: {
      layout: "horizontal",
      position: "top",
    },
    label: {
      position: "middle",
      formatter: (item) => {
        return item.type + " (" + item.value * 3 + ")";
      },
      // 'top', 'bottom', 'middle'
    },

    tooltip: {
      formatter: (item) => {
        return { title: item.title, name: item.type, value: item.value * 3 };
      },
    },
  };

  return <Column width={"100%"} {...config} />;
};
export default StackedColumnChart;
