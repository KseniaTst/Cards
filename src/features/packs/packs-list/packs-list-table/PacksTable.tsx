import {changePack, removePack, setCurrentPackName} from '../../packs-reducer';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import {Delete, Edit, School} from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';

export const PacksTable = () => {

    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');

    const dispatch = useAppDispatch();
    const packs = useAppSelector(state => state.packs.packsList);
    const user_id = useAppSelector(state => state.profile.UserData._id);

    return (
        <TableBody>
            {packs.map((pack) => {

                const date = new Date(pack.updated);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                const packChange = () => {
                    setEditMode(false);

                    if (changedPackValue.trim() !== '' && changedPackValue.trim() !== pack.name) {
                        dispatch(changePack({_id: pack._id, name: changedPackValue}));
                    }
                };

                const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    setChangedPackValue(e.currentTarget.value);
                };

                const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') packChange();
                };

                const onDeleteButtonClickHandler = () => {
                    dispatch(removePack(pack._id));
                };

                const onEditButtonClickHandler = () => {
                    setEditMode(true);
                    setChangedPackValue(pack.name);
                    setChangedPackID(pack._id);
                };

                const onSchoolButtonClickHandler = () => {
                    return navigate(`/learn/${pack._id}`);
                };

                const setCurrentPackNameHandler = () => {
                    dispatch(setCurrentPackName(pack.name));
                };

                const activateEditMode = () => {
                    if (editMode && changedPackID === pack._id) {
                        return (
                            <TextField
                                value={changedPackValue}
                                autoFocus
                                onBlur={packChange}
                                onKeyUp={onKeyUpHandler}
                                onChange={onPackChangeHandler}
                                size={'small'}
                            />
                        );
                    } else {
                        return <NavLink
                            style={{textDecoration: 'none'}}
                            to={`/cards/${pack._id}`}
                            onClick={setCurrentPackNameHandler}
                        >
                            {pack.name}
                        </NavLink>;
                    }
                };

                const showUserPackButtons = () => {
                    if (user_id === pack.user_id) {
                        return (
                            <>
                                <IconButton onClick={onDeleteButtonClickHandler}>
                                    <Delete/>
                                </IconButton>
                                <IconButton onClick={onEditButtonClickHandler}>
                                    <Edit/>
                                </IconButton>
                            </>
                        );
                    }
                };

                const align = 'left';

                return (
                    <TableRow key={pack._id}>
                        <TableCell component="th" scope="row">
                            {activateEditMode()}
                        </TableCell>
                        <TableCell align={align}>{pack.cardsCount}</TableCell>
                        <TableCell align={align}>{formattedDate}</TableCell>
                        <TableCell align={align}>{pack.user_name}</TableCell>
                        <TableCell align={align}>
                            <IconButton onClick={onSchoolButtonClickHandler} disabled={pack.cardsCount === 0}>
                                <School/>
                            </IconButton>
                            {showUserPackButtons()}
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};