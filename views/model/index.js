import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import NoData from "components/NoData";
import { H4 } from "components/Typography";
import { useTranslation } from "react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import ModalAddModel from 'components/ModalAddModel';
import { useEffect, useState } from 'react';
import { RouteApi } from 'RouteApi';
import restApi from 'utils/restAPI';



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
const ROWPERPAGE = [3, 5, 10, 20];




const Model = () => {
    const [openModal, setOpenModal] = useState(false);
    const [colors, setColors] = useState([]);
    const [models, setModels] = useState([]);
    const [total, setTotal] = useState(0);
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowPerpage, setRowPerpage] = useState(ROWPERPAGE[0]);
    const [selected, setSelected] = useState(null);
    const [rowEdit, setRowEdit] = useState(null);
    const [typeModal, setTypeModal] = useState('');


    const onCloseModal = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
        setRowEdit(null);
        setOpenModal(false);
    }

    const getColors = async () => {
        const url = RouteApi.getColors;
        const response = await restApi.get(url);
        setColors(response?.data);
    }

    const getModels = async () => {
        const url = RouteApi.getModels;
        const response = await restApi.post(url, { page, rowPerpage });
        setModels(response?.data?.models);
        setTotal(response?.data?.total)
    }
    useEffect(() => {
        getModels();
    }, [page, rowPerpage])
    const afterSave = () => {
        getModels();
        setOpenModal(false);
    }

    const handleChangePage = (e, page) => {
        setPage(page);
    }

    useEffect(() => {
        getModels();
        getColors();
    }, [])
    const onClickAdd = () => {
        setTypeModal('ADD');
        setOpenModal(true);
    }
    const handleChangeRowsPerPage = (e) => {
        setPage(0);
        setRowPerpage(e.target.value);
    }
    const onClickEdit = () => {
        setTypeModal('EDIT');
        setRowEdit(selected);
        setOpenModal(true);
    }
    const handleClickRow = (row) => {
        setSelected(row);
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
                <Button size='small' disabled={!selected} sx={{ marginRight: '15px' }} onClick={onClickEdit} startIcon={<EditIcon />} variant="contained">{t('btn-edit')}</Button>
                <Button size='small' disabled={!selected} variant="contained" startIcon={<DeleteIcon />}>
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
                    {models?.map((item, index) => (<StyledTableRow hover onClick={() => { handleClickRow(item) }} selected={item?.model_id === selected?.model_id} sx={{ cursor: 'pointer' }} hover>
                        <StyledTableCell align='center'>
                            {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.model_name}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.model_code}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.color}
                        </StyledTableCell>
                    </StyledTableRow>))}

                </Table>
            </TableContainer>
            {models?.length > 0 && (<TablePagination
                rowsPerPageOptions={ROWPERPAGE}
                component="div"
                count={total}
                rowsPerPage={rowPerpage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />)}
        </Grid>
    </Grid>
        <ModalAddModel open={openModal} rowSelect={rowEdit} typeModal={typeModal} afterSave={afterSave} colors={colors} onCloseModal={onCloseModal} />
    </>);
}

export default Model;