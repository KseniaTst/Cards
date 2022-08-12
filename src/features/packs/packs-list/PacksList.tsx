import React, {useState, MouseEvent} from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {ResponseCardPackType} from '../packs-api';
import {setPacksSortBy, setPacksSortOrder} from '../packs-reducer';
import {Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {EnhancedTableHead} from '../../../common/enhancedTableHead/EnhancedTableHead';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {PacksPagination} from './packs-list-pagination/PacksPagination';
import {PacksTable} from './packs-list-table/PacksTable';

export const PacksList = () => {

    const [orderBy, setOrderBy] = useState<keyof ResponseCardPackType>('updated');
    const [dense, setDense] = useState(false);

    const dispatch = useAppDispatch();
    const order = useAppSelector(state => state.packs.sortOrder);

    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: keyof ResponseCardPackType,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        const sortPacks = `${isAsc ? 0 : 1}${property}`;
        dispatch(setPacksSortOrder(isAsc ? 'desc' : 'asc'));
        setOrderBy(property);
        dispatch(setPacksSortBy(sortPacks));
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <PacksTable/>
                    </Table>
                </TableContainer>
                <PacksPagination/>
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </Box>
    );
};
