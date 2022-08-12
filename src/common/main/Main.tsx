import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../../features/auth/login/Login';
import {Registration} from '../../features/auth/registration/Registration';
import {Profile} from '../../features/auth/profile/Profile';
import {Error404} from '../../features/auth/error404/Error404';
import {PasswordForgot} from '../../features/auth/passwordForgot/PasswordForgot';
import {PasswordNew} from '../../features/auth/passwordNew/PasswordNew';
import {Test} from '../../features/auth/test/Test';
import {Packs} from '../../features/packs/Packs';
import {Cards} from '../../features/cards/Cards';
import {Learn} from '../../features/learn/Learn';


export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    ERROR_404: '/error-404',
    PASSWORD_RESET: '/password-reset',
    PASSWORD_NEW: '/password-new/:userToken',
    TEST: '/test',
    PACKS: '/packs',
    CARDS: '/cards/:cardsPackID',
    LEARN: '/learn/:cardsPack_id',
};

export const Main = () => {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={'/*'} element={<Navigate to={PATH.ERROR_404}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.ERROR_404} element={<Error404/>}/>
                <Route path={PATH.PASSWORD_RESET} element={<PasswordForgot/>}/>
                <Route path={PATH.PASSWORD_NEW} element={<PasswordNew/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path={PATH.PACKS} element={<Packs/>}/>
                <Route path={PATH.CARDS} element={<Cards/>}/>
                <Route path={PATH.LEARN} element={<Learn/>}/>
            </Routes>
        </div>
    );
};
