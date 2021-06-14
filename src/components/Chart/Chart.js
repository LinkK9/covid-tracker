import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
import { Radio, Button } from "antd";

export const Chart = ({ report }) => {
  const [optionsData, setOptionsData] = useState([]);
  const [reportType, setReportType] = useState("all");
  const [chartData, setChartData] = useState([]);

  const handleReportType = (e) => {
    setReportType(e.target.value);
  };

  useEffect(() => {
    switch (reportType) {
      case "all":
        setOptionsData(report);
        break;
      case "30":
        setOptionsData(report.slice(Math.max(report.length - 30, 1)));
        break;
      case "7":
        setOptionsData(report.slice(Math.max(report.length - 7, 1)));
        break;
      default:
        setOptionsData(report);
        break;
    }
  }, [reportType, report]);

  useEffect(() => {
    const comfirmed = optionsData.map((data) => ({
      date: moment(data.Date).format("DD/MM/YYYY"),
      value: data.Confirmed,
      lineName: "Số ca nhiễm",
    }));
    const recovered = optionsData.map((data) => ({
      date: moment(data.Date).format("DD/MM/YYYY"),
      value: data.Recovered,
      lineName: "Khỏi",
    }));
    const death = optionsData.map((data) => ({
      date: moment(data.Date).format("DD/MM/YYYY"),
      value: data.Deaths,
      lineName: "Tử vong",
    }));

    setChartData(comfirmed.concat(recovered, death));
  }, [optionsData]);

  const config = {
    data: chartData,
    height: 350,
    xField: "date",
    yField: "value",
    seriesField: "lineName",
    legend: { position: "top" },
    label: {
      style: {
        fill: "#aaa",
      },
    },
    smooth: true,
    //     animation: {
    //       appear: {
    //         animation: "path-in",
    //         duration: 5000,
    //       },
    //       update: {
    //         animation: "path-in",
    //         duration: 2000,
    //       },
    //     },
    color: ["#c9302c", "#28a745", "grey"],
  };

  return (
    <div >
      <div style={{ margin: "16px 0 0", display: 'flex', justifyContent: 'center' }}>
        <Radio.Group onChange={handleReportType}>
          <Radio.Button value="all">TẤT CẢ</Radio.Button>
          <Radio.Button value="30">30 NGÀY</Radio.Button>
          <Radio.Button value="7">7 NGÀY</Radio.Button>
        </Radio.Group>
      </div>

      <Line {...config} />
    </div>
  );
};
