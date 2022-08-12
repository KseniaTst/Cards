import style from './Packs.module.css';
import {Navigate} from 'react-router-dom';
import {PacksList} from './packs-list/PacksList';
import {fetchPacks} from './packs-reducer';
import {useAppDispatch, useAppSelector, useDebounce} from '../../common/hooks/hooks';
import {PacksHeader} from './packs-header/PacksHeader';
import {CardsAmountSlider} from './packs-slider/CardsAmountSlider';
import {PacksSearchField} from './packs-search-field/PacksSearchField';
import {useEffect} from 'react';

export const Packs = () => {

    const dispatch = useAppDispatch();
    const page = useAppSelector(state => state.packs.currentPage);
    const pageCount = useAppSelector(state => state.packs.packsPerPage);
    const user_id = useAppSelector(state => state.profile.UserData._id);
    const min = useAppSelector(state => state.packs.minAndMaxCardsAmount[0]);
    const max = useAppSelector(state => state.packs.minAndMaxCardsAmount[1]);
    const sortPacks = useAppSelector(state => state.packs.sortBy);
    const requestedPacks = useAppSelector(state => state.packs.requestedPacks);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const packName = useAppSelector(state => state.packs.searchedValue);

    const debouncedValue = useDebounce(packName, 500);

    useEffect(() => {
        dispatch(fetchPacks());
    }, [dispatch, page, pageCount, user_id, min, max, sortPacks, debouncedValue, requestedPacks]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <PacksHeader/>
            <div className={style.controlPanel}>
                <PacksSearchField/>
                <CardsAmountSlider/>
            </div>
            <PacksList/>
        </div>
    );
};