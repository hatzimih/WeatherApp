import React, { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import httpService from "../services/httpService";
import WeatherInfo from "./displayWeaτherInfo";
import { response, response1, response16 } from "../config";
import axios from "axios";

const SelectPlace = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [next16DaysWeather, setNext16DaysWeather] = useState("");
  const inputRef = useRef();

  const getCurrentWeatherData = async (lat, long) => {
    const url =
      "https://api.openweathermap.org/data/3.0/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&unit=metric&appid=" +
      process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const response = await httpService.get(url);
    return response.data;
  };

  const getNext16WeatherInfo = (lat, long) => {
    const url =
      "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" +
      lat +
      "&lon=" +
      long +
      "&unit=metric&cnt=16&appid=" +
      process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    //const response1 = await httpService.get(url);
  };

  const handlePlaceChanged = /*async*/ () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      /*const weatherData = await getCurrentWeatherData(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );*/
      const weatherData = response;
      // getNext16WeatherInfo(
      //   place.geometry.location.lat(),
      //   place.geometry.location.lng()
      // );
      console.log(weatherData);
      setCurrentWeather(JSON.stringify(weatherData));
      //setNext16DaysWeather(String(response16.city.country));
      //document.getElementById("current").innerHTML = ;
      //document.getElementById("next16").innerHTML = String(response16.city.country );
    }
  };

  return (
    <React.Fragment>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
          />
        </StandaloneSearchBox>
      </LoadScript>
      <WeatherInfo
        currentWeather={currentWeather}
        next16DaysWeather={next16DaysWeather}
      />
    </React.Fragment>
  );
};

export default SelectPlace;
