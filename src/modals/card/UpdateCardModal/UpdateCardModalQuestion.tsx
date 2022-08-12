import React, {ChangeEvent} from 'react';
import TextField from "@mui/material/TextField/TextField";

type UpdateCardModalQuestionPropsType = {
    textQuestion:string
    updateTextQuestion:(text:string) => void
}

export const UpdateCardModalQuestion:React.FC<UpdateCardModalQuestionPropsType> = ({textQuestion,updateTextQuestion}) => {

    const setNewQuestionHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateTextQuestion(e.currentTarget.value)
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Update question"
                variant="standard"
                value={textQuestion}
                onChange={setNewQuestionHandler}
                style={{width:"100%", margin:"15px 0"}}
            />
        </div>
    );
};