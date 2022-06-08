import React from "react";
import numeral from "numeral"
import { Circle, Popup } from "react-leaflet";
 
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 200,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 315, 29, 0.5)",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 400,
    },
  };

  export const prettyStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";  


export const showDataOnMap = (data , casesType)=> (data.map (country =>(
<Circle

center={[country.countryInfo.lat , country.countryInfo.long]}
pathOptions={
{color:casesTypeColors[casesType].hex,
fillColor:casesTypeColors[casesType].hex}}
 fillOpacity={0.4}
radius={
    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier} 
>
<Popup>
 <div className="info-container" >
 <div
      className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          >
          </div>
          <div calssName="info-name"> Name: {country.country}</div>
    <div calssName="info-confirmed">  Cases: {numeral(country.cases).format("0,0")}</div>
    <div calssName="info-recovered">   Recovered: {numeral(country.recovered).format("0,0")}</div>
    <div calssName="info-death">    Deaths: {numeral(country.deaths).format("0,0")}</div>
   
    
</div>
</Popup>
</Circle>
))
);