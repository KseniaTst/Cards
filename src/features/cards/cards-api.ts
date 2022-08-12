import {instance} from '../../common/instance/instance';

export const cardsAPI = {
    getCards(queryParam: getCardQueryParams) {
        return instance.get<ResponseGetCardType>('/cards/card', {
            params: queryParam,
        });
    },
    createCard(data: RequestCreateCardType) {
        return instance.post('/cards/card', data);
    },
    deleteCard(cardID: string) {
        return instance.delete('/cards/card', {
            params: {
                id: cardID,
            },
        });
    },
    updateCard(data: RequestUpdateCardType) {
        return instance.put('/cards/card', data);
    },
};

export type CardType = {
    '_id': string
    'cardsPack_id': string
    'user_id': string
    'answer': string
    'question': string
    'grade': number
    'shots': number
    'comments': string
    'type': string
    'rating': number
    'more_id': string
    'created': string
    'updated': string
    '__v': number
}

export type ResponseGetCardType = {
    'cards': CardType[],
    'packUserId': string
    'page': number
    'pageCount': number
    'cardsTotalCount': number
    'minGrade': number
    'maxGrade': number
    'token': string
    'tokenDeathTime': number
}

export type RequestCreateCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}

export type RequestUpdateCardType = {
    card: {
        _id: string
        question?: string
        answer?: string
    }
}

export type getCardQueryParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string | undefined
    min?: string
    max?: string
    sortCards?: string
    page?: number
    pageCount?: number
}
