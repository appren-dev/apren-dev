import * as React from 'react';
import ReactPlayer from 'react-player';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Box, Modal, IconButton } from '@mui/material';

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
            url={url}
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
          <Box sx={{ position: "absolute", top: 0, right: 0 }}>
            <IconButton onClick={handleClose}>
              <AiFillCloseCircle size={30} color={"#fff"} />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPlayer;
