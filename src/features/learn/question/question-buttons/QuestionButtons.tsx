import Button from '@mui/material/Button';
import React, {FC} from 'react';
import {updateCardGrade} from '../../learn-reducer';
import {CardGradeType} from '../../learn-api';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';
import style from '../Question.module.css';

type QuestionButtonsPropsType = {
    showAnswer: boolean
    radioValue: number
    setShowAnswer: (value: boolean) => void
}

export const QuestionButtons: FC<QuestionButtonsPropsType> = ({showAnswer, radioValue, setShowAnswer}) => {

    const dispatch = useAppDispatch();

    const card = useAppSelector(state => state.learn.card);

    const onShowAnswerClickHandler = () => {
        setShowAnswer(true);
    };

    const onNextQuestionClickHandler = () => {
        dispatch(updateCardGrade({grade: radioValue as CardGradeType, card_id: card._id}));
        setShowAnswer(false);
    };

    if (!showAnswer) {
        return (
            <div style={{marginTop: '30px'}}>
                <Button
                    variant={'contained'}
                    onClick={onShowAnswerClickHandler}
                    className={style.buttons}
                >
                    SHOW ANSWER
                </Button>
            </div>
        );
    } else {
        return (
            <div style={{marginTop: '30px'}}>
                <Button
                    variant={'contained'}
                    onClick={onNextQuestionClickHandler}
                    className={style.buttons}
                >
                    NEXT QUESTION
                </Button>
            </div>
        );
    }
}