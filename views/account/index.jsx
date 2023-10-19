import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { RouteApi } from 'RouteApi';
import restApi from 'utils/restAPI';
import Loading from 'components/MatxLoading';
import { ShowAlert, ShowQuestion } from 'utils/confirm';
import ModalAddStage from 'components/ModalAddStage';
import { ROWPERPAGE } from 'utils/constant';
import SearchIcon from '@mui/icons-material/Search';
import { showDateTimeFromDB } from 'utils/utils';
import ModalAccount from 'components/ModalAccount';




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
        title: 'Username',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Department',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Role',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Recently update',
        // with: '50px',
        align: 'center'
    },
];




const Account = () => {
    const [openModal, setOpenModal] = useState(false);
    const [dataList, setDataList] = useState([]);
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState(null);
    const [rowEdit, setRowEdit] = useState(null);
    const [typeModal, setTypeModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [rowPerpage, setRowPerpage] = useState(ROWPERPAGE[0]);


    const onCloseModal = () => {
        setSelected(null);
        setRowEdit(null);
        setOpenModal(false);
    }

    const getData = async () => {
        setLoading(true);
        const url = RouteApi.getUser;
        const response = await restApi.post(url, { search, page, rowPerpage });
        if (response?.status === 200) {
            setDataList(response?.data?.data);
            setTotal(response?.data?.count);
            setLoading(false);
        } else {
            setLoading(false);

        }
    }

    const afterSave = () => {
        onCloseModal();
        getData();
    }


    // useEffect(() => {
    //     getData();
    // }, [])
    const onClickAdd = () => {
        setTypeModal('ADD');
        setOpenModal(true);
    }
    const onClickEdit = () => {
        setTypeModal('EDIT');
        setRowEdit(selected);
        setOpenModal(true);
    }
    const handleClickRow = (row) => {
        setSelected(row);
    }

    const handleChangeRowsPerPage = (e) => {
        setPage(0);
        setRowPerpage(e.target.value);
    }

    const handleChangePage = (e, page) => {
        setPage(page);
    }

    useEffect(() => {
        getData();
    }, [page, rowPerpage])

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleClickSearch = () => {
        getData();
    }

    const handleClickDelete = () => {
        ShowQuestion({
            content: 'Bạn chắc chắn muốn xóa ?',
            icon: 'warning',
            onClickYes: async () => {
                const response = await restApi.post(RouteApi.deleteUser, { id: selected?.user_id });
                if (response?.status === 200) {
                    ShowAlert({
                        textProp: 'Xóa thành công!',
                        onClose: () => {
                            getData();
                        }
                    });
                } else {
                    ShowAlert({
                        iconProp: 'warning',
                        textProp: 'Xóa thất bại!',
                    });
                }
            }
        });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickSearch();
        }

    }

    if (loading) return <Loading />;
    return (<><Grid container spacing={3}>
        <Typography component={'h5'} sx={{ marginLeft: '20px' }} variant='h5'>Account</Typography >
        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} item lg={12} md={12} sm={12} xs={12}>
            <Box>
                <FormControl size='small' sx={{}} variant="outlined">
                    <InputLabel htmlFor="search">Search</InputLabel>
                    <OutlinedInput
                        value={search}
                        onKeyDown={handleKeyDown}
                        onChange={onChangeSearch}
                        placeholder='Search by name or code...'
                        id="search"
                        type={'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickSearch}
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
                <Button size='small' disabled={!selected || selected?.role === 'ADMIN'} sx={{ marginRight: '15px' }} onClick={onClickEdit} startIcon={<EditIcon />} variant="contained">{t('btn-edit')}</Button>
                <Button size='small' disabled={!selected || selected?.role === 'ADMIN'} onClick={handleClickDelete} variant="contained" startIcon={<DeleteIcon />}>
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
                    {dataList?.map((item, index) => (<StyledTableRow hover onClick={() => { handleClickRow(item) }} selected={item?.user_id === selected?.user_id} sx={{ cursor: 'pointer' }}>
                        <StyledTableCell align='center'>
                            {index + 1 + (page * rowPerpage)}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.username}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.department_name}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.role}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {showDateTimeFromDB(item?.updated_at)}
                        </StyledTableCell>
                    </StyledTableRow>))}
                </Table>
            </TableContainer>
            {dataList?.length > 0 && (<TablePagination
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
        <ModalAccount open={openModal} rowSelect={rowEdit} typeModal={typeModal} afterSave={afterSave} onCloseModal={onCloseModal} />
    </>);
}

export default Account;