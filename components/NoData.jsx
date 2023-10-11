import SourceIcon from '@mui/icons-material/Source';
const { Box, Typography } = require("@mui/material")


const NoData = () => {

    return (<>
        <Box sx={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
            <SourceIcon sx={{ color: '#6d6d6d', fontSize: '20px', marginRight: '5px' }} />
            <Typography sx={{ color: '#6d6d6d', fontSize: '20px' }} component={'p'} variant='p'>Empty Data</Typography>
        </Box>
    </>
    )
}

export default NoData;