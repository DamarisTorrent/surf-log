import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"
import { Typography } from "@mui/material"
import { createTheme, ThemeProvider} from '@mui/material'




export const WeatherData = ({ weatherData, messageText, locationText }) => {
  
  return (
    <Grid container
    direction="row" 
    justifyContent="center"
    alignItems="center"
    spacing={2} 
  >
     <Grid item xs={10}></Grid>
       <Grid item xs={10}>
        <Typography color='white' variant="h5" fontWeight={500}
        sx={{
          fontSize: {
            xs: '25px',
            lg:'15px',
            xl: '25px'    
            }
          }}
        >Weather {messageText}</Typography>
        <Typography color='white' variant="h5" fontWeight={500}
        sx={{
          fontSize: {
            xs: '25px',
            lg:'15px',
            xl: '25px'    
          }
        }}
        >{locationText}</Typography>
      </Grid>

      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
      <Grid item xs={10}></Grid>
   

    <Grid item xs={5} lg={6}>
      <DataBox
        title="High Temp"
        data={weatherData.maxTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5} lg={6}>
      <DataBox
        title="Low Temp"
        data={weatherData.minTemp}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5} lg={6}> 
      <DataBox
        title="Relative Humidity"
        data={weatherData.relativeHumidity}
        label="Farenheit"
      ></DataBox>
    </Grid>

    <Grid item xs={5} lg={6}>
      <DataBox
        title="Windspeed"
        data={weatherData.windSpeed}
        label="mph"
      ></DataBox>
    </Grid>

    <Grid item xs={5} lg={6}>
      <DataBox
        title="Wind Direction"
        data={weatherData.windDirection}
        label={weatherData.windDirectionDegrees + " degrees"}
      ></DataBox>
    </Grid>
    <Grid item xs={5}>
      <DataBox
        title="Conditions"
        data={weatherData.windGust}
        label="mph"
      ></DataBox>
    </Grid>

    <Grid item xs={10} lg={12}>
      <DataBox
        title="Sunrise Time"
        data={weatherData.sunriseTime}
        label="AM"
      ></DataBox>
    </Grid>

    <Grid item xs={10} lg={12}>
      <DataBox
        title="Sunset Time"
        data={weatherData.sunsetTime}
        label="PM"
      ></DataBox>
    </Grid>
  </Grid>
  )
  }