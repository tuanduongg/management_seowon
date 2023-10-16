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
import Loading from 'components/MatxLoading';
import { ShowAlert, ShowQuestion } from 'utils/confirm';
import ModalAddTime from 'components/ModalAddTime';



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
        title: 'Time name',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Value',
        // with: '50px',
        align: 'center'
    },
];
const ROWPERPAGE = [5, 10, 20];




const Time = () => {
    const [openModal, setOpenModal] = useState(false);
    const [colors, setColors] = useState([]);
    const [times, setTimes] = useState([]);
    const [total, setTotal] = useState(0);
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [rowPerpage, setRowPerpage] = useState(ROWPERPAGE[0]);
    const [selected, setSelected] = useState(null);
    const [rowEdit, setRowEdit] = useState(null);
    const [typeModal, setTypeModal] = useState('');
    const [loading, setLoading] = useState(false);


    const onCloseModal = () => {

        setRowEdit(null);
        setSelected(null);
        setOpenModal(false);
    }
    const getData = async () => {
        setLoading(true);
        const url = RouteApi.getTime;
        const response = await restApi.post(url, {});
        if (response?.status === 200) {
            setTimes(response?.data);
            setLoading(false);
        } else {
            setLoading(false);

        }
    }
    useEffect(() => {
        getData();
    }, [page, rowPerpage])
    const afterSave = () => {
        getData();
        setOpenModal(false);
    }

    const handleChangePage = (e, page) => {
        setPage(page);
    }
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
    const onChangeSearch = (e) => {
        setSearch(e.target.value);

    }
    const handleClickSearch = () => {
        setPage(0);
        getData();
    }

    const handleClickDelete = () => {
        ShowQuestion({
            content: 'Bạn chắc chắn muốn xóa ?',
            icon: 'warning',
            onClickYes: async () => {
                const response = await restApi.post(RouteApi.deleteTime, { id: selected?.time_id });
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

    if (loading) return <Loading />;
    return (<><Grid container spacing={3}>
        <Typography component={'h5'} sx={{ marginLeft: '20px' }} variant='h5'>Time</Typography >

        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ display: 'flex' }}>

                <Button size='small' sx={{ marginRight: '5px' }} startIcon={<AddIcon />} onClick={onClickAdd} variant="contained">{t('btn-add')}</Button>
                <Button size='small' disabled={!selected} sx={{ marginRight: '15px' }} onClick={onClickEdit} startIcon={<EditIcon />} variant="contained">{t('btn-edit')}</Button>
                <Button size='small' disabled={!selected} onClick={handleClickDelete} variant="contained" startIcon={<DeleteIcon />}>
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
                    {times?.map((item, index) => (<StyledTableRow hover onClick={() => { handleClickRow(item) }} selected={item?.time_id === selected?.time_id} sx={{ cursor: 'pointer' }}>
                        <StyledTableCell align='center'>
                            {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.time_name}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.time_from + `h - ` + item?.time_to + 'h'}
                        </StyledTableCell>
                    </StyledTableRow>))}

                </Table>
            </TableContainer>
        </Grid>
    </Grid>
        <ModalAddTime open={openModal} rowSelect={rowEdit} typeModal={typeModal} afterSave={afterSave} onCloseModal={onCloseModal} />
    </>);
}

export default Time;