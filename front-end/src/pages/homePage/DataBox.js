import StarIcon from "@heroicons/react/24/solid/StarIcon"
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material"

export const DataBox = (props) => {
  const { title, data, label } = props

  return (
    <>
      <Card>
        <Typography color="text.secondary" variant="overline"        
         sx={{
          fontSize: {
            lg:'10px'  
            },
            lineHeight : {
              lg: 1
            }
          }}> {title}</Typography>
        <Typography variant="h5"
            sx={{
              fontSize: {
                lg:'15px', 
                }
              }} >{data == "MM" ? "Not available" : data}</Typography>
        <Typography color="text.secondary" variant="caption" align="right"        sx={{
              fontSize: {
                lg:'10px'
                }
              }}
        >{label}</Typography>
      </Card>
    </>

  )
}
