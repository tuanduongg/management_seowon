import SourceIcon from '@mui/icons-material/Source';
import { t } from "i18next";
const { Box, Typography } = require("@mui/material");


const NoData = () => {

    return (<>
        <Box sx={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
            <SourceIcon sx={{ color: '#6d6d6d', fontSize: '20px', marginRight: '5px' }} />
            <Typography sx={{ color: '#6d6d6d', fontSize: '20px' }} component={'p'} variant='p'>{t('empty-data')}</Typography>
        </Box>
    </>
    )
}

export default NoData;