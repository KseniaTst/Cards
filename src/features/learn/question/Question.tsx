import React, {FC, useEffect, useState} from 'react';
import {getCard} from '../../../utils/random-utils';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {setCard} from '../learn-reducer';
import style from './Question.module.css';
import {QuestionButtons} from './question-buttons/QuestionButtons';
import {QuestionRadio} from './question-radio/QuestionRadio';
import TargetIcon from '../../../assets/img/Target.png';

type QuestionPropsType = {
    packName: string
}

export const Question: FC<QuestionPropsType> = ({packName}) => {

    const dispatch = useAppDispatch();

    const cards = useAppSelector(state => state.cards.cards);
    const card = useAppSelector(state => state.learn.card);

    const [radioValue, setRadioValue] = useState(1);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        dispatch(setCard(getCard(cards)));
    }, [cards]);

    return (
        <div className={style.questionContainer}>
            <div className={style.packName}>
                <span>Learn </span>
                <span className={style.packNameTitle}>"{packName}"</span>
            </div>
            <div className={style.questionWrapper}>
                <div className={style.attempts}>
                    <img src={TargetIcon} width={'15px'} height={'15px'} alt={'target'}/>
                    <span className={style.attemptsTitle}>
                            number of attempts to answer the question:
                    </span>
                    <span className={style.attemptsAmount}>
                            {card.shots}
                    </span>
                </div>
                <div className={style.questionAndAnswer}>
                    <div className={style.questionAndAnswerTitle}>
                        Question:
                    </div>
                    <div className={style.questionAndAnswerText}>
                        {card && card.question}
                    </div>
                </div>
                <QuestionRadio showAnswer={showAnswer} radioValue={radioValue} setRadioValue={setRadioValue}/>
                <QuestionButtons showAnswer={showAnswer} radioValue={radioValue} setShowAnswer={setShowAnswer}/>
            </div>
        </div>
    );
};
