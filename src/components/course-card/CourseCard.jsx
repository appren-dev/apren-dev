import { CardActions, CardContent, Typography, Button, Card } from '@mui/material';
import { AiOutlineHeart, AiFillHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import { Box, CardMedia, IconButton, Tooltip } from '@mui/material';
import { getMediaUrl } from 'utilities/getMediaUrl';
import { orange } from '@mui/material/colors';
import { useState, useEffect } from "react";
import ModalPlayer from './Modal';

const CourseCard = ({ course_name, course_description, course_level, course_thumbnail, course_intro_url }) => {
  const [liked, setLiked] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("favorite_courses")) {
      const prevSelection = JSON.parse(localStorage.getItem("favorite_courses"));
      if (prevSelection.find((el) => el === course_name)) {
        setLiked(true);
      }
    };
  }, [course_name]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <Card sx={{ width: "100%" }}>
      {
        open && (
          <ModalPlayer
            open={open}
            handleClose={handleClose}
            url={getMediaUrl(course_intro_url)}
            thumbnail={getMediaUrl(course_thumbnail)}
          />
        )
      }
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component={"img"}
          src={getMediaUrl(course_thumbnail)}
        />
        <Box sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <IconButton onClick={handleOpen}>
            <AiOutlinePlayCircle size={100} color="#eee" />
          </IconButton>
        </Box>
      </Box>
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
          <Tooltip title={liked ? "Remover de Mi Lista" : "Agregar a Mi Lista"}>
            <IconButton onClick={() => handleSelectFavorites(course_name)}>
              {
                liked ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )
              }
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card >
  );
};

export default CourseCard;