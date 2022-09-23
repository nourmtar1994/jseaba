import React from "react";
import { Column } from "@ant-design/plots";

const BarChart = ({ data = [] }) => {
  const config = {
    data,
    xField: "category",
    yField: "value",

    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
      formatter: (label) => {
        return label.value + " كغ/م² ";
      },
    },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: false,
      },
    },
    yAxis: {
      minLimit: 0,
    },
    meta: {
      category: {
        alias: "الصنف",
      },
      value: {
        alias: "مؤشر الكناتة الحجمية",
      },
    },
    annotations: [
      {
        type: "arxc",
        x: 200,
        y: 200,
        content: "0000",
        background: {
          padding: 4,
          style: {
            width: "100%",
            radius: 4,
            fill: "#fff",
          },
        },
      },
    ],
    pattern: {
      type: "dot",
      cfg: {
        backgroundColor: "#e52433",
        size: 2,
        padding: 2,
        rotation: 0,
        fill: "#000",
        isStagger: true,
      },
    },
  };
  return <Column defaultInteractions={""} {...config} />;
};
export default BarChart;
