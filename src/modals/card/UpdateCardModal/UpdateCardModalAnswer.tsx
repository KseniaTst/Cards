import React, {ChangeEvent} from 'react';
import TextField from "@mui/material/TextField/TextField";

type UpdateCardModalAnswerPropsType = {
    textAnswer:string
    updateTextAnswer:(text:string) => void
}

export const UpdateCardModalAnswer:React.FC<UpdateCardModalAnswerPropsType> = ({textAnswer,updateTextAnswer}) => {

    const setNewAnswerHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateTextAnswer(e.currentTarget.value)
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Update question"
                variant="standard"
                value={textAnswer}
                onChange={setNewAnswerHandler}
                style={{width:"100%", margin:"15px 0"}}
            />
        </div>
    );
};