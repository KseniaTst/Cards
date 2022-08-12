import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent } from 'react';
import style from '../CardModal.module.css'

type AddNewCardModalAnswerPropsType = {
    answer:string
    setAnswer:(text:string) => void
}

export const AddNewCardModalAnswer:React.FC<AddNewCardModalAnswerPropsType> = (props) => {
    const {
        answer,
        setAnswer
    } = props

    const setAnswerHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <div className={style.cardModal__answer}>
            <TextField
                id="standard-basic"
                label="Answer"
                variant="standard"
                value={answer}
                onChange={setAnswerHandler}
                style={{width:"100%", margin:"15px 0"}}
            />
        </div>

    );
};