import Box from '@mui/material/Box/Box';
import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select/Select';
import React from 'react';

export const AddNewCardSelectFormatQuestion = () => {
    const [age, setAge] = React.useState('Text');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <Select
                    value={age}
                    onChange={handleChange}
                    defaultValue={age}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                    <MenuItem value={'Picture'}>Picture</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};