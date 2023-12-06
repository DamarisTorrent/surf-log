import React from "react"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { Fragment } from "react"
import { Card } from "@mui/material"

function BuoySelect({ onChange, value }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <Fragment>
      <Card sx={{
        marginBottom: '2vh'
      }}>
      <FormControl sx={{ m: 5, minWidth: 300 }} size="small">
        <InputLabel id="demo-simple-select-label">
          Choose a Location/Buoy
        </InputLabel>
        <Select
          id="demo-simple-select"
          label="Choose a Location/Buoy"
          onChange={handleChange}
          autoWidth
          defaultValue={"41004"}
        >
          <MenuItem value={"44008"}>
            NorthEast / Nantucket
          </MenuItem>
          <MenuItem value={"41002"}>
            North Carolina / South Hatteras 
          </MenuItem>
          <MenuItem value={"41013"}>
            Southern North Carolina / Frying Pan Shoals 
          </MenuItem>
          <MenuItem value={"41004"}>
            Southern South Carolina / Edisto 
          </MenuItem>
          <MenuItem value={"41008"}>
            GA/North Florida / Grays Reef
          </MenuItem>
          <MenuItem value={"41009"}>
            Central Florida / East Canaveral
          </MenuItem>
          <MenuItem value={"41047"}>
            South Florida / NE Bahamas 
          </MenuItem>
          <MenuItem value={"41046"}>
            Bahamas / East Bahama 
          </MenuItem>
          <MenuItem value={"46053"}>
            California / Santa Barbara 
          </MenuItem>
          <MenuItem value={"46086"}>
            California / San Clemente Basin 
          </MenuItem>
        </Select>
      </FormControl>
      </Card>
    </Fragment>
  )
}

export default BuoySelect
