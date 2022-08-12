import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, ReactNode} from "react";
import CloseIcon from '@mui/icons-material/Close';
import style from './CustomModal.module.css'

const BoxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    children: ReactNode
    open: boolean,
    handleClose: () => void
    modalName: string
}

export const CustomModal: FC<PropsType> = ({
                                               children, open,
                                               modalName, handleClose
                                           }) => {


    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={BoxStyle}>
                <div className={style.header}>
                    <span>{modalName}</span>
                    <CloseIcon onClick={handleClose} fontSize={'small'}/>
                </div>
                <hr/>
                {children}
            </Box>
        </Modal>
    );
}