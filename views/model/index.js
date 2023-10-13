import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import NoData from "components/NoData";
import { H4 } from "components/Typography";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import ModalAddModel from 'components/ModalAddModel';
import { useState } from 'react';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: '12px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const HEAD_TABLE = [
    {
        title: 'STT',
        with: '50px',
        align: 'center'
    },
    {
        title: 'Code',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Name',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Color',
        // with: '50px',
        align: 'center'
    },
];




const Model = () => {
    const [openModal, setOpenModal] = useState(false);
    const { t, i18n } = useTranslation();
    const onCloseModal = () => {
        setOpenModal(false);
    }

    const onClickAdd = () => {
        setOpenModal(true);
    }
    return (<><Grid container spacing={3}>
        <Typography component={'h5'} sx={{ marginLeft: '20px' }} variant='h5'>Model</Typography >

        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} item lg={12} md={12} sm={12} xs={12}>
            <Box>
                <FormControl size='small' sx={{}} variant="outlined">
                    <InputLabel htmlFor="search">Search</InputLabel>
                    <OutlinedInput
                        placeholder='Search by name or code...'
                        id="search"
                        type={'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex' }}>

                <Button size='small' sx={{ marginRight: '5px' }} startIcon={<AddIcon />} onClick={onClickAdd} variant="contained">{t('btn-add')}</Button>
                <Button size='small' sx={{ marginRight: '15px' }} startIcon={<EditIcon />} variant="contained">{t('btn-edit')}</Button>
                <Button size='small' variant="contained" startIcon={<DeleteIcon />}>
                    {t('btn-delete')}
                </Button>
            </Box>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
            <TableContainer sx={{ backgroundColor: '#e3e3e3ed' }}>
                <Table stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {HEAD_TABLE.map((item, index) => (
                                <StyledTableCell key={index} width={item?.with} align={item?.align}>{item?.title}</StyledTableCell>))}
                        </TableRow>
                    </TableHead>
                    <StyledTableRow sx={{ cursor: 'pointer' }} hover>
                        <StyledTableCell align='center'>
                            1
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            GH-902843
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            GH350
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            Blue
                        </StyledTableCell>
                    </StyledTableRow>

                </Table>
            </TableContainer>
        </Grid>
    </Grid>
        <ModalAddModel open={openModal} onCloseModal={onCloseModal} />
    </>);
}

export default Model;