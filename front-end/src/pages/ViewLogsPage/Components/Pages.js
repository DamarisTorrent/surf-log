import {
  Grid,
  Card,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material"
import CardContent from "@mui/material/CardContent"
import { getReadableDate } from "../../../utility"
import { useState } from "react"

export default function Pages({ post, onDeletePost, onUpdatePost }) {
  const readableDate = getReadableDate(post.post_date)

  //For editing a post, just going to leave this in for now
  // const [text, setText] = useState();
  // const [isEditing, setIsEditing] = useState(false);
  // const handleTextChange = (event) => {
  //   setText(event.target.value)
  // }

  // const handleEditModeToggle = () => {
  //   setIsEditing((prevState) => !prevState);
  // }

  // const handleBlur = () => {
  //   setIsEditing(true)
  //   console.log('Updated Text:', text)
  //   onUpdatePost(text, post.post_id)
  // }

  const handlePostDelete = (postId) => {
    onDeletePost(postId)
  }

  return (
    <>
      {/* <Grid item xs={12}> */}
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        spacing={4}
        style={{
          minHeight: 680,
        }}
      >
        <Grid
          item
          xs={5}
          style={{
            minHeight: 680,
          }}
        >
          <Card
            elevation={3}
            sx={{
              minHeight: "90%",
              background: `linear-gradient(to bottom, 
                                    rgba( 1, 36, 58 ) 0%,
                                    rgba(16, 112, 166) 100%)`,
            }}
          >
            <CardContent>
              <Typography variant="h4" color="white">
                Wave Data
              </Typography>
            </CardContent>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wave Height</Typography>
                    <Typography variant="h5">{post.WVHT}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Dominant Wave Period
                    </Typography>
                    <Typography variant="h5">{post.DPD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Average Wave Period
                    </Typography>
                    <Typography variant="h5">{post.APD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wave Direction</Typography>
                    <Typography variant="h5">
                      {post.MWD !== "999" ? post.MWD : "Not Available"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wind Direction</Typography>
                    <Typography variant="h5">{post.WDIR}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Wind Speed</Typography>
                    <Typography variant="h5">{post.WSPD}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">Peak Gust Speed</Typography>
                    <Typography variant="h5">{post.GST}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="overline">
                      Atmospheric Pressure
                    </Typography>
                    <Typography variant="h5">{post.PRES}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            elevation={3}
            sx={{
              minHeight: "90%",
              background: `linear-gradient(to bottom, 
                                    rgba( 1, 36, 58 ) 0%,
                                    rgba(16, 112, 166) 100%)`,
            }}
          >
            <CardContent>
              <Typography variant="overline" color="white">
                {" "}
                Location:
              </Typography>
              <Typography variant="h4" color="white">
                {post.post_location}
              </Typography>
              <br></br>
              <Divider color="white" />
              <br></br>
              <Typography variant="h5" color="white">
                {readableDate}
              </Typography>
              <br></br>

              {/* {isEditing ? (
                <TextField
                  value={text}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  autoFocus
                  fullWidth
                />
              ) : (
                <Typography variant="body1" onClick={handleEditModeToggle}>
                  {post.post_description}
                </Typography>
              )} */}

              <Typography variant="body1" color="white">
                {post.post_description}
              </Typography>
              <br></br>
              <br></br>
              <Button
                variant="contained"
                onClick={() => handlePostDelete(post.post_id)}
                sx={{ margin: "15px", width: "150px" }}
              >
                Delete Post
              </Button>

              {/* <Button
                variant="contained"
                disabled={!isEditing}
                onClick={handleEditModeToggle}
                sx={{ margin: "15px", width: "150px" }}
              >
                Edit Post
              </Button> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  )
}
