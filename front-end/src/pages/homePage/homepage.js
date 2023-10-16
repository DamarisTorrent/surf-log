import * as React from "react"
import { useState, useEffect } from "react"
import { clearToken } from "../../utility"
import { deletePost } from "../../api"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { DataBox } from "./DataBox"
import { WaveData } from "./WaveData"
import { getLatestBuoyReading } from "../../utility"
import { getWeatherData } from '../../utility'
import { getWaveData } from "../../api"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import Dayjs from "dayjs"
import Journal from "./journal/Journal"
import { getCurrentDate } from "../../utility"
import { celsiusToFahrenheit } from "../../utility"
import { weatherSearchUrl } from "../../utility"
import { getCompassDirection } from "../../utility"
import "../../homepage.css"
// import logo from './logo.png'

export default function HomePage({ setUser, value }) {
  const [selectedBuoy, setSelectedBuoy] = useState("41004")
  const [selectedDate, setSelectedDate] = useState(Dayjs())
  const [currentReading, setCurrentReading] = useState({
    YY: "",
    MM: "",
    DD: "",
    hh: "",
    mm: "",
    WDIR: "",
    WSPD: "",
    GST: "",
    WVHT: "",
    DPD: "",
    APD: "",
    MWD: "",
    PRES: "",
  })

  const [currentWeather, setCurrentWeather] = useState({
    currentTemp: "",
    relativeHumidity: "",
    windSpeed: "",
    windDirection: "",
    minTemp: "",
    maxTemp: "",
    sunsetTime: "",
    uvIndex: "",
  })

  const handleSelectChange = (value) => {
    setCurrentReading(getWaveData(selectedDate.format("YYYY-MM-DD"), value))
    setSelectedBuoy(value)
  }

  const handleDateChange = (value) => {
    if (value !== "undefined") {
      getWaveData(value.format("YYYY-MM-DD"), selectedBuoy).then((result) => {
        //If it is today, we need to grab the latest reading and parse it with getLatestBuoyReading
        if (value.format("MM-DD-YYYY") === getCurrentDate()) {
          let tempCurrentReading = getLatestBuoyReading(result)
  
          setCurrentReading({
            ...currentReading,
            WVHT: tempCurrentReading[8],
            DPD: tempCurrentReading[9],
            APD: tempCurrentReading[10],
            MWD: tempCurrentReading[11],
            PRES: tempCurrentReading[12],
            WDIR: tempCurrentReading[5],
            WSPD: tempCurrentReading[6],
            GST: tempCurrentReading[7],
          })

        } else {
          //If the date is not today, read the results from the database, returned as an object, no parsing required
          setCurrentReading(result)
        }
     
        // setCurrentWeather(getWeatherData(value.format("YYYY-DD-MM")))
      })
    }
    setSelectedDate(value)
  }

  //Buoy conditions message changes based on current date vs historical date
  let messageText = "Conditions for "
  if (selectedDate.format("MM-DD-YYYY") === getCurrentDate()) {
    messageText = "Current " + messageText + " today " + getCurrentDate()
  } else {
    messageText =
      "Historical " + messageText + selectedDate.format("MM-DD-YYYY")
  }

  useEffect(() => {
    fetch(weatherSearchUrl(selectedDate.format("YYYY-MM-DD")))
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching message:", error)
      })
      .then((data) => {
        console.log(data)
        if (data !== undefined){
        setCurrentWeather({
        
          currentTemp: celsiusToFahrenheit(parseFloat(data.days[0].temp), 2),
          relativeHumidity: data.days[0].humidity,
          windSpeed: data.days[0].windspeed,
          windDirectionDegrees: data.days[0].winddir,
          windDirection: getCompassDirection(data.days[0].winddir),
          maxTemp: celsiusToFahrenheit(parseFloat(data.days[0].tempmax), 2),
          minTemp: celsiusToFahrenheit(parseFloat(data.days[0].tempmin), 2),
          sunriseTime: data.days[0].sunrise,
          sunsetTime: data.days[0].sunset,
          uvIndex: data.days[0].uvindex,
        })
      }
      })

    const fetchString = "data/realtime2/" + selectedBuoy + ".txt"

    fetch(fetchString)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((fileContent) => {
        const [YY, MM, DD, hh, mm, WDIR, WSPD, GST, WVHT, DPD, APD, MWD, PRES] =
          getLatestBuoyReading(fileContent)

        setCurrentReading({
          YY,
          MM,
          DD,
          hh,
          mm,
          WDIR,
          WSPD,
          GST,
          WVHT,
          DPD,
          APD,
          MWD,
          PRES,
        })
      })
      .catch((error) => {
        console.error("Error reading the file:", error)
      })
  }, [selectedBuoy])

  function handleLogOut() {
    clearToken()
    setUser()
  }
  const handleDelete = () => {
    const post_id = 4
    deletePost(post_id)
  }

  // const handleUpdate = () => {
  //   updatePost(post)
  // }

  return (
    <>
      <div className="home">
        <div className="center-container">
          <br></br>
          {/* <img src={logo} alt="Your Logo" className="logo-image" /> */}
        </div>

        <div style={{ height: "1000px", overflowY: "auto" }}>
          <Grid container spacing={2}>
            {/* Left Side of Page*/}

            <Grid item xs={12} sm={6} md={3} lg={4} marginLeft={12}>
              <Card sx={{ border: 2 }}>
                <CardContent style={{ height: "100%" }}>
                  {/* Get the selected buoy from the buoy select component */}
                  <br></br>
                  <BuoySelect onChange={handleSelectChange}></BuoySelect>
                  <Typography style={{ fontSize: "20px" }}>
                    {messageText}
                  </Typography>
                </CardContent>
              </Card>
              <br></br>
              <WaveData currentReading={currentReading} />
            </Grid>

            {/* Right Side of Page */}
            <Grid item xs={12} sm={6} md={4} lg={6} marginLeft={10}>
              <Card sx={{ border: 2 }}>
                <CardContent style={{ height: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate}
                      onChange={handleDateChange}
                      format="dd-mm-yy"
                      disableFuture
                    />
                  </LocalizationProvider>
                  <Journal
                    currentReading={currentReading}
                    selectedBuoy={selectedBuoy}
                    date={selectedDate}
                  ></Journal>
                </CardContent>
              </Card>
              <br></br>

              <Grid direction="row" spacing={3} container>
                <Grid item>
                  <DataBox
                    title="Current Temperature"
                    data={currentWeather.currentTemp}
                    label="Farenheit"
                  ></DataBox>
                </Grid>
                <Grid item>
                  <DataBox
                    title="Windspeed"
                    data={currentWeather.windSpeed}
                    label="mph"
                  ></DataBox>
                </Grid>

                <Grid item>
                  <DataBox
                    title="Wind Direction"
                    data={currentWeather.windDirection}
                    label={currentWeather.windDirectionDegrees + " degrees"}
                  ></DataBox>
                </Grid>

                <Grid item>
                  <DataBox
                    title="Today's Low Temp"
                    data={currentWeather.minTemp}
                    label="Farenheit"
                  ></DataBox>
                </Grid>

                <Grid item>
                  <DataBox
                    title="Today's High Temp"
                    data={currentWeather.maxTemp}
                    label="Farenheit"
                  ></DataBox>
                </Grid>

                <Grid item>
                  <DataBox
                    title="Sunrise Time Today"
                    data={currentWeather.sunriseTime}
                    label="AM"
                  ></DataBox>
                </Grid>

                <Grid item>
                  <DataBox
                    title="Sunset Time Today"
                    data={currentWeather.sunsetTime}
                    label="PM"
                  ></DataBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}
