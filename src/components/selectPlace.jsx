import React, { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import httpService from "../services/httpService";
import WeatherInfo from "./displayWeaτherInfo";
import Autocomplete from "react-google-autocomplete";

const SelectPlace = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [selectPlace, setSelectedPlace] = useState("");
  const inputRef = useRef();

  const getCurrentWeatherData = async (lat, long) => {
    const url =
      "https://api.openweathermap.org/data/3.0/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&units=metric&appid=" +
      process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const response = await httpService.get(url);
    return response.data;
  };

  const handlePlaceChanged = async () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setSelectedPlace(place.formatted_address);
      const weatherData = await getCurrentWeatherData(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      setCurrentWeather(JSON.stringify(weatherData));
    }
  };

  return (
    <React.Fragment>
      {/* <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            id="input1"
            type="text"
            className="form-control"
            placeholder="Select a place "
          />
        </StandaloneSearchBox>
      </LoadScript> */}
      <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        style={{ width: "90%" }}
        onPlaceSelected={async (place, inputRef, autocomplete) => {
          setSelectedPlace(place.formatted_address);
          const weatherData = await getCurrentWeatherData(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
          setCurrentWeather(JSON.stringify(weatherData));
        }}
        options={
          {
            //types: ["(regions)"],
            // componentRestrictions: { country: "ru" },
          }
        }
        //defaultValue="Amsterdam"
      />
      ;
      <WeatherInfo currentWeather={currentWeather} place={selectPlace} />
    </React.Fragment>
  );
};

export default SelectPlace;
