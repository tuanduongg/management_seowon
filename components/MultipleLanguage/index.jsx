import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from 'react-i18next'


const DEFAULT = [
    { title: 'Việt Nam', code: 'vn' },
    { title: 'Korean', code: 'ko' },
    { title: 'English', code: 'en' },
];

const MultipleSelect = () => {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language);
    const handleChange = (e) => {
        setLanguage(e?.target?.value);
        i18n.changeLanguage(e?.target?.value);
        localStorage.setItem('LANGUAGE', e?.target?.value);
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