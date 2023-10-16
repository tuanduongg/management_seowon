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
import ModalAddDepartment from 'components/ModalAddDepartment';



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
        title: 'Name',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Created By',
        // with: '50px',
        align: 'center'
    },
];
const ROWPERPAGE = [5, 10, 20];




const Department = () => {
    const [openModal, setOpenModal] = useState(false);
    const [dataList, setDataList] = useState([]);
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState(null);
    const [rowEdit, setRowEdit] = useState(null);
    const [typeModal, setTypeModal] = useState('');
    const [loading, setLoading] = useState(false);


    const onCloseModal = () => {
        setSelected(null);
        setRowEdit(null);
        setOpenModal(false);
    }

    const getData = async () => {
        setLoading(true);
        const url = RouteApi.getDepart;
        const response = await restApi.post(url, {});
        if (response?.status === 200) {
            setDataList(response?.data);
            setLoading(false);
        } else {
            setLoading(false);

        }
    }


    const afterSave = () => {
        getData();
        onCloseModal();
    }


    useEffect(() => {
        getData();
    }, [])
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

    const handleClickDelete = () => {
        ShowQuestion({
            content: 'Bạn chắc chắn muốn xóa ?',
            icon: 'warning',
            onClickYes: async () => {
                const response = await restApi.post(RouteApi.deleteDepart, { id: selected?.department_id });
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
        <Typography component={'h5'} sx={{ marginLeft: '20px' }} variant='h5'>Model</Typography >

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
                    {dataList?.map((item, index) => (<StyledTableRow hover onClick={() => { handleClickRow(item) }} selected={item?.department_id === selected?.department_id} sx={{ cursor: 'pointer' }}>
                        <StyledTableCell align='center'>
                            {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.department_name}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {item?.created_by}
                        </StyledTableCell>
                    </StyledTableRow>))}

                </Table>
            </TableContainer>
        </Grid>
    </Grid>
        <ModalAddDepartment open={openModal} rowSelect={rowEdit} typeModal={typeModal} afterSave={afterSave} onCloseModal={onCloseModal} />
    </>);
}

export default Department;