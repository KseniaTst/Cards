import {
    cardsAPI,
    CardType,
    getCardQueryParams,
    RequestCreateCardType,
    RequestUpdateCardType,
    ResponseGetCardType
} from "./cards-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppRequestStatusAC} from "../../app/app-reducer";

const GET_CARDS = "CARDS-REDUCER/GET-CARDS"
const CLEAR_CARDS_LIST = "CARDS-REDUCER/CLEAR_CARDS_LIST"
const ADD_QUERY_PARAMS = "CARDS-REDUCER/ADD_QUERY_PARAMS"
const SET_SORT_PARAMS = "CARDS-REDUCER/SET_SORT_PARAMS"
const CLEAR_SORT_PARAMS = "CARDS-REDUCER/CLEAR_SORT_PARAMS"

const initialState = {
    cards: [] as CardType[],
    packUserId: "",
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: "",
    tokenDeathTime: 0,
    queryParams: {
        pageCount: 5,
        page: 1
    } as getCardQueryParams,
    sortParams: {} as SortParamsType
}

export type SortParamsType = {
    sort: string
    field: string
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsCardsReducer): InitialStateType => {
    switch (action.type) {
        case GET_CARDS:
            return {...state, ...action.data}
        case CLEAR_CARDS_LIST:
            return {...state, cards: []}
        case ADD_QUERY_PARAMS:
            return {...state, queryParams: {...state.queryParams, ...action.newQueryParams}}
        case SET_SORT_PARAMS:
            return {...state, sortParams: action.sortParams}
        case CLEAR_SORT_PARAMS:
            return {...state, sortParams: {sort:"",field:""}}
        default:
            return state
    }
}

export type ActionsCardsReducer = setCardsACType
    | ClearCardsListACType
    | AddQueryParamsACType
    | SetSortParamsACType
    | clearSortParamsACType
//ACTIONS
export const setCardsAC = (data: ResponseGetCardType) => ({type: GET_CARDS, data} as const)
export type setCardsACType = ReturnType<typeof setCardsAC>

export const ClearCardsListAC = () => ({type: CLEAR_CARDS_LIST} as const)
export type ClearCardsListACType = ReturnType<typeof ClearCardsListAC>

export const AddQueryParamsAC = (newQueryParams: getCardQueryParams) => ({
    type: ADD_QUERY_PARAMS,
    newQueryParams
} as const)
export type AddQueryParamsACType = ReturnType<typeof AddQueryParamsAC>

export const setSortParamsAC = (sortParams: SortParamsType) => ({type: SET_SORT_PARAMS, sortParams} as const)
export type SetSortParamsACType = ReturnType<typeof setSortParamsAC>

export const clearSortParamsAC = () => ({type: CLEAR_SORT_PARAMS} as const)
export type clearSortParamsACType = ReturnType<typeof clearSortParamsAC>

//THUNKS

export const getCards = (queryParams: getCardQueryParams): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.getCards(queryParams)
        .then((res) => {
            dispatch(setCardsAC(res.data))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'))
        })
}

export const addCard = (data: RequestCreateCardType): AppThunk => (dispatch, getState) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.createCard(data)
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards({cardsPack_id: data.card.cardsPack_id, ...getState().cards.queryParams}))
            //dispatch(getCards(data.card.cardsPack_id))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })

}

export const deleteCard = (cardID: string, cardsPackID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.deleteCard(cardID)
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards({cardsPack_id: cardsPackID, ...getState().cards.queryParams}))
            //  dispatch(getCards(cardsPackID))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })
}

export const updateCard = (cardID: string, cardsPackID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.updateCard({
        card: {
            _id: cardID,
            question: "updated question",
            answer: "updated answer"
        }
    })
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards({cardsPack_id: cardsPackID, ...getState().cards.queryParams}))
            // dispatch(getCards(cardsPackID))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })
}