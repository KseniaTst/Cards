import {AppThunk} from './store';
import {authAPI} from '../features/auth/registration/auth-api';
import {setIsLoggedInAC} from '../features/auth/login/login-reducer';
import {AxiosError} from 'axios';
import {SetProfileAC} from '../features/auth/profile/profile-reducer';

const initialState: InitialStateType = {
    error: null,
    status: 'idle',
    isInitialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state};
    }
};

export type InitialStateType = {
    error: string | null
    status: RequestStatusType
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionsAppReducerType = setAppErrorACType

    | setAppRequestStatusACType
    | setAppIsInitializedACType

//ACTIONS
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
type setAppErrorACType = ReturnType<typeof setAppErrorAC>

export const setAppRequestStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
type setAppRequestStatusACType = ReturnType<typeof setAppRequestStatusAC>

export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
type setAppIsInitializedACType = ReturnType<typeof setAppIsInitializedAC>

//THUNKS

export const initializedAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then((res) => {
            dispatch(SetProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            dispatch(setIsLoggedInAC(false))
        })
        .finally(() => {
            dispatch(setAppIsInitializedAC(true))
        })
}