import {instance} from '../../common/instance/instance';

//api
export const learnAPI = {
    sendCardGrade(data: sendCardGradeQueryParams) {
        return instance.put<sendCardGradeResponseType>('/cards/grade', data);
    },
};

//types
export type CardGradeType = 1 | 2 | 3 | 4 | 5

export type sendCardGradeQueryParams = {
    grade: CardGradeType
    card_id: string
}

type sendCardGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}