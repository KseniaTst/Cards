import React, {useState} from 'react';
import {CustomModal} from "../../CustomModal";
import style from '../CardModal.module.css'
import {AddNewCardSelectFormatQuestion} from "./AddNewCardSelectFormatQuestion";
import {AddNewCardModalQuestion} from "./AddNewCardModalQuestion";
import {AddNewCardModalAnswer} from "./AddNewCardModalAnswer";
import Button from '@mui/material/Button/Button';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {addCard} from "../../../features/cards/cards-reducer";
import {useParams} from "react-router-dom";
import {RequestCreateCardType} from "../../../features/cards/cards-api";

type AddNewCardModalPropsType = {
    isDisabled:boolean
}

export const AddNewCardModal:React.FC<AddNewCardModalPropsType> = ({isDisabled}) => {
    const {cardsPackID} = useParams()
    const [textQuestion, setTextQuestion] = useState('')
    const [textAnswer, setTextAnswer] = useState('')
    const [isOpen,setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const dispatch = useAppDispatch()

    const addCardHandler = () => {
        const data:RequestCreateCardType = {
            card: {
                cardsPack_id: cardsPackID || "",
                question:textQuestion,
                answer:textAnswer
            }
        }
        dispatch(addCard(data))
        setIsOpen(false)
        setTextAnswer('')
        setTextQuestion('')
    }

    return (
        <>
        <Button onClick={handleOpen} variant={"contained"} disabled={isDisabled}>add card</Button>
        <CustomModal modalName={'Add new card'} open={isOpen} handleClose={handleClose}>
            <div className={style.cardModal__wrapper}>
                <h4 className={style.addCardModal__text}>Choose a question format</h4>
                <AddNewCardSelectFormatQuestion/>
                <AddNewCardModalQuestion question={textQuestion} setQuestion={setTextQuestion}/>
                <AddNewCardModalAnswer answer={textAnswer} setAnswer={setTextAnswer}/>
                <Button variant="contained" onClick={addCardHandler}>Add</Button>
            </div>
        </CustomModal>
        </>
    );
};
