import "./App.css";
import moment from "moment";
import "moment/locale/vi";
import Title from "antd/lib/typography/Title";
import { Typography } from "antd";
import "antd/dist/antd.css";
import { CountrySelector } from "./components/CountrySelector/CountrySelector";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./components/apis/API";
import { sortBy } from "lodash";
import { Highlight } from "./components/Highlight/Highlight";
import { Chart } from "./components/Chart/Chart";

const { Text } = Typography;
moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelectedID, setCountrySelectedID] = useState("vietnam");
  const [covidReport, setCovidReport] = useState([]);

  const handleOnChange = (e) => {
    setCountrySelectedID(e);
  };

  useEffect(() => {
    // getCountries().then((res) => setCountries(res.data));
    // console.log(countries);
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(sortBy(data.data, "Country"));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getReport = async () => {
      const data = await getReportByCountry(countrySelectedID);
      data.data.pop();
      setCovidReport(data.data);
    };
    getReport();
  }, [countrySelectedID]);
  
  let summary =[];
  if (covidReport.length) {
    console.log("report", covidReport);
    const lastData = covidReport[covidReport.length - 1];
    console.log('lastdata',lastData);
    summary = [
      {
        title: "Số ca nhiễm",
        count: lastData.Confirmed,
        type: "confirmed",
      },
      {
        title: "Khỏi",
        count: lastData.Recovered,
        type: "recovered",
      },
      {
        title: "Tử vong",
        count: lastData.Deaths,
        type: "death",
      },
    ];
  }

  return (
    <div className="wrapper">
      <div className="header">
        <Title>Số liệu Covid-19</Title>
        <Text type='secondary' level={4}>{moment().format("LLL")}</Text>
      </div>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} />
      <Highlight summary={summary} />
      <Chart report={covidReport} />
    </div>
  );
}

export default App;
