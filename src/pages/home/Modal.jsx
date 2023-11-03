import * as React from 'react';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: "95%", md: 800 },
  height: { xs: "auto", md: 449 },
  bgcolor: 'transparent',
  boxShadow: 24,
};

const ModalPlayer = ({ open, handleClose, url, thumbnail }) => {
  const [height, setHeight] = React.useState("450px");

  const memoedHeight = React.useCallback((value) => {
    setHeight(value);
  }, []);

  const memoedHeightValue = React.useMemo(() => height, [height]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReactPlayer
            muted
            playing
            controls
            width={"100%"}
            height={memoedHeightValue}
            //height={"100%"}
            //url={url}
            url={"https://firebasestorage.googleapis.com/v0/b/practice-f9b79.appspot.com/o/html%2Fselectores.mp4?alt=media&token=6775ffbc-ed10-41f1-8732-2a9e8567bb3d&_gl=1*yj9kr4*_ga*OTIzNzE5MzA4LjE2ODM0MDIxODg.*_ga_CW55HF8NVT*MTY5OTAyMjAxMi40MS4xLjE2OTkwMjIwNDAuMzIuMC4w"}
            light={thumbnail}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload"
                }
              }
            }}
            onPlay={() => memoedHeight("auto")}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPlayer;
