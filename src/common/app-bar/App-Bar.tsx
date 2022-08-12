import {Button, Toolbar, AppBar, MenuItem, Menu} from "@mui/material";
import {logoutTC} from "../../features/auth/login/login-reducer";
import {AppLinearProgress} from "../linearProgress/AppLinearProgress";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {useNavigate} from "react-router-dom";
import style from './app-bar.module.css'
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const AppBarComponent = () => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn);
    const status = useSelector<AppRootStateType>((state) => state.app.status);
    const name = useSelector<AppRootStateType, string>(state => state.profile.UserData.name);
    const avatar = useSelector<AppRootStateType, string | null>(state => state.profile.UserData.avatar)

    const [userMenu, setUserMenu] = useState<boolean>(false)

    const onAvatarClick = () => {
        setUserMenu(!userMenu)
    }
    const onLogoutClick = () => {
        setUserMenu(!userMenu)
        dispatch(logoutTC())
    }
    const onProfileClick = () => {
        setUserMenu(!userMenu)
        navigate('/profile')
    }

    return (
        <AppBar position="static" color={'default'}>
            <Toolbar className={style.toolbar}>
                {isLoggedIn
                    ? <Button
                        variant={'contained'}
                        color="primary"
                        onClick={() => dispatch(logoutTC())}
                    >
                        Log out
                    </Button>
                    : <Button
                        variant={'contained'}
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Sign in
                    </Button>}
                <div>
                    {isLoggedIn ?
                        <div className={style.userInfoBlock}>
                            <span>{name}</span>
                            <div className={style.imgBlock} onClick={onAvatarClick}>
                                <img style={{borderRadius: '15px'}}
                                     src={avatar ? avatar : ''}/>
                            </div>
                        </div>
                        : ''}
                </div>
            </Toolbar>
            <div style={{height: '3px'}}>{status === 'loading' && <AppLinearProgress/>}</div>
            {userMenu && <Menu                                                                 // user menu settings
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(userMenu)}
                onClose={onAvatarClick}
            >
                <MenuItem onClick={onProfileClick}>
                    <span> <AccountCircleIcon fontSize={'small'} style={{paddingRight: '5px'}}/>profile</span>
                </MenuItem>
                <MenuItem onClick={onLogoutClick}>
                    <span><LogoutIcon fontSize={'small'} style={{paddingRight: '5px'}}/>logOut</span>
                </MenuItem>
            </Menu>}
        </AppBar>

    )
}