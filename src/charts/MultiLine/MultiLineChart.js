import React, { useState, useEffect } from "react";

import { Line } from "@ant-design/plots";

const MultiLineChart = () => {
  const [data, setData] = useState([
    {
      year: "السداسي 1",
      value: 1500,
      category: "ضباط",
    },
    {
      year: "السداسي 2",
      value: 1800,
      category: "ضباط",
    },

    {
      year: "المعدل العام",
      value: 1800,
      category: "ضباط",
    },
  ]);

  const COLOR_PLATE_10 = [
    "#E8684A",
    "#F6BD16",
    "#5AD8A6",
    "#5B8FF9",
    "#5D7092",
    "#6DC8EC",
    "#9270CA",
    "#FF9D4D",
    "#269A99",
    "#FF99C3",
  ];
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }) => {
        return category === "ضباط الصف" ? "square" : "circle";
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
        };
      },
    },
  };

  return <Line {...config} />;
};

export default MultiLineChart;
