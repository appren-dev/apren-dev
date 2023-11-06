import React from 'react';
import picture from "assets/jorge.png";
import CursoImage from "assets/maxresdefault.jpg";
import { Box, CardMedia, Grid } from '@mui/material';
import CustomButton from 'components/CustomButton';
import ReactPlayer from 'react-player';

const MyList = () => {
  return (
    <Grid container spacing={2}>
      <Grid sx={{ border: { lg: "1px solid yellow" }, overflowY: "scroll" }} item xs={12} sm={2} md={2} lg={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "row",
              sm: "column"
            },
            gap: "10px",
            width: { sx: "470px", sm: "fit-content" },
            minWidth: "100px",
            maxHeight: { xs: "100%", sm: "50vh", md: "80vh" },
            border: "1px solid red",
            overflow: "hidden"
          }}
        >
          {
            ["react", "html", "css", "a", "b", "c", "d", "e", "f", "h", "i", "react", "html", "css", "a", "b", "c", "d", "e", "f", "h", "i"].map((item) => (
              <CardMedia
                image={CursoImage}
                component={"img"}
                sx={{ width: { xs: "100px", sm: "100%", md: "100px" } }}
              />
            ))
          }
        </Box>
      </Grid>
      <Grid sx={{ border: { lg: "1px solid blue" } }} item xs={12} sm={10} md={10} lg={4}>
        <Box>
          <img style={{ width: "100%" }} src={picture} alt="jorge" />
        </Box>
      </Grid>
      <Grid sx={{ border: { lg: "1px solid red" } }} item xs={12} sm={12} md={12} lg={7}>
        <Box sx={{ width: "200px", marginBottom: 2 }}>
          <CustomButton message={"empezar"} />
        </Box>
        <Box sx={{ width: "100%", height: { xs: "300px", md: "568px" } }}>
          <ReactPlayer
            width="100%"
            height={"100%"}
            controls
            loop
            playing
            url={"https://www.youtube.com/watch?v=HYhQ2ReEyvQ&list=RDHYhQ2ReEyvQ&start_radio=1"}
            light={"https://i.ytimg.com/vi/jdYJf_ybyVo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgUihIMA8=&rs=AOn4CLCYQ1gfNdpDbfP62JGUnBZtti8SMg"}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MyList;