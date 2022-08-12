import {ResponseCardPackType} from '../../features/packs/packs-api';
import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import {visuallyHidden} from '@mui/utils';
import {Order} from '../../features/packs/packs-reducer';

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ResponseCardPackType) => void;
    order: Order;
    orderBy: string;
}

interface HeadCell {
    id: keyof ResponseCardPackType;
    label: string;
    numeric: boolean;
    width: string
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        label: 'Name',
        width: '25%'
    },
    {
        id: 'cardsCount',
        numeric: true,
        label: 'Cards count',
        width: '15%'
    },
    {
        id: 'updated',
        numeric: false,
        label: 'Update',
        width: '20%'
    },
    {
        id: 'user_name',
        numeric: false,
        label: 'Author name',
        width: '25%'
    },
];

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler =
        (property: keyof ResponseCardPackType) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'left'}
                            padding={'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{fontWeight: 'bold', width: headCell.width}}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                ))}
                <TableCell align={'left'} style={{fontWeight: 'bold', width: '15%'}}>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}