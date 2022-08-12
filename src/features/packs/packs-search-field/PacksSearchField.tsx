import style from '../Packs.module.css';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {ChangeEvent} from 'react';
import {setSearchedValue} from '../packs-reducer';

export const PacksSearchField = () => {

    const dispatch = useAppDispatch();
    const packName = useAppSelector(state => state.packs.searchedValue);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchedValue(e.currentTarget.value));
    };

    return (
        <div className={style.search}>
            <input
                type="text"
                placeholder="Provide your text"
                value={packName}
                onChange={onSearchInputChange}
                className={style.searchField}
            />
            <SearchIcon fontSize={'small'} className={style.searchIcon}/>
        </div>
    );
};