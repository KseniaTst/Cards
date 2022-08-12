import style from '../Packs.module.css';
import {Slider} from '@mui/material';
import {setMinAndMaxCardsAmount} from '../packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {useState} from 'react';

export const CardsAmountSlider = () => {

    const dispatch = useAppDispatch();
    const min = useAppSelector(state => state.packs.minAndMaxCardsAmount[0]);
    const max = useAppSelector(state => state.packs.minAndMaxCardsAmount[1]);

    const [value, setValue] = useState<number | number[]>([0, 110]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue);
    };

    const onChangeCommittedHandler = () => {
        dispatch(setMinAndMaxCardsAmount(value as number[]));
    };

    return (
        <div className={style.cardsAmountSliderContainer}>
            <div className={style.cardsAmountSliderMinValue}>{min}</div>
            <Slider
                min={0}
                max={110}
                value={value}
                onChange={handleChange}
                onChangeCommitted={onChangeCommittedHandler}
                className={style.cardsAmountSlider}
            />
            <div className={style.cardsAmountSliderMaxValue}>{max}</div>
        </div>
    );
};