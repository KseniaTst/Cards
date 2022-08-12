import React, {useState} from 'react';
import Button from '@mui/material/Button/Button';
import {CustomModal} from '../../CustomModal';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import style from '../CardModal.module.css';
import {deleteCard} from '../../../features/cards/cards-reducer';
import {useAppDispatch} from '../../../common/hooks/hooks';


type DeleteCardModalPropsType = {
    cardID: string
    cardPackID: string
    isDisabled: boolean
}

export const DeleteCardModal: React.FC<DeleteCardModalPropsType> = ({cardPackID, cardID, isDisabled}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const dispatch = useAppDispatch();

    const handleDeleteCard = () => {
        dispatch(deleteCard(cardID, cardPackID));
    };
    return (
        <>
            <IconButton onClick={handleOpen} disabled={isDisabled}>
                <Delete/>
            </IconButton>
            <CustomModal modalName={'Delete card'} open={isOpen} handleClose={handleClose}>
                <div className={style.cardModal__wrapper}>
                    <p className={style.deleteCardModal__text}>Do you really want to remove card?
                    </p>
                    <div className={style.cardModal__buttons}>
                        <Button variant={'contained'} color={'inherit'} onClick={handleClose}>Cancel</Button>
                        <Button variant={'contained'} color={'error'} onClick={handleDeleteCard}>Delete</Button>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};