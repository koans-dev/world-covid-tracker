import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  AppBar,
  Typography,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyStat } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfos, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState([34.80746, 40.479]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountires] = useState([]);

  //https://disease.sh/v3/covid-19/countries/{country}

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setTableData(data);
          setMapCountires(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);

        console.log("in setMapCenter", mapCenter);
      });
  };
  //https://disease.sh/v3/covid-19/all
  //https://disease.sh//v3/covid-19/countries/{country

  const styles = (theme) => ({
    root: {
      background: "blue",
    },
    whiteColor: {
      color: "white",
    },
  });

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <AppBar position="static">
            <Typography variant="h3" component="h3" color="#fff">
              World Covid-19 Tracker
            </Typography>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onChangeCountry}
                value={country}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </AppBar>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="COVID Cases"
            cases={prettyStat(countryInfos.todayCases)}
            total={prettyStat(countryInfos.cases)}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyStat(countryInfos.todayRecovered)}
            total={prettyStat(countryInfos.recovered)}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyStat(countryInfos.todayDeaths)}
            total={prettyStat(countryInfos.deaths)}
          ></InfoBox>
        </div>
        <div className="app__map">
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h1>Live Cases by country</h1>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
 
    </div>
  );
}

export default App;
