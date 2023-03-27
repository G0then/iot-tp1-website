import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #f0f0f0",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

type CustomModalProps = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
};

export default function CustomModal({
  open,
  handleClose,
  children,
  title,
  description,
}: CustomModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          {description && <p className="text-lg text-center">{description}</p>}
        </div>
        {children}
      </Box>
    </Modal>
  );
}
