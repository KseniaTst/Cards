import React, {useState} from 'react';
import Button from '@mui/material/Button/Button';
import {CustomModal} from '../../CustomModal';
import {IconButton} from '@mui/material';
import {Edit} from '@mui/icons-material';
import style from '../CardModal.module.css';
import {updateCard} from '../../../features/cards/cards-reducer';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {UpdateCardModalQuestion} from './UpdateCardModalQuestion';
import {UpdateCardModalAnswer} from './UpdateCardModalAnswer';

type UpdateCardModalPropsType = {
    cardID:string
    cardPackID:string
    isDisabled:boolean
    questionText:string
    answerText:string
}

export const UpdateCardModal:React.FC<UpdateCardModalPropsType> = (props) => {
    const {
        cardPackID,
        questionText,
        answerText,
        cardID,
        isDisabled
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const [newAnswerText,setNewAnswerText] = useState(answerText)
    const [newQuestionText,setNewQuestionText] = useState(questionText)
    const dispatch = useAppDispatch()

    const handleUpdateCard = () => {
        dispatch(updateCard(cardID, cardPackID, newQuestionText, newAnswerText))
    }

    return (
        <>
            <IconButton onClick={handleOpen} disabled={isDisabled}>
                <Edit/>
            </IconButton>
            <CustomModal modalName={'Update card'} open={isOpen} handleClose={handleClose}>
                <div className={style.cardModal__wrapper}>
                    <UpdateCardModalQuestion textQuestion={newQuestionText} updateTextQuestion={setNewQuestionText}/>
                    <UpdateCardModalAnswer textAnswer={newAnswerText} updateTextAnswer={setNewAnswerText}/>
                    <div  className={style.cardModal__buttons}>
                        <Button variant={"contained"} color={"inherit"} onClick={handleClose}>Cancel</Button>
                        <Button variant={"contained"} color={"error"} onClick={handleUpdateCard}>Update</Button>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};