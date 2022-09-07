import React from "react";
import { Stack, Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import compass from "../compass.svg";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#dedede",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#96D4D4",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  verticalAlign: "middle ",
  color: theme.palette.text.secondary,
  width: 100,
}));

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function convertTimeZone(td) {
  const milliseconds = td * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const fullDate = dateObject.toLocaleString(); //2019-12-9 10:30:15
  const dateOnly = dateObject.toLocaleDateString();
  const timeOnly = dateObject.toLocaleTimeString("en-US", { hour12: false });
  const weekday = weekdays[dateObject.getDay()];
  const dayAndMonth =
    weekday +
    ", " +
    dateObject.getUTCDate() +
    "/" +
    (dateObject.getMonth() + 1);
  const dayAndDate = `${weekday}, ${dateOnly}`;
  return { fullDate, dateOnly, timeOnly, weekday, dayAndDate, dayAndMonth };
}

function T(temp) {
  return temp.toFixed(1) + "\u2103";
}

function msToBeaufort(ms) {
  return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2))) + " Bft";
}

const WeatherInfo = (props) => {
  if (!props.currentWeather) return null;
  const weatherData = JSON.parse(props.currentWeather);
  const daily8 = weatherData.daily;

  const currentInfo = weatherData.current;
  const currWeather = currentInfo.weather[0];
  let index = 0;
  return (
    <React.Fragment>
      <Stack spacing={1}>
        <Box display="flex" justifyContent="center">
          <Stack>
            <Item sx={{ backgroundColor: "#59e45b", width: "100%" }}>
              <h3>
                Current weather forecast :{" "}
                {convertTimeZone(currentInfo.dt).fullDate}
              </h3>
            </Item>
            <Stack direction="row">
              <Item sx={{ width: 150 }}>
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid sx={{ align: "left" }} item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Latitude
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {weatherData.lat}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Longitude
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {weatherData.lon}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Item>
              <Item sx={{ backgroundColor: "#8cdebf" }}>
                <img
                  alt=""
                  className="imgIcon"
                  src={`http://openweathermap.org/img/wn/${currWeather.icon}.png`}
                ></img>
                <br></br>
                {currWeather.description}
              </Item>
              <Item sx={{ width: 160 }}>
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid sx={{ align: "left" }} item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Temperature
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {T(currentInfo.temp)}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Feels like
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {T(currentInfo.feels_like)}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Item>
              <Item sx={{ backgroundColor: "#8cdebf" }}>
                Wind<br></br>
                <img
                  alt=""
                  style={{ rotate: `${currentInfo.wind_deg}deg` }}
                  className="imgCompass"
                  src={compass}
                ></img>
                <br></br>
                {msToBeaufort(currentInfo.wind_speed)}
              </Item>
              <Item sx={{ width: 160 }}>
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid sx={{ align: "left" }} item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Sunrise
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {convertTimeZone(currentInfo.sunrise).timeOnly}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Sunset
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {convertTimeZone(currentInfo.sunset).timeOnly}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Item>
              <Item sx={{ width: 160, backgroundColor: "#8cdebf" }}>
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid sx={{ align: "left" }} item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Humidity
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {weatherData.current.humidity} %
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Pressure
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {weatherData.current.pressure} hPa
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        Clouds
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="flex-start">
                        {weatherData.current.clouds} %
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Item>
            </Stack>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="center">
          <Stack spacing={1}>
            <Item sx={{ backgroundColor: "#2d84cb", width: "100%" }}>
              <h3>Weather forecast for {daily8.length} days</h3>
            </Item>
            {daily8.map((f) => (
              <Stack direction="row" id={index++}>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      {convertTimeZone(f.dt).dateOnly}
                    </React.Fragment>
                  }
                  followCursor
                  placement="right-end"
                >
                  <Item
                    sx={{
                      textAlign: "left",
                      width: 110,
                      backgroundColor: "#2d84cb",
                    }}
                  >
                    {convertTimeZone(f.dt).dayAndMonth}
                  </Item>
                </HtmlTooltip>
                <Item sx={{ backgroundColor: "#5eaeeb" }}>
                  <img
                    alt=""
                    className="imgIcon"
                    src={`http://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
                  ></img>
                  <br></br>
                  {f.weather[0].description}
                </Item>
                <Item sx={{ width: 160, backgroundColor: "#5d7af8" }}>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid sx={{ align: "left" }} item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Temperature
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {T(f.temp.day)}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Minimum
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {T(f.temp.min)}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Maximum
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {T(f.temp.max)}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
                <Item sx={{ backgroundColor: "#5eaeeb" }}>
                  Wind<br></br>
                  <img
                    alt=""
                    style={{ rotate: `${f.wind_deg}deg` }}
                    className="imgCompass"
                    src={compass}
                  ></img>
                  <br></br>
                  {msToBeaufort(f.wind_speed)}
                </Item>
                <Item sx={{ width: 160, backgroundColor: "#5d7af8" }}>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid sx={{ align: "left" }} item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Sunrise
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {convertTimeZone(f.sunrise).timeOnly}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Sunset
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {convertTimeZone(f.sunset).timeOnly}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
                <Item sx={{ width: 160, backgroundColor: "#5eaeeb " }}>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid sx={{ align: "left" }} item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Humidity
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {f.humidity} %
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Pressure
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {f.pressure} hPa
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          Clouds
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          {f.clouds} %
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default WeatherInfo;
