import {getComparator, Order, stableSort} from '../../../../utils/sort-utils';
import {changePack, setCurrentPackName} from '../../packs-reducer';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {Edit, School} from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {ResponseCardPackType} from '../../packs-api';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';
import {DeleteModal} from "../../../../common/modals/customModals/packsList/DeleteModal";

type PacksTablePropsType = {
    orderBy: keyof ResponseCardPackType
}

export const PacksTable = (props: PacksTablePropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');

    const dispatch = useAppDispatch();
    const packs = useAppSelector<ResponseCardPackType[]>(state => state.packs.packsList);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const order = useAppSelector<Order>(state => state.packs.sortOrder);

    return (
        <TableBody>
            {stableSort(packs, getComparator(order, props.orderBy))
                .map((pack) => {

                    const date = new Date(pack.updated);
                    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                    const packChange = () => {
                        setEditMode(false);

                        if (changedPackValue.trim() !== '' && changedPackValue.trim() !== pack.name) {
                            dispatch(changePack({_id: pack._id, name: changedPackValue}, user_id));
                        }
                    };

                    const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        setChangedPackValue(e.currentTarget.value);
                    };

                    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') packChange();
                    };

                    const onEditButtonClickHandler = () => {
                        setEditMode(true);
                        setChangedPackValue(pack.name);
                        setChangedPackID(pack._id);
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
                                    <DeleteModal packId={pack._id} userId={pack.user_id} packName={pack.name}/>
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
                                <IconButton disabled={true}>
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