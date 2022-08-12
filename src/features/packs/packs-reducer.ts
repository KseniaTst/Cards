import {AppThunk} from '../../app/store';
import {setAppRequestStatusAC} from '../../app/app-reducer';
import {packsAPI, ResponseCardPackType, UpdatePackParamsType} from './packs-api';
import {handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    packsList: [] as ResponseCardPackType[],
    packsAmount: 0,
    currentPage: 1,
    packsPerPage: 5,
    requestedPacks: `User's` as RequestedPacksType,
    nameOfCurrentPack: '',
    sortBy: '0updated',
    sortOrder: 'desc' as Order,
    searchedValue: '',
    minAndMaxCardsAmount: [0, 110],
};

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS-LIST':
            return {...state, packsList: [...state.packsList, ...action.cardPacks]};
        case 'packs/CLEAR-PACKS-LIST':
            return {...state, packsList: []};
        case 'packs/SET-PACKS-AMOUNT':
            return {...state, packsAmount: action.packsAmount};
        case 'packs/SET-PACKS-PER-PAGE':
            return {...state, packsPerPage: action.packsPerPage};
        case 'packs/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage};
        case 'packs/SET-REQUESTED-PACKS':
            return {...state, requestedPacks: action.requestedPacks};
        case 'packs/SET-CURRENT-PACK-NAME':
            return {...state, nameOfCurrentPack: action.name};
        case 'packs/SET-PACKS-SORT-BY':
            return {...state, sortBy: action.sortBy};
        case 'packs/SET-PACKS-SORT-ORDER':
            return {...state, sortOrder: action.sortOrder};
        case 'packs/SET-SEARCHED-VALUE':
            return {...state, searchedValue: action.searchedValue};
        case 'packs/SET-MIN-AND-MAX-CARDS-AMOUNT':
            return {...state, minAndMaxCardsAmount: action.minAndMaxCardsAmount};
        default: {
            return state;
        }
    }
};

//actions
export const setPacksList = (cardPacks: ResponseCardPackType[]) => ({type: 'packs/SET-PACKS-LIST', cardPacks} as const);
export const clearPacksList = () => ({type: 'packs/CLEAR-PACKS-LIST'} as const);
export const setPacksAmount = (packsAmount: number) => ({type: 'packs/SET-PACKS-AMOUNT', packsAmount} as const);
export const setPacksPerPage = (packsPerPage: number) => ({type: 'packs/SET-PACKS-PER-PAGE', packsPerPage} as const);
export const setCurrentPage = (currentPage: number) => ({type: 'packs/SET-CURRENT-PAGE', currentPage} as const);
export const setRequestedPacks = (requestedPacks: RequestedPacksType) => ({
    type: 'packs/SET-REQUESTED-PACKS',
    requestedPacks,
} as const);
export const setCurrentPackName = (name: string) => ({type: 'packs/SET-CURRENT-PACK-NAME', name} as const);
export const setPacksSortBy = (sortBy: string) => ({type: 'packs/SET-PACKS-SORT-BY', sortBy} as const);
export const setPacksSortOrder = (sortOrder: Order) => ({type: 'packs/SET-PACKS-SORT-ORDER', sortOrder} as const);
export const setSearchedValue = (searchedValue: string) => ({type: 'packs/SET-SEARCHED-VALUE', searchedValue} as const);
export const setMinAndMaxCardsAmount = (minAndMaxCardsAmount: number[]) => ({
    type: 'packs/SET-MIN-AND-MAX-CARDS-AMOUNT',
    minAndMaxCardsAmount,
} as const);

//thunks
export const fetchPacks = (): AppThunk => async (dispatch, getState) => {
    const user_id = getState().profile.UserData._id;
    const state = getState().packs;
    const page = state.currentPage;
    const pageCount = state.packsPerPage;
    const min = state.minAndMaxCardsAmount[0];
    const max = state.minAndMaxCardsAmount[1];
    const sortPacks = state.sortBy;
    const packName = state.searchedValue;
    const requestedPacks = state.requestedPacks;
    let response;

    try {
        dispatch(setAppRequestStatusAC('loading'));

        if (requestedPacks === `User's`) {
            response = await packsAPI.getPacks({page, pageCount, user_id, min, max, sortPacks, packName});
        } else {
            response = await packsAPI.getPacks({page, pageCount, min, max, sortPacks, packName});
        }

        dispatch(setPacksAmount(response.data.cardPacksTotalCount));
        dispatch(clearPacksList());
        dispatch(setPacksList(response.data.cardPacks));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const addPack = (user_id: string,name:string,isPrivate:boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.createPack(name,isPrivate);
        dispatch(fetchPacks());
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const removePack = (packID: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.deletePack(packID);
        dispatch(fetchPacks());
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const changePack = (updateData: UpdatePackParamsType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.updatePack(updateData);
        dispatch(fetchPacks());
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

// types
type InitialStateType = typeof initialState

type setPacksListType = ReturnType<typeof setPacksList>
type clearPacksListType = ReturnType<typeof clearPacksList>
type setPacksAmountType = ReturnType<typeof setPacksAmount>
type setPacksPerPageType = ReturnType<typeof setPacksPerPage>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setRequestedPacksType = ReturnType<typeof setRequestedPacks>
type setCurrentNamePackType = ReturnType<typeof setCurrentPackName>
type setPacksSortByType = ReturnType<typeof setPacksSortBy>
type setPacksSortOrderType = ReturnType<typeof setPacksSortOrder>
type setSearchedValueType = ReturnType<typeof setSearchedValue>
type setMinAndMaxCardsAmountType = ReturnType<typeof setMinAndMaxCardsAmount>

export type PacksReducerActionTypes = setPacksListType
    | clearPacksListType
    | setPacksAmountType
    | setPacksPerPageType
    | setCurrentPageType
    | setRequestedPacksType
    | setCurrentNamePackType
    | setPacksSortByType
    | setPacksSortOrderType
    | setSearchedValueType
    | setMinAndMaxCardsAmountType

export type RequestedPacksType = `User's` | 'All'

export type Order = 'asc' | 'desc';