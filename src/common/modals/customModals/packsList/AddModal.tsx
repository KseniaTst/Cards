import React, {ChangeEvent, KeyboardEvent, ReactNode, useState} from "react";
import {Button, Checkbox, TextField} from "@mui/material";
import {CustomModal} from "./CustomModal";
import style from "./CustomModal.module.css";

type PropsType = {
    packName: string,
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    children: ReactNode,
    onClickSaveHandler: (name: string, isPrivate: boolean) => void
}

export const AddModal = (props: PropsType) => {

    const [changedPackValue, setChangedPackValue] = useState(props.packName);
    const [checked, setChecked] = useState(false)

    const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangedPackValue(e.currentTarget.value);
    };
    const packChange = () => {

        props.handleClose()
        props.onClickSaveHandler(changedPackValue, checked)

    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') packChange()
    };

    const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }

    return (
        <>
            {props.children}
            <CustomModal open={props.open} handleClose={props.handleClose} modalName={'Add Pack'}>
                <div className={style.textContainer}>
                    <TextField variant={'standard'}
                               label={'Name Pack'}
                               onChange={onPackChangeHandler}
                               value={changedPackValue}
                               onKeyUp={onKeyUpHandler}/>
                </div>
                <div><Checkbox onChange={onChangeCheckBox}/> Private pack</div>
                <div className={style.buttonBlock}>
                    <Button variant={'outlined'} onClick={props.handleClose}>Close</Button>
                    <Button variant={'contained'} onClick={packChange}>Save</Button>
                </div>
            </CustomModal>
        </>

    )
}