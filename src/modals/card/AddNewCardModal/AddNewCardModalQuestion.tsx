import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent } from 'react';
import style from '../CardModal.module.css'

type AddNewCardModalQuestionPropsType = {
    question:string
    setQuestion:(text:string) => void
}

export const AddNewCardModalQuestion:React.FC<AddNewCardModalQuestionPropsType> = (props) => {
    const {
        question,
        setQuestion
    } = props

    const setQuestionHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }

    return (
        <div className={style.cardModal__question}>
            <TextField
                id="standard-basic"
                label="Question"
                variant="standard"
                value={question}
                onChange={setQuestionHandler}
                style={{width:"100%", margin:"15px 0"}}
            />
        </div>
    );
};