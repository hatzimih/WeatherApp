import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import compass from "../compass.svg";

function convertTimeZone(td) {
  const weekdays = [
    "Κυριακή",
    "Δευτέρα",
    "Τρίτη",
    "Τετάρτη",
    "Πέμπτη",
    "Παρασκευή",
    "Σάββατο",
  ];
  const milliseconds = td * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const fullDate = dateObject.toLocaleString(); //2019-12-9 10:30:15
  const dateOnly = dateObject.toLocaleDateString();
  const timeOnly = dateObject.toLocaleTimeString();
  const weekday = weekdays[dateObject.getDay()];

  return { fullDate, dateOnly, timeOnly, weekday };
}

function getIcon(icon_name) {
  return "http://openweathermap.org/img/wn/" + icon_name + ".png";
}

const WeatherInfo = (props) => {
  if (!props.currentWeather) return null;
  const { dateOnly } = convertTimeZone(1662473115);
  console.log(dateOnly);
  const weatherData = JSON.parse(props.currentWeather);
  console.log(weatherData);
  const daily8 = weatherData.daily;
  const curr = weatherData.current;
  const currWeather = curr.weather[0];
  console.log(currWeather);
  //const icon = currWeather.icon;
  const icon = "10d";
  const rot = 275;
  // + "," + props.next16DaysWeather);
  //{weatherData.next16DaysWeather}
  return (
    <table className="fulltable">
      <tbody>
        <tr>
          <td>
            <table id="currentForecast" className="tablecurrent">
              <thead>
                <tr>
                  <th className="thcurrent">Ο καιρός σήμερα</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tdcurrent">
                    <img
                      className="imgIcon"
                      src={`http://openweathermap.org/img/wn/${icon}.png`}
                    ></img>
                    <img
                      style={{ rotate: `${rot}deg` }}
                      className="imgCompass"
                      src={compass}
                    ></img>
                  </td>
                  <td className="tdcurrent">{currWeather.description}</td>
                  <td className="tdcurrent">{weatherData.current.humidity}</td>
                  <td className="tdcurrent">{weatherData.current.pressure}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <td>
            <table id="nextDaysForecast" className="table8days">
              <thead>
                <tr>
                  <th className="th8days">Πρόβλεψη {daily8.length} ημερών</th>
                </tr>
              </thead>
              <tbody>
                {daily8.map((f) => (
                  <tr>
                    <td className="td8days">{f.temp.day}</td>
                    <td className="td8days">{f.pressure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WeatherInfo;
