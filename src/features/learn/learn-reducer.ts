import {AppThunk} from '../../app/store';
import {setAppRequestStatusAC} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {learnAPI, sendCardGradeQueryParams} from './learn-api';
import {setCardGradeAC} from '../cards/cards-reducer';
import {CardType} from '../cards/cards-api';

const initialState = {
    card: {} as CardType,
};

export const learnReducer = (state: InitialStateType = initialState, action: LearnReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'learn/SET-CARD':
            return {...state, card: action.card}
        default: {
            return state;
        }
    }
};

//actions
export const setCard = (card: CardType) => ({type: 'learn/SET-CARD', card} as const);

//thunks
export const updateCardGrade = (data: sendCardGradeQueryParams): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        const response = await learnAPI.sendCardGrade(data);
        dispatch(setCardGradeAC(data, response.data.updatedGrade.shots));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

// types
type InitialStateType = typeof initialState

type setCardType = ReturnType<typeof setCard>

export type LearnReducerActionTypes = setCardType

