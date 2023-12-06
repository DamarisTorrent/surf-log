import Grid from "@mui/material/Grid"
import { DataBox } from "./DataBox"
import { Typography } from "@mui/material"
import "@fontsource/roboto/500.css"
import { getCompassDirection } from '../../utility'

export const WaveData = ({ waveData, messageText, locationText }) => {
  return (
    <Grid
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
      container
    >
      <Grid item xs={10}></Grid>
      
      <Grid item xs={10}>
        <Typography color="white" variant="h5" fontWeight={500}>
          Wave {messageText}
        </Typography>
        <Typography color="white" variant="h5" fontWeight={500}>
          {locationText}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Current Wave Height"
          data={waveData.WVHT}
          label="feet"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Dominant Wave Period"
          data={waveData.DPD}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Average Wave Period"
          data={waveData.APD !== "999" ? waveData.APD : "Not Available"}
          label="seconds"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Mean Wave Direction"
          data={waveData.MWD !== "999" ? waveData.MWD : "Not Available"}
          label="degrees"
        ></DataBox>
      </Grid>
      <Grid item xs={10}>
        <DataBox
          title="Atmospheric Pressure"
          data={waveData.PRES}
          label="atms"
        ></DataBox>
      </Grid>
    </Grid>
  )
}
