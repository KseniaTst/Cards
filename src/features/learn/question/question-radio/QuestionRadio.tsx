import React, {ChangeEvent, FC} from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {useAppSelector} from '../../../../common/hooks/hooks';
import style from '../Question.module.css';

type QuestionRadioPropsType = {
    showAnswer: boolean
    radioValue: number
    setRadioValue: (value: number) => void
}

export const QuestionRadio: FC<QuestionRadioPropsType> = ({showAnswer, radioValue, setRadioValue}) => {

    const card = useAppSelector(state => state.learn.card);

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(+(event.target as HTMLInputElement).value);
    };

    if (showAnswer) {
        return (
            <>
                <div className={style.questionAndAnswer}>
                    <div className={style.questionAndAnswerTitle}>
                        Answer:
                    </div>
                    <div className={style.questionAndAnswerText}>
                        {card.answer}
                    </div>
                </div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Rate yourself:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                        onChange={onRadioChangeHandler}
                    >
                        <FormControlLabel value={1} control={<Radio/>} label="Did not know"/>
                        <FormControlLabel value={2} control={<Radio/>} label="Forgot"/>
                        <FormControlLabel value={3} control={<Radio/>} label="A lot of thought"/>
                        <FormControlLabel value={4} control={<Radio/>} label="Confused"/>
                        <FormControlLabel value={5} control={<Radio/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </>
        );
    } else {
        return <></>;
    }
};