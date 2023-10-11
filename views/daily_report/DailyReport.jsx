import { Box, Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, makeStyles, styled, tableCellClasses, useTheme } from '@mui/material';
import ModalAddReport from 'components/ModalAddReport';
import { Fragment, useEffect, useState } from 'react';
import RowCards from 'views/dashboard/shared/RowCards';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from 'components';
import { getPercentNG } from 'components/ModalAddReport/modal_add_report.service';
import restApi from 'utils/restAPI';
import { RouteApi } from 'RouteApi';
import NoData from 'components/NoData';
import Loading from 'components/MatxLoading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import { ShowQuestion, ShowAlert } from 'utils/confirm';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// the hook


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));


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

// const useStyles = makeStyles((theme) => ({
//     hoverTableRow: {
//         "&:hover": {
//             backgroundColor: "green !important",
//         },
//     },
// }));

const HEAD_TABLE = [
    {
        title: 'STT',
        with: '50px',
        align: 'center'
    },
    {
        title: 'W(주차)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'N(년)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'T(월)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'N(일)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Shift(주/야)',
        align: 'center',
        // with: '100px',
    },
    {
        title: 'Model(모델)',
        align: 'left',
        with: '150px',
    },
    {
        title: 'Color(색상)',
        align: 'center'
    },
    {
        title: 'Stage(공정)',
        align: 'left',
        with: '150px',
    },
    {
        title: 'Quantity(생산수)',
        align: 'center'
    },
    {
        title: `OK Q'TY(양품)`,
        align: 'center'
    },
    {
        title: `NG Q'TY(불량)`,
        align: 'center'
    },
    {
        title: 'NG Rate(불량률)',
        align: 'center'
    },
];

const getNameShift = (shift) => {
    let str = shift.trim().toLowerCase();
    switch (str) {
        case 'a':

            return 'Day';
        case 'b':

            return 'Night';

        default:
            return '';
    }
}

const ROWPERPAGE = [5, 10, 20]

const DailyReport = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const theme = useTheme();
    const [rowSelected, setRowSelected] = useState('');
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowPerpage, setRowPerpage] = useState(ROWPERPAGE[0]);
    const [listWork, setListWork] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataMaster, setDataMaster] = useState({});
    const [typeModal, setTypeModal] = useState('');
    const [dataEdit, setDataEdit] = useState(null);

    const handleClickAdd = () => {
        setTypeModal('ADD');
        setOpenModalAdd(true);
    }

    const handleChangePage = (e, page) => {
        setPage(page);
    }

    const getData = async () => {
        setLoading(true);
        const data = {
            page,
            rowPerpage
        }
        const response = await restApi.post(RouteApi.getWorks, data);
        if (response?.status === 200) {
            const data = response?.data;
            setLoading(false);
            setListWork(data);
        } else {

            setLoading(false);
        }
    }

    const afterSaved = () => {

        setRowSelected('');
        getData();
    }

    const getDataMaster = async () => {
        const response = await restApi.get(RouteApi.data_master);
        if (response?.status === 200) {
            setDataMaster(response?.data);
        }
    }

    useEffect(() => {
        getDataMaster();
    }, [])
    useEffect(() => {
        getData();
    }, [page, rowPerpage])

    const handleChangeRowsPerPage = (e) => {
        setRowPerpage(e.target.value);
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
        setDataEdit(null);
    }

    const handleClickRow = (row) => {
        setRowSelected(row);
    }
    const handleClickDelete = () => {
        if (rowSelected) {
            ShowQuestion({
                content: 'Bạn chắc chắn muốn xóa ?',
                icon: 'warning',
                onClickYes: async () => {
                    const response = await restApi.post(RouteApi.deleteWork, { id: rowSelected?.work_id });
                    if (response?.status === 200) {
                        ShowAlert({
                            textProp: 'Xóa thành công!',
                            onClose: getData
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
    }

    const handleClickEdit = async () => {
        setTypeModal('EDIT');
        const data = { workId: rowSelected?.work_id, modelId: rowSelected?.model_id }
        const res = await restApi.post(RouteApi.detailWork, data);
        // console.log(res);
        if (res?.status === 200) {
            setDataEdit(res?.data);
            setOpenModalAdd(true);

        } else {
            ShowAlert({
                iconProp: 'warning',
                textProp: 'Cannot edit!',
            });
        }
    }
    if (loading) return <Loading />;
    return (<>
        <ContentBox className="analytics">
            <Grid container spacing={3}>

                <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item lg={12} md={12} sm={12} xs={12}>
                    <Button sx={{ marginRight: '5px' }} startIcon={<AddIcon />} variant="contained" onClick={handleClickAdd}>{t('btn-add-report')}</Button>
                    <Button sx={{ marginRight: '15px' }} onClick={handleClickEdit} disabled={!rowSelected} startIcon={<EditIcon />} variant="contained">{t('btn-edit-report')}</Button>
                    <Button sx={{ marginRight: '15px' }} onClick={handleClickEdit} disabled={!rowSelected} startIcon={<RemoveRedEyeIcon />} variant="contained">{t('btn-view-report')}</Button>
                    <Button variant="contained" onClick={handleClickDelete} disabled={!rowSelected} size='small' startIcon={<DeleteIcon />}>
                        {t('btn-delete-report')}
                    </Button>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <H4>Báo cáo hằng ngày</H4>
                    <TableContainer sx={{ backgroundColor: '#e3e3e3ed' }}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {HEAD_TABLE.map((item, index) => (
                                        <StyledTableCell key={index} width={item?.with} align={item?.align}>{item?.title}</StyledTableCell>))}
                                </TableRow>
                            </TableHead>
                            {listWork?.length > 0 ? (<TableBody>

                                {listWork.map((row, index) => (
                                    <StyledTableRow sx={{ cursor: 'pointer' }} onClick={() => { handleClickRow(row) }} selected={row?.work_id === rowSelected?.work_id} hover key={row.work_id}>
                                        <StyledTableCell align='center'>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.week}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.year}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.month}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.day}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {getNameShift(row?.shift)}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row?.model_name}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.color_name}</StyledTableCell>
                                        <StyledTableCell align="left">{row?.stage_name}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.qtyOK}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.qtyNG}</StyledTableCell>
                                        <StyledTableCell align="center">{getPercentNG(row?.quantity, row?.qtyNG)}%</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>) : (<NoData />)}

                        </Table>
                    </TableContainer>
                    {listWork?.length > 0 && (<TablePagination
                        rowsPerPageOptions={ROWPERPAGE}
                        component="div"
                        count={listWork.length}
                        rowsPerPage={rowPerpage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />)}
                </Grid>
            </Grid>
        </ContentBox >
        <ModalAddReport typeModal={typeModal} open={openModalAdd} rowSelected={dataEdit} dataMaster={dataMaster} handleClose={handleCloseModalAdd} afterSaved={afterSaved} />
    </>);

}

export default DailyReport;