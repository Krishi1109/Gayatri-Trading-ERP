import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CyanFillButton } from "./sharedStyles";
import { Stack } from "@mui/material";

const BasicModal = ({ open, handleClose, children, maxWidth, minWidth }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 500,
    maxWidth: maxWidth,
    minWidth: minWidth,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowX: "auto",
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <>
          <Box sx={style}>
            <Stack>
              {children}
              <CyanFillButton onClick={handleClose}>Close</CyanFillButton>
            </Stack>
          </Box>
        </>
      </Modal>
    </>
  );
};

export default BasicModal;
