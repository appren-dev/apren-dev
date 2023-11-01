import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useBreakpoints } from 'hook/useBreakpoints';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player';
import Card from '@mui/material/Card';
import { useState } from "react";
import * as React from 'react';

const widthBreakpoints = { xs: 435, sm: 600, md: 600, lg: 435 };

const getMediaUrl = (media) => {
  return `${process.env.REACT_APP_STORAGE_TRUNK_URL}${media}${process.env.REACT_APP_STORAGE_TOKEN}`;
};

const CourseCard = ({ course_name, course_description, course_level, course_thumbnail, course_intro_url }) => {
  const [height, setHeight] = useState("245px");
  const [liked, setLiked] = useState(false);
  const { lg } = useBreakpoints("lg");
  const { sm } = useBreakpoints("sm");
  const hght = lg && !sm ? "337px" : sm && lg ? "245px" : height;

  const handleSelectFavorites = (crs) => {
    if (localStorage.getItem("favorite_courses")) {
      const prevSelection = JSON.parse(localStorage.getItem("favorite_courses"));
      if (prevSelection.find((el) => el === crs)) {
        setLiked(false);
        const updated_selection = prevSelection.filter((el) => el !== crs);
        return localStorage.setItem("favorite_courses", JSON.stringify(updated_selection));
      } else {
        setLiked(true);
        return localStorage.setItem("favorite_courses", JSON.stringify([...prevSelection, crs]));
      }
    };
    setLiked(true);
    localStorage.setItem("favorite_courses", JSON.stringify([crs]));
  };

  React.useEffect(() => {
    if (localStorage.getItem("favorite_courses")) {
      const prevSelection = JSON.parse(localStorage.getItem("favorite_courses"));
      if (prevSelection.find((el) => el === course_name)) {
        setLiked(true);

      }
    };
  }, [course_name]);

  return (
    <Card sx={{ width: widthBreakpoints }}>
      <ReactPlayer
        muted
        playing
        controls
        height={hght}
        width={"100%"}
        onPlay={() => setHeight(lg ? "auto" : "245px")}
        url={getMediaUrl(course_intro_url)}
        light={getMediaUrl(course_thumbnail)}
      />
      <CardContent>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 2
          }}
        >
          <Typography sx={{ fontWeight: 100 }} margin={0} gutterBottom variant="h5" component="div">
            {course_name}
          </Typography>
          <Typography sx={{ textTransform: "uppercase" }} margin={0} color={orange[500]} gutterBottom variant="caption" component="div">
            NIVEL: {course_level}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {course_description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "0px 15px 10px 15px" }}>
        <Button
          type="button"
          sx={{
            backgroundColor: "#147479",
            textTransform: "uppercase",
            fontSize: "0.8rem",
            fontWeight: 500,
            padding: 1,
            color: "white",
            "&:hover": {
              color: "#eee",
              backgroundColor: "#20bac2",
            }
          }}
        >
          Comprar este curso
        </Button>

        <Box>
          <IconButton onClick={() => handleSelectFavorites(course_name)}>
            {
              liked ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )
            }
          </IconButton>
        </Box>
      </CardActions>
    </Card >
  );
};

export default CourseCard;