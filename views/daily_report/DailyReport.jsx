import { Box, Button, Card, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, makeStyles, styled, tableCellClasses, useTheme } from '@mui/material';
import ModalAddReport from 'components/ModalAddReport';
import { Fragment, useEffect, useState } from 'react';
import RowCards from 'views/dashboard/shared/RowCards';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from 'components';
import { ARRYEAR, getPercentNG } from 'components/ModalAddReport/modal_add_report.service';
import restApi from 'utils/restAPI';
import { RouteApi } from 'RouteApi';
import NoData from 'components/NoData';
import Loading from 'components/MatxLoading';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ShowQuestion, ShowAlert } from 'utils/confirm';
import ClearIcon from '@mui/icons-material/Clear';
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
        title: 'Time',
        with: '100px',
        align: 'center'
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
        title: 'Department(부서)',
        align: 'left',
        with: '150px',
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

const ROWPERPAGE = [5, 10, 20];
const ALL = 'ALL';

const MenuProps = {
    sx: {
        "&& .Mui-selected": {
            backgroundColor: "#bdbdbd"
        }
    }
};

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
    const [week, setWeek] = useState(ALL);
    const [day, setDay] = useState(ALL);
    const [month, setMonth] = useState(ALL);
    const [year, setYear] = useState(ALL);
    const [model, setModel] = useState(ALL);
    const [department, setDepartment] = useState(ALL);
    const [listDepartment, setListDepartment] = useState([]);
    const [listModel, setListModel] = useState([]);
    const [total, setTotal] = useState(0);


    const handleClickAdd = () => {
        setTypeModal('ADD');
        setOpenModalAdd(true);
    }

    const handleChangePage = (e, page) => {
        setPage(page);
    }

    const getData = async (dataProp) => {

        setLoading(true);
        let data = null;
        if (dataProp) {
            data = dataProp;
        } else {
            data = {
                page,
                rowPerpage,
                week,
                day,
                month,
                year,
                model,
                department,
            }
        }
        const response = await restApi.post(RouteApi.getWorks, data);
        if (response?.status === 200) {
            const data = response?.data;
            console.log('data', data);
            setLoading(false);
            setListWork(response?.data?.data);
            setTotal(response?.data?.count);
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
            const { departments, models, stages, times } = response?.data;
            setListDepartment(departments);
            setListModel(models);
        }
    }

    useEffect(() => {
        getDataMaster();
    }, [])
    useEffect(() => {
        getData();
    }, [page, rowPerpage])

    const handleChangeRowsPerPage = (e) => {
        setPage(0);
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

    const getDetailWork = async () => {
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
    const handleClickEdit = async () => {
        setTypeModal('EDIT');
        getDetailWork();
    }

    const handleClickView = async () => {
        setTypeModal('VIEW');
        getDetailWork();
    }

    const hanldeClickFilter = () => {
        getData();
    }
    const handleClearFilter = () => {
        setWeek(ALL);
        setDay(ALL);
        setMonth(ALL);
        setYear(ALL);
        setModel(ALL);
        setDepartment(ALL);
        getData({
            page,
            rowPerpage,
            week: ALL,
            day: ALL,
            month: ALL,
            year: ALL,
            model: ALL,
            department: ALL,
        });
    }
    if (loading) return <Loading />;
    return (<>
        <Grid container spacing={3}>

            <Grid sx={{ display: 'flex', }} item lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">W(주차)</InputLabel>
                        <Select sx={{ minWidth: '100px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="W(주차)"
                            value={week}
                            onChange={(e) => { setWeek(e.target.value) }}
                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {[...Array(52).keys()].map((item) =>
                                (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">N(년)</InputLabel>
                        <Select sx={{ minWidth: '100px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="N(년)"
                            value={year}
                            onChange={(e) => { setYear(e.target.value) }}

                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {ARRYEAR.map((item, index) =>
                                (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">T(월)</InputLabel>
                        <Select sx={{ minWidth: '100px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="T(월)"
                            value={month}
                            onChange={(e) => { setMonth(e.target.value) }}

                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {[...Array(12).keys()].map((item) =>
                                (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">N(일)</InputLabel>
                        <Select sx={{ minWidth: '100px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="N(일)"
                            value={day}
                            onChange={(e) => { setDay(e.target.value) }}

                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {[...Array(31).keys()].map((item) =>
                                (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">Department(부서)</InputLabel>
                        <Select sx={{ minWidth: '150px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Department(부서)"
                            value={department}
                            onChange={(e) => { setDepartment(e.target.value) }}

                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {listDepartment?.map((item, index) => (
                                <MenuItem value={item?.department_id}>{item?.department_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">Model(모델)</InputLabel>
                        <Select sx={{ minWidth: '120px', marginRight: '5px' }}
                            MenuProps={MenuProps}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Model(모델)"
                            value={model}
                            onChange={(e) => { setModel(e.target.value) }}

                        >
                            <MenuItem value={ALL}>{ALL}</MenuItem>
                            {listModel?.map((item, index) => (
                                <MenuItem value={item?.model_id}>{item?.model_name} - {item?.model_code} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button sx={{ '& .MuiButton-endIcon ': { margin: '0px' }, marginRight: '15px' }} onClick={handleClearFilter} variant="outlined" endIcon={<ClearIcon />} aria-label="delete">

                    </Button>
                    <Button sx={{ '& .MuiButton-endIcon ': { margin: '0px' } }} variant="contained" onClick={hanldeClickFilter} endIcon={<FilterAltIcon />} aria-label="delete">

                    </Button>
                </Box>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item lg={12} md={12} sm={12} xs={12}>
                <Box sx={{ display: 'flex' }}>

                    <Button sx={{ marginRight: '5px' }} startIcon={<AddIcon />} variant="contained" onClick={handleClickAdd}>{t('btn-add-report')}</Button>
                    <Button sx={{ marginRight: '15px' }} onClick={handleClickEdit} disabled={!rowSelected} startIcon={<EditIcon />} variant="contained">{t('btn-edit-report')}</Button>
                    <Button sx={{ marginRight: '15px' }} onClick={handleClickView} disabled={!rowSelected} startIcon={<RemoveRedEyeIcon />} variant="contained">{t('btn-view-report')}</Button>
                    <Button variant="contained" onClick={handleClickDelete} disabled={!rowSelected} size='small' startIcon={<DeleteIcon />}>
                        {t('btn-delete-report')}
                    </Button>
                </Box>
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
                                    <StyledTableCell align='center'>
                                        {row.time}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row?.model_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.color}</StyledTableCell>
                                    <StyledTableCell align="left">{row?.department_name}</StyledTableCell>
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
                    count={total}
                    rowsPerPage={rowPerpage}
                    page={page} handleChangePage
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />)}
            </Grid>
        </Grid>
        {/* <ContentBox className="analytics">
        </ContentBox > */}
        <ModalAddReport typeModal={typeModal} open={openModalAdd} rowSelected={dataEdit} dataMaster={dataMaster} handleClose={handleCloseModalAdd} afterSaved={afterSaved} />
    </>);

}

export default DailyReport;