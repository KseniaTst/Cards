import {instance} from '../../common/instance/instance';

export const packsAPI = {
    getPacks(data: GetPacksParamsType = {}) {
        return instance.get<GetPacksResponseType>('cards/pack', {params: data});
    },
    createPack(name:string,privat:boolean) {
        return instance.post('cards/pack', {cardsPack: {name: name, deckCover: 'some url', private: privat}});
    },
    deletePack(packID: string) {
        return instance.delete(`cards/pack?id=${packID}`);
    },
    updatePack(data: UpdatePackParamsType) {
        return instance.put('cards/pack', {cardsPack: data});
    },
};

// types
export type ResponseCardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string | null
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

type GetPacksResponseType = {
    cardPacks: ResponseCardPackType[],
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type GetPacksParamsType = {
    packName?: string
    page?: number
    pageCount?: number
    user_id?: string
    min?: number
    max?: number
    sortPacks?: string
}

export type UpdatePackParamsType = {
    _id: string
    name?: string
    private?:boolean
}

