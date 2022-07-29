import style from './Profile.module.css'
import {Paper} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {useState} from "react";
import {SetNameTC, SetPhotoTC, UserDataType} from "./profile-reducer";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {logoutTC} from "../login/login-reducer";
import {Avatar} from "./Avatar";
import {EditableSpan} from "./EditableSpan";

export const Profile = () => {
    const profile = useSelector<AppRootStateType, UserDataType>(state => state.profile.UserData)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setNewName] = useState<string>(profile.name)

    const dispatch: AppDispatch = useDispatch();

    const onEditIconHandler = () => {
        setEditMode(true)
    }
    const onSaveNameHandler = () => {
        setEditMode(false)
        dispatch(SetNameTC(name))
    }
const setNewPhoto=(avatar:any)=>{
        dispatch(SetPhotoTC(avatar))
}

    return (
        <div className={style.mainBlock}>
            <div className={style.back}>
             <span> <KeyboardBackspaceIcon style={{paddingTop:'5px'}}/>  Back to Pack List</span>
            </div>
            <Paper elevation={1} className={style.paper}>
                <span className={style.personalInfSpan}>Personal Information</span>
                <Avatar avatar={profile.avatar} setNewPhoto={setNewPhoto}/>
                <div className={style.nameBlock}>
                    <EditableSpan editMode={editMode} name={name} onEditIconHandler={onEditIconHandler}
                                  onSaveNameHandler={onSaveNameHandler}
                                  setNewName={setNewName}/>
                    <span className={style.email}>{profile.email}</span>
                </div>
                <button className={style.button} onClick={() => dispatch(logoutTC())}>
                    <LogoutIcon fontSize={'small'} style={{paddingRight: '5px'}}/> Log out
                </button>
            </Paper>
        </div>
    )
}