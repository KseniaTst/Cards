import {CustomModal} from "./CustomModal";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import {removePack} from "../../../../features/packs/packs-reducer";
import style from './CustomModal.module.css'

type PropsType = {
    packId: string,
    userId: string
    packName:string
}

export const DeleteModal=(props:PropsType)=>{

    const dispatch=useAppDispatch()

    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen=()=>setOpen(true)

    const deletePackHandler=()=>{
        setOpen(false)
        dispatch(removePack(props.packId,props.userId))
    }



    return (
        <>
            <IconButton onClick={handleOpen}>
                <Delete/>
            </IconButton>
            <CustomModal open={open} handleClose={handleClose} modalName={'Delete Pack'}>
                <div className={style.textContainer} >
                <span>Do you really want to remove <b>{props.packName}</b>?</span>
                <span>All cards will be deleted</span>
                </div>
                <div className={style.buttonBlock}>
                    <Button variant={'contained'} onClick={handleClose}>Close</Button>
                    <Button variant={'contained'} color={'error'} onClick={deletePackHandler} >Delete</Button>
                </div>
            </CustomModal>
        </>

    )
}