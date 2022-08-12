import React, {useEffect} from 'react';
import './App.css';
import {Header} from '../common/header/Header';
import {Main} from '../common/main/Main';
import {ErrorSnackbar} from '../common/errorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store';
import {initializedAppTC} from './app-reducer';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import {AppBarComponent} from "../common/app-bar/App-Bar";

function App() {
    useEffect(() => {
        dispatch(initializedAppTC());
    }, []);

    const dispatch: AppDispatch = useDispatch();

    const isInitialized = useSelector<AppRootStateType>((state) => state.app.isInitialized);
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>;

    }
    return (
        <div className="App">
            <AppBarComponent/>
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
