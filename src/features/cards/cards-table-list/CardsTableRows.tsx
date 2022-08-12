import TableBody from '@mui/material/TableBody/TableBody';
import TableCell from '@mui/material/TableCell/TableCell';
import TableRow from '@mui/material/TableRow/TableRow';
import React, {useEffect} from 'react';
import {CardType} from '../cards-api';
import {IconButton, Rating} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {changeCardsTotalCountAC, deleteCard, updateCard} from "../cards-reducer";

import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {convertDate} from "../../../utils/convert-date";
import {DeleteCardModal} from "../../../modals/card/DeleteCardModal/DeleteCardModal";
import {UpdateCardModal} from "../../../modals/card/UpdateCardModal/UpdateCardModal";

type CardsTableRowsPropsType = {
    rows: CardType[]
}

export const CardsTableRows: React.FC<CardsTableRowsPropsType> = (props) => {
    const {
        rows
    } = props

    useEffect(() => {
        return () => {
            dispatch(changeCardsTotalCountAC(-1))
        }
    },[])

    const userID = useAppSelector(state => state.profile.UserData._id);

    const dispatch = useAppDispatch()

    const deleteCardHandler = (cardID: string, cardsPackID: string) => {
        dispatch(deleteCard(cardID, cardsPackID))
    }

    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.question + Math.random()}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        {row.question}
                    </TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{convertDate(row.updated)}</TableCell>
                    <TableCell valign={"middle"}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Rating name="disabled" value={row.grade} disabled/>
                            <DeleteCardModal cardPackID={row.cardsPack_id} cardID={row._id} isDisabled={userID !== row.user_id}/>
                            {/*<IconButton*/}
                            {/*    onClick={() => updateCardHandler(row._id, row.cardsPack_id)}*/}
                            {/*    disabled={userID !== row.user_id}*/}
                            {/*>*/}
                            {/*    <Edit/>*/}
                            {/*</IconButton>*/}
                            <UpdateCardModal
                                cardID={row._id}
                                cardPackID={row.cardsPack_id}
                                isDisabled={userID !== row.user_id}
                                answerText={row.answer}
                                questionText={row.question}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );


};
