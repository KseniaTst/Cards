import {TablePagination} from '@mui/material';
import React, {ChangeEvent} from 'react';
import {setCurrentPage, setPacksPerPage} from '../../packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';

export const PacksPagination = () => {

    const dispatch = useAppDispatch();
    const page = useAppSelector(state => state.packs.currentPage);
    const pageCount = useAppSelector(state => state.packs.packsPerPage);
    const packsAmount = useAppSelector(state => state.packs.packsAmount);

    const onPageChangeHandler = (event: unknown, newPage: number) => {
        dispatch(setCurrentPage(newPage + 1)); // initially newPage value is equal to currentPage value
    };

    const onPacksPerPageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPacksPerPage(+e.target.value));
    };

    return (
        <TablePagination
            labelRowsPerPage={'Packs per page'}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={packsAmount}
            rowsPerPage={pageCount}
            page={page - 1} // TablePagination component requires the first page to start with number 0
            onPageChange={onPageChangeHandler}
            onRowsPerPageChange={onPacksPerPageChangeHandler}
            showFirstButton
            showLastButton
        />
    )
}