import * as React from "react"
import { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import BuoySelect from "./BuoySelect"
import { WaveData } from "./WaveData"
import { WeatherData } from "./WeatherData"
import {
  getLatestBuoyReading,
  getHistoricalBuoyReading,
  getWeatherData,
  getCurrentDate,
  getLocation,
} from "../../utility"
import { getWaveData } from "../../api"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import Dayjs from "dayjs"
import Journal from "./journal/Journal"
import { isGreaterThan45Days } from "../../utility"
import leftSvg from "./images/Left.svg"
import middleSvg from "./images/Middle.svg"
import rightSvg from "./images/Right.svg"

export default function HomePage() {
  const [selectedBuoy, setSelectedBuoy] = useState("41004")
  const [selectedDate, setSelectedDate] = useState(Dayjs())
  //State management for wave data returned from the NDBC
  const [waveData, setWaveData] = useState({
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





  //State management for data returned from the visualcrossing.com weather api
  const [weatherData, setWeatherData] = useState({
    currentTemp: "",
    relativeHumidity: "",
    windSpeed: "",
    windDirection: "",
    minTemp: "",
    maxTemp: "",
    sunriseTime: "",
    sunsetTime: "",
    uvIndex: "",
  })

  //The select component where user can change the buoy
  const handleSelectChange = (newBuoy) => {
    setWaveData(getWaveData(selectedDate.format("YYYY-MM-DD"), newBuoy))
    console.log('selected date', selectedDate.format("YYYY-MM-DD"))
    console.log('selected buoy', newBuoy)
    getWeatherData(selectedDate.format("YYYY-MM-DD"), newBuoy).then(
      (result) => {
        setWeatherData(result)
      }
    )
    setSelectedBuoy(newBuoy)
  }

  //Handle the date change:
  // 1. Get the wave data for the selected date
  // 2. If it is today's date, parse the data result with getLatestBuoyReading function
  // 3. If it is greater than 45 days ago, parse the result with getHistoricalBuoyReading function
  // 4. If it is none of those things, retrieve from database 45 day cached data
  // 5. Check for missing data (buoy may have been offline on that date)
  // 6. Get the weather data for the selected date
  // 7. Set the state variable SelectedDate
  const handleDateChange = (newDate) => {
    if (newDate !== "undefined") {
      // 1. Get the wave data for the selected date
      getWaveData(newDate.format("YYYY-MM-DD"), selectedBuoy).then((result) => {
        let tempWaveData

        if (newDate.format("MM-DD-YYYY") === getCurrentDate()) {
          // 2. If it is today's date, parse the data result with getLatestBuoyReading function
          tempWaveData = getLatestBuoyReading(result)
        } else if (
          isGreaterThan45Days(newDate.format("MM-DD-YYYY"), getCurrentDate())
        ) {
          // 3. If it is greater than 45 days ago, parse the result with getHistoricalBuoyReading function
          tempWaveData = getHistoricalBuoyReading(
            result,
            newDate.format("YYYY-MM-DD")
          )
        } else {
          // 4. If it is none of those things, retrieve from database 45 day cached data
          setWaveData(result)
        }
        // 5. Check for missing data (buoy may have been offline on that date)
        if (tempWaveData === "No wave data available") {
          setWaveData({
            ...waveData,
            WVHT: "No data available",
            DPD: "No data available",
            APD: "No data available",
            MWD: "No data available",
            PRES: "No data available",
            WDIR: "No data available",
            WSPD: "No data available",
            GST: "No data available",
          })
        } else {
          if (tempWaveData) {
            setWaveData({
              ...waveData,
              WVHT: tempWaveData[8],
              DPD: tempWaveData[9],
              APD: tempWaveData[10],
              MWD: tempWaveData[11],
              PRES: tempWaveData[12],
              WDIR: tempWaveData[5],
              WSPD: tempWaveData[6],
              GST: tempWaveData[7],
            })
          }
        }
      })

      // 6. Get the weather data for the selected date
      getWeatherData(newDate.format("YYYY-MM-DD"), selectedBuoy).then(
        (result) => {
          setWeatherData(result)
        }
      )

      setSelectedDate(newDate)
    }
  }

  //Message changes based on current date vs historical date
  let messageText = "Conditions for "
  if (selectedDate.format("MM-DD-YYYY") === getCurrentDate()) {
    messageText = messageText + getCurrentDate()
  } else {
    messageText = messageText + selectedDate.format("MM-DD-YYYY")
  }

  let locationText = getLocation(selectedBuoy)

  //useEffect gets wave and weather data right now when page first loads
  useEffect(() => {
    getWeatherData(selectedDate.format("YYYY-MM-DD"), "41004").then(
      (result) => {
        setWeatherData(result)
      }
    )

    //This is the realtime url
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

        setWaveData({
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

    // xs: extra-small devices (portrait phones), less than 600px
  // sm: small devices (landscape phones), 600px and up
  // md: medium devices (tablets), 960px and up
  // lg: large devices (desktops), 1280px and up
  // xl: extra-large devices (large desktops), 1920px and up done

// 100% of the container (xs={12}) on extra-small devices,
// 50% (sm={6}) on small devices,
// 33.33% (md={4}) on medium devices, and
// 25% (lg={3}) on large devices.

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      <Grid item xs={12} lg={3} xl={3} order={{xs: 0, lg: 0, xl: 0}}>
        <Card
          sx={{
            height: "70vh",
            background: `linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent),
                 url(${leftSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Card
            sx={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: 0,
            }}
          >
            <CardContent>
              <WaveData waveData={waveData} messageText={messageText} locationText={locationText.buoyName}/>
            </CardContent>
          </Card>
        </Card>
      </Grid>
      <Grid className="middle" item xs={12} lg={6} xl={6} order={{xs: 2, lg: 1,  xl: 1}}>
        <Card
          sx={{
            height: "70vh",
            background: `linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent), url(${middleSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          elevation={3}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <Grid item>
              <BuoySelect onChange={handleSelectChange}></BuoySelect>

              <Card>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="dd-mm-yy"
                    disableFuture
                  />
                </LocalizationProvider>
              </Card>

              <Journal
                waveData={waveData}
                selectedBuoy={selectedBuoy}
                date={selectedDate}
              ></Journal>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid className="right" item xs={12} lg={3} xl={3} order={{xs: 1, lg: 2, xl: 2}}>
        <Card
          sx={{
            height: "70vh",
            backgroundImage: ` linear-gradient(to bottom,  
                rgba(1, 36, 58, 1) 0%, 
                rgba(1, 36, 58, .8) 25%, 
                rgba(1, 36, 58, 0) 50%, 
                rgba(1, 36, 58, 0) 75%, 
                rgba(1, 36, 58, 1) 100%,
                transparent), url(${rightSvg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Card
            sx={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: 0,
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: 0,
              }}
            >
              <WeatherData
                weatherData={weatherData}
                messageText={messageText}
                locationText={locationText.label}
              />
            </CardContent>
          </Card>
        </Card>
      </Grid>
    </Grid>
  )
}
