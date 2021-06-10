import "./App.css";
import moment from "moment";
import "moment/locale/vi";
import Title from "antd/lib/typography/Title";
import { Typography } from "antd";
import "antd/dist/antd.css";
import { CountrySelector } from "./components/CountrySelector/CountrySelector";
import { useCallback, useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./components/apis/API";
import { sortBy } from "lodash";

const { Text } = Typography;
moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySelectedID, setCountrySelectedID] = useState("vietnam");
  const [covidReport, setCovidReport] = useState([]);
  const [summary, setSummary] = useState([]);

  const handleOnChange = (e) => {
    setCountrySelectedID(e);
  };

  // const summary =

  useEffect(() => {
    // getCountries().then((res) => setCountries(res.data));
    // console.log(countries);
    const fetchData = async () => {
      const data = await getCountries();
      console.log("datasoirted", sortBy(data.data, "Country"));
      setCountries(sortBy(data.data, "Country"));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getReport = async () => {
      const data = await getReportByCountry(countrySelectedID);
      setCovidReport(data.data);
    };
    getReport();
  }, [countrySelectedID]);

  useEffect(() => {
    console.log("report", covidReport);
  }, [covidReport]);

  return (
    <div className="wrapper">
      <div className="header">
        <Title>Số liệu Covid-19</Title>
        <Text level={4}>{moment().format("LLL")}</Text>
      </div>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} />
    </div>
  );
}

export default App;
