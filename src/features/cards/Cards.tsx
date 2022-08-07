import React, { useEffect} from 'react';
import style from './Cards.module.css'

import CardsTable from "./cards-table-list/CardsTable";
import Button from '@mui/material/Button/Button';

import {useParams} from "react-router-dom";
import {addCard, ClearCardsListAC,  getCards} from "./cards-reducer";
import {CardsSearchByQuestion} from "./cards-search-by-question/CardsSearchByQuestion";
import {CardsPagination} from "./cards-pagination/Cards-pagination";
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {CustomModal} from "../../modals/CustomModal";
import {AddNewCardModal} from "../../modals/card/AddNewCardModal/AddNewCardModal";


export const Cards: React.FC = () => {
    const {cardsPackID} = useParams()
    const dispatch = useAppDispatch()

    const queryParams = useAppSelector(state => state.cards.queryParams)

    const userID = useAppSelector(state => state.profile.UserData._id);
    const cardsUserID = useAppSelector(state => state.cards.packUserId)
    const currentPackName = useAppSelector(state => state.packs.nameOfCurrentPack)

    useEffect(() => {
        dispatch(getCards({...queryParams, cardsPack_id:cardsPackID}))
        return () => {
            dispatch(ClearCardsListAC())

        }
    }, [queryParams])

    const addCardHandler = () => {
        if (cardsPackID) dispatch(addCard({card: {cardsPack_id: cardsPackID}}))
    }

    return (
        <div className={style.cards}>
            <div className={style.cards__wrapper}>
                <header className={style.cards__header}>
                    <h2 className={style.cards__title}>{currentPackName}</h2>
                    <Button
                        variant="contained"
                        onClick={addCardHandler}
                        disabled={userID !== cardsUserID}
                    >Add task
                    </Button>
                </header>
                <CardsSearchByQuestion />
                <CardsTable/>
                <CardsPagination/>
                <AddNewCardModal/>
            </div>
        </div>
    );
};
