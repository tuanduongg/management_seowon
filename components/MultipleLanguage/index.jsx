import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

const DEFAULT = [
    { title: 'Việt Nam', code: 'vn' },
    { title: 'Korean', code: 'kr' },
];

const MultipleSelect = () => {

    const [language, setLanguage] = useState('vn');
    const handleChange = (e) => {
        setLanguage(e?.target?.value);
    }
    return (
        <>
            <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Ngôn ngữ"
                onChange={handleChange}
                sx={{ fontWeight: 'bold' }}
            >
                {DEFAULT.map((item, index) => (
                    <MenuItem sx={{ fontWeight: 'bold' }} key={index} value={item.code}>{item.title}</MenuItem>))}
            </Select>
        </>
    );

}

export default MultipleSelect;