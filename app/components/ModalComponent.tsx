import React from "react"
import { Box, Modal } from "@mui/material";

type ModalComponentProps = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export function ModalComponent({
  children,
  open,
  onClose,
}: ModalComponentProps) {
  return <Modal
    open={open}
    onClose={onClose}
  >
    <Box sx={{
      position: 'absolute',
      top: '25%',
      left: '50%',
      width: '600px',
      backgroundColor: 'white',
      padding: '36px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '12px'
    }}>
      {children}
    </Box>
  </Modal>
}