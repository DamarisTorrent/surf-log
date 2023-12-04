import { useState } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { Fragment } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { addNewPost } from "../../../api"
import { getUserId } from "../../utilities/users-service"
import Typography from "@mui/material/Typography"
import { getLocation } from "../../../utility"

const JournalForm = ({ waveData, selectedBuoy, date, handleClose }) => {
  const [description, setDescription] = useState()
  const [submitClicked, setSubmitClicked] = useState(false);

  const location = getLocation(selectedBuoy).label

  let post = {
    user_id: "",
    post_date: "",
    post_description: "",
    post_location: "",
    WDIR: "",
    WSPD: "",
    GST: "",
    WVHT: "",
    DPD: "",
    APD: "",
    MWD: "",
    PRES: "",
    buoy_id: "",
  }

  const handleSubmit = async () => {
    post.user_id = getUserId()
    post.post_date = date.format("MM-DD-YYYY")
    post.post_description = description
    post.post_location = location
    post.WDIR = waveData.WDIR
    post.WSPD = waveData.WSPD
    post.GST = waveData.GST
    post.WVHT = waveData.WVHT
    post.DPD = waveData.DPD
    post.APD = waveData.APD
    post.MWD = waveData.MWD
    post.PRES = waveData.PRES
    post.buoy_id = selectedBuoy
    try {
      addNewPost(post)
      setSubmitClicked(true)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <Grid container direction="row" justifyContent="center">
        <Card
          className="form-container"
          width={1200}
          elevation={3}
          sx={{
            minHeight: "90%",
            background: `linear-gradient(to bottom, 
                                  rgba( 1, 36, 58 ) 0%,
                                  rgba(16, 112, 166) 100%)`,
          }}
        >
          <CardContent sx={{ display: "grid", margin: "75px" }}>
            <Grid container direction="column" justify="center" width={400}>
              <Typography
                variant="h4"
                color="white"
                // style={{ fontSize: "24px" }}
              >
                Surf Journal Record for {date.format("MM-DD-YYYY")}{" "}
              </Typography>
              <br></br>
              <TextField
                sx={{ marginBottom: "5px" }}
                // onChange={(location) => setLocation(location.target.value)}
                value={location}
                variant='outlined'
                InputProps={{
                  style: { color: 'white' }, // Set the text color to white
                }}
              />

              <TextField
                id="review"
                label="Write a review"
                multiline
                rows={10}
                onChange={(description) =>
                  setDescription(description.target.value)
                }
                value={description}
                helperText="How was your session?"
                InputProps={{
                  style: { color: 'white' }, // Set the text color to white
                }}
                InputLabelProps={{
                  style: { color: 'white' }, // Set the label color to white
                }}
                
              />

              <br></br>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid container direction="row" justify-content="center">
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ margin: "15px", width: "150px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ margin: "15px", width: "150px" }}
        >
          Submit
        </Button>
      </Grid>
    </Fragment>
  )
}

export default JournalForm
