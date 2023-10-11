import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { getCurrentWeek, checkShift, getPercentNG, isPositiveInteger } from "./modal_add_report.service";
import ModalAddModel from "components/ModalAddModel";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './modal_add_report.module.css';
import QuillEditor from "components/QuillEditor";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";
import { useSelector } from 'react-redux';
import ModalAddNewData from "components/ModalAddNewData";
import { ShowAlert } from "utils/confirm";

const CustomModal = styled(Dialog)(({ theme }) => ({
    zIndex: 100, // Set your desired z-index value
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        maxWidth: '100% !important'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SHIFT = [
    {
        id: 'A',
        name: 'DAY(Ngày)'
    },
    {
        id: 'B',
        name: 'NIGHT(Đêm)'
    }
];

const ARRYEAR = Array.from({ length: 19 }, (_, i) => new Date().getFullYear() - i);;
// for (let index = new Date().getFullYear(); index <= 2010; index--) {
//     ARRYEAR.push(index);
// }

const DAY = [];
// const TIME = [
//     {
//         id: '1',
//         time_name: 'A',
//         time_from: '8',
//         time_to: '10',

//     },
//     {
//         id: '2',
//         time_name: 'B',
//         time_from: '10',
//         time_to: '12',

//     },
//     {
//         id: '3',
//         time_name: 'C',
//         time_from: '13',
//         time_to: '15',

//     },
//     {
//         id: '4',
//         time_name: 'D',
//         time_from: '15',
//         time_to: '17',

//     },
//     {
//         id: '5',
//         time_name: 'E',
//         time_from: '17',
//         time_to: '19',

//     },
// ]

const TIMETEXT = ['A', 'B', 'C', 'D', 'E', 'F'];
const ListNG = [
    // { 'id': '1', 'name': 'Loang mực', totalNG: 160 },
    // { 'id': '2', 'name': 'Bẩn mực', totalNG: 150 },
    // { 'id': '3', 'name': 'Tràn mực', totalNG: 140 },
    // { 'id': '4', 'name': 'Vết đâm lõm', totalNG: 130 },
];
const initValidate = {
    error: false,
    msg: ''
}

const inititalNG = {
    nameNG: '',
    numNG: '',
    error: false,
    helperText: ''
}

const initOption = {
    value: 'addNew',
    label: 'Thêm mới...',
    color: 'blue'
}


const ModalAddReport = ({ open, handleClose, afterSaved, dataMaster, typeModal, rowSelected }) => {

    const { t, i18n } = useTranslation();
    const [shift, setShift] = useState(SHIFT[0].id);
    const [day, setDay] = useState(new Date().getDate());
    const [week, setWeek] = useState(getCurrentWeek());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [time, setTime] = useState('');

    const [department, setDepartment] = useState('');
    const [validateDepart, setValidateDepart] = useState(initValidate);

    const [nameImporter, setNameImporter] = useState('');
    const [validateNameImport, setValidateNameImport] = useState(initValidate);


    const [modelCode, setModelCode] = useState('');
    const [openModalAddModel, setOpenModalAddModel] = useState(false);
    const [stage, setStage] = useState('');
    const [color, setColor] = useState('');
    const [machine, setMachine] = useState('');

    const [quantity, setQuantity] = useState('');
    const [validateQuantity, setValidateQuantity] = useState(initValidate);


    const [totalOK, setTotalOK] = useState('');
    const [validateTotalOK, setVaidateTotalOK] = useState(initValidate);


    const [totalNG, setTotalNG] = useState('');
    const [validateTotalNG, setVaidateTotalNG] = useState(initValidate);

    const [percent, setPercent] = useState(0);
    const [note, setNote] = useState('');

    const [listNG, setListNG] = useState(ListNG);
    const [nameNG, setNameNG] = useState('');
    const [validateNameNG, setValidateNameNG] = useState(initValidate);
    const [numNG, setNumNG] = useState('');
    const [validateNumNG, setValidateNumNG] = useState(initValidate);

    const [scroll, setScroll] = useState('paper');
    const [openModalAddData, setOpenModalAddData] = useState(false);
    const [typeModalAddData, setTypeModalAddData] = useState('');


    const [ListTime, setListTime] = useState([]);
    const [ListStage, setListStage] = useState([]);
    const [ListColor, setListColors] = useState([]);
    const [ListDepart, setListDepart] = useState([]);
    const [ListModel, setListModel] = useState([]);

    const contentRef = useRef(null);


    const onCloseModal = (e, reason) => {
        if (reason && reason === "backdropClick") {
            return
            // return;
        }
        handleClose();

        setShift('');
        setDay('');
        setWeek('');
        setMonth('');
        setYear('');
        setTime('');
        setDepartment('');
        setValidateDepart(initValidate);
        setNameImporter('');
        setValidateNameImport(initValidate);
        setModelCode('');
        setStage('');
        setColor('');
        setMachine('');
        setQuantity('');
        setValidateQuantity(initValidate);
        setTotalOK('');
        setVaidateTotalOK('');
        setTotalNG('');
        setVaidateTotalNG(initValidate);
        setPercent('');
        setNote('');
        setListNG('');
        setNameNG('');
        setValidateNameNG(initValidate);
        setNumNG('');
        setValidateNumNG(initValidate);
    }



    // const getDataMaster = async () => {
    //     const response = await restApi.get(RouteApi.data_master);
    //     if (response?.status === 200) {
    //         const { colors, departments, models, stages, times } = response?.data;
    //         if (colors) {
    //             const dataList = colors.map(item => ({
    //                 label: item.color_name,
    //                 value: item.color_id
    //             }));
    //             setListColors(dataList);
    //         }
    //         if (departments) {
    //             setListDepart(departments);
    //         }
    //         if (models) {
    //             const dataListModel = models.map(item => ({
    //                 label: `${item.model_name}(${item?.model_code})`,
    //                 value: item.model_id,
    //                 colorId: item.colorId,
    //             }));
    //             setListModel(dataListModel);
    //         }
    //         if (stages) {
    //             const dataListStage = stages.map(item => ({
    //                 label: `${item.stage_name}`,
    //                 value: item.stage_id
    //             }));
    //             setListStage(dataListStage);
    //         }
    //         setListTime(times);

    //     }
    // }
    useEffect(() => {
        if (dataMaster) {
            const { colors, departments, models, stages, times } = dataMaster;
            if (colors) {
                const dataList = colors.map(item => ({
                    label: item.color_name,
                    value: item.color_id
                }));
                setListColors(dataList);
            }
            if (departments) {
                setListDepart(departments);
            }
            if (models) {
                const dataListModel = models.map(item => ({
                    label: `${item.model_name}(${item?.model_code})`,
                    value: item.model_id,
                    colorId: item.colorId,
                }));
                setListModel(dataListModel);
            }
            if (stages) {
                const dataListStage = stages.map(item => ({
                    label: `${item.stage_name}`,
                    value: item.stage_id
                }));
                setListStage(dataListStage);
            }
            setListTime(times);
        }
    }, [dataMaster]);

    const getModelById = (id) => {
        if (id) {

            const data = ListModel.find((item) => item?.value === id);
            return data;
        }
        return null;
    }
    const getStageById = (id) => {
        if (id) {

            const data = ListStage.find((item) => item?.value === id);
            return data;
        }
        return null;
    }

    useEffect(() => {
        if (rowSelected) {
            if (rowSelected?.work) {
                const {
                    work_id,
                    shift,
                    day,
                    month,
                    year,
                    week,
                    time_id,
                    department_id,
                    importer,
                    note,
                    id,
                    modelId,
                    workId,
                    stageId,
                    quantity,
                    qtyOK,
                    qtyNG,
                    machine
                } = rowSelected.work;
                setWeek(week);
                setDay(day);
                setMonth(month);
                setYear(year);
                setTime(time_id);
                setDepartment(department_id);
                setNameImporter(importer);
                setNote(note);
                setShift(shift);
                setQuantity(quantity);
                setTotalOK(qtyOK);
                setTotalNG(qtyNG);
                setMachine(machine);
                setModelCode(getModelById(modelId));
                setStage(getStageById(stageId));
            }

            if (rowSelected?.workNG) {
                setListNG(rowSelected?.workNG);
            }
        }
    }, [rowSelected]);

    const onCloseModalAddModel = () => {

        setOpenModalAddModel(false);
    }

    const handleChangeShift = (e) => {
        setShift(e.target.value);
    }

    const handleChangeDepartment = (e) => {
        if (validateDepart.error) {
            setValidateDepart(initValidate);
        }
        setDepartment(e.target.value);
    }
    // const handleChangeModel = (e) => {
    //     const { value } = e.target;
    //     if (value !== 'addNew') {
    //         setModelCode(value);
    //     }
    // }
    useEffect(() => {
        const percent = getPercentNG(quantity, totalNG);
        setPercent(percent);
    }, [totalNG])

    const onClickAddModel = () => {
        setOpenModalAddModel(true);
    }

    const onChangeTotalOK = (e) => {
        const { value } = e.target;
        if (validateTotalOK.error) {
            setVaidateTotalOK(initValidate);
        }
        setTotalOK(value);
    }
    const onChangeTotalNG = (e) => {
        if (validateTotalNG.error) {
            setVaidateTotalNG(initValidate);
        }
        const { value } = e.target;
        setTotalNG(value);
    }

    const calculatePercent = () => {
        if (quantity && totalNG) {

            const intQty = parseInt(quantity);
            const intTotalNG = parseInt(totalNG);
            if (intQty && intTotalNG) {
                const rs = (totalNG / quantity) * 100;
                setPercent(rs.toFixed(2));
            }
        } else {
            setPercent(0);
        }
    }
    const handleBlur = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'quantity':
                if (!quantity) {
                    setValidateQuantity({ error: true, msg: 'Tổng số lượng không được để trống' });
                    return;
                } else {
                    if (parseInt(quantity) < parseInt(totalOK)) {
                        setValidateQuantity({ error: true, msg: 'Tổng số lượng phải lớn hơn số lượng OK' });
                        return;
                    }

                    if (parseInt(quantity) < parseInt(totalNG)) {
                        setValidateQuantity({ error: true, msg: 'Tổng số lượng phải lớn hơn số luợng NG' });
                        return;
                    }

                }
                calculatePercent();
                break;

            case 'totalOK':
                if (!totalOK) {
                    setVaidateTotalOK({ error: true, msg: 'Tổng số OK không được để trống' })
                    return;
                } else {
                    if (parseInt(totalOK) < 0) {
                        setVaidateTotalOK({ error: true, msg: 'Tổng số OK phải lớn hơn hoặc bằng 0' });
                        return;
                    }

                    if (parseInt(totalOK) > parseInt(quantity)) {
                        setVaidateTotalOK({ error: true, msg: 'Tổng số OK phải nhỏ hơn Số lượng' });
                        return;
                    }

                }
                break;
            case 'totalNG':
                if (totalNG) {
                    if (totalNG < 0) {
                        setVaidateTotalNG({ error: true, msg: 'Tổng số NG phải lớn hơn hoặc bằng 0' });
                        return;
                    }
                    if (parseInt(totalNG) > parseInt(quantity)) {
                        setVaidateTotalNG({ error: true, msg: 'Tổng số NG phải nhỏ hơn Số lượng' });
                        return;
                    }

                }
                calculatePercent();
                break;
            case 'nameImporter':
                if (!nameImporter || nameImporter.length < 1) {
                    setValidateNameImport({ error: true, msg: 'Tên người nhập không được để trống' });
                    return;
                }
                break;
            case 'department':
                if (!department || department.length < 1) {
                    setValidateDepart({ error: true, msg: 'Phòng ban không được để trống' });
                    return;
                }
                break;

            default:
                break;
        }
    }
    const handleClearRowNG = (index) => {

        const data = [...listNG];
        data.splice(index, 1);
        setListNG(data);
    }

    const handleClickSave = () => {
        let check = true;
        if (!quantity) {
            setValidateQuantity({ error: true, msg: 'Tổng số lượng không được để trống' });
            check = false;
            // return;
        } else {
            if (parseInt(quantity) < parseInt(totalOK)) {
                setValidateQuantity({ error: true, msg: 'Tổng số lượng phải lớn hơn số lượng OK' });
                check = false;
                // return;
            }

            if (parseInt(quantity) < parseInt(totalNG)) {
                setValidateQuantity({ error: true, msg: 'Tổng số lượng phải lớn hơn số luợng NG' });
                check = false;
                // return;
            }

        }

        if (!totalOK) {
            setVaidateTotalOK({ error: true, msg: 'Tổng số OK không được để trống' })
            check = false;
            // return;
        } else {
            if (parseInt(totalOK) < 0) {
                setVaidateTotalOK({ error: true, msg: 'Tổng số OK phải lớn hơn hoặc bằng 0' });
                check = false;
                // return;
            }

            if (parseInt(totalOK) > parseInt(quantity)) {
                setVaidateTotalOK({ error: true, msg: 'Tổng số OK phải nhỏ hơn Số lượng' });
                check = false;
                // return;
            }

        }

        if (totalNG) {
            if (totalNG < 0) {
                setVaidateTotalNG({ error: true, msg: 'Tổng số NG phải lớn hơn hoặc bằng 0' });
                check = false;
                // return;
            }
            if (parseInt(totalNG) > parseInt(quantity)) {
                setVaidateTotalNG({ error: true, msg: 'Tổng số NG phải nhỏ hơn Số lượng' });
                check = false;
                // return;
            }

        }
        if (!nameImporter || nameImporter.length < 1) {
            setValidateNameImport({ error: true, msg: 'Tên người nhập không được để trống' });
            check = false;
            // return;
        }
        if (!department || department.length < 1) {
            setValidateDepart({ error: true, msg: 'Phòng ban không được để trống' });
            check = false;
            // return;
        }
        if (check) {
            onSaving();
        }
    }

    const onSaving = async () => {
        let url = RouteApi.addWork;
        const dataObj = {
            shift,
            time,
            week,
            day, month, year, department, nameImporter, modelCode, stage,
            color, machine, totalNG, totalOK, quantity, percent,
            note, listNG
        };
        if (typeModal === 'EDIT') {
            const {
                work_id,
                modelId,
                id
            } = rowSelected.work;
            dataObj['work_id'] = work_id;
            dataObj['modelId'] = modelId;
            dataObj['workModelID'] = id;
            url = RouteApi.updateWork;
        }
        const data = JSON.stringify(dataObj);
        const response = await restApi.post(url, { data: data });
        if (response?.status === 201) {
            return ShowAlert({
                textProp: 'Cập nhật thông tin thành công!',
                onClose: () => {
                    afterSaved();
                    handleClose();
                }
            });
        } else {
            ShowAlert({
                iconProp: 'warning',
                textProp: 'Lỗi cập nhật!',
            });
        }
    }

    const hanldeAddInputNG = () => {
        if (nameNG?.trim().length < 1) {
            setValidateNameNG({ error: true, msg: 'Bắt buộc nhập tên lỗi' });
            return;
        }
        if (numNG?.trim().length < 1) {
            setValidateNumNG({ error: true, msg: 'Bắt buộc nhập số lượng' });
            return;
        }



        setListNG([...listNG, { NG_name: nameNG, total: numNG }]);

        // { 'id': '4', 'name': 'Vết đâm lõm', totalNG: 130 },
    }
    const hanldeDeleteRowNG = (index) => {
        let arr = [...listNG];
        arr.splice(index, 1)
        setListNG(arr);
    }


    const onCloseModalAddNewData = () => {

        setOpenModalAddData(false);
    }

    const onAfterAddData = (data) => {
        switch (typeModalAddData) {
            case 'COLOR':
                const newData = { 'label': data?.color_name, 'value': data?.color_id };
                setListColors([...ListColor, newData]);
                setColor(newData);
                break;
            case 'STAGE':
                const newData2 = { 'label': data?.stage_name, 'value': data?.stage_id };
                setListStage([...ListStage, newData2]);
                setStage(newData2);
                break;
            default:
                break;
        }
        setOpenModalAddData(false);
    }
    const getColorById = (id) => {
        if (id) {

            const data = ListColor.find((item) => item?.value === id);
            return data;
        }
        return null;
    }
    useEffect(() => {
        if (modelCode) {

            setColor(getColorById(modelCode?.colorId) ?? '');
        }
    }, [modelCode])
    const onChangeModel = (event, newValue) => {
        setModelCode(newValue);
    }



    return (<>
        <CustomModal
            scroll={scroll}
            onClose={onCloseModal}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {typeModal === 'ADD' ? t('title-modal-addreport') : 'Chỉnh sửa thông tin'}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onCloseModal}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box ref={contentRef} sx={{
                minWidth: '800px', padding: '10px', borderTop: '1px solid #d7d7d7', overflowY: 'auto', overflowX: 'hidden', maxHeight: '100%', '&::-webkit-scrollbar': {
                    width: '2px',
                }, '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(52, 49, 76, 1)',
                }
            }}>
                <Typography variant="p" component={'p'} fontWeight={'bold'}>Thời gian</Typography>
                <Box sx={{ border: '1px solid #ddd', padding: '5px' }}>

                    <Grid sx={{ margin: '10px 0px' }} container>
                        <Grid item xs={2}>
                            <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Ca</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    placeholder="Nhập ca làm việc..."
                                    value={shift}
                                    label="Ca"
                                    onChange={handleChangeShift}
                                >
                                    {SHIFT.map((item) =>
                                        (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={1.5}>
                            <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Time</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    placeholder="Nhập Time làm việc..."
                                    value={time}
                                    label="Time"
                                    onChange={(e) => { setTime(e.target.value) }}
                                >
                                    {ListTime?.map((item) =>
                                        (<MenuItem key={item?.time_id} value={item?.time_id}>{item?.time_name}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={2}>
                            <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Tuần</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    placeholder="Nhập tuần..."
                                    value={week}
                                    label="Tuần"
                                    onChange={(e) => { setWeek(e.target.value) }}
                                >
                                    {[...Array(52).keys()].map((item) =>
                                        (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                <InputLabel id="demo-simple-select-standard-label">Ngày</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    placeholder="Nhập ngày..."
                                    value={day}
                                    label="Ngày"
                                    onChange={(e) => { setDay(e.target.value) }}
                                >
                                    {[...Array(31).keys()].map((item) =>
                                        (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={2}>
                            <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Tháng</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    value={month}
                                    placeholder="Nhập tháng..."
                                    label="Tháng"
                                    onChange={(e) => { setMonth(e.target.value) }}
                                >
                                    {[...Array(12).keys()].map((item) =>
                                        (<MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={2}>
                            <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Năm</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    value={year}
                                    label="Năm"
                                    placeholder="Nhập năm..."
                                    onChange={(e) => { setYear(e.target.value) }}
                                >
                                    {ARRYEAR.map((item, index) =>
                                        (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                    <Grid sx={{ margin: '10px 0px' }} container>
                        <Grid item xs={2.4}>
                            <FormControl error={validateDepart.error} sx={{ m: 1, minWidth: 120 }} variant="standard">
                                <InputLabel id="demo-controlled-open-select-label">Phòng ban</InputLabel>
                                <Select
                                    MenuProps={{
                                        sx: {
                                            "&& .Mui-selected": {
                                                backgroundColor: "#bdbdbd"
                                            }
                                        }
                                    }}
                                    onBlur={handleBlur}
                                    name="department"
                                    value={department}
                                    label="Phòng ban"
                                    placeholder="Nhập phòng ban..."
                                    onChange={handleChangeDepartment}
                                >
                                    {ListDepart.map((item, index) =>
                                        (<MenuItem key={item.department_id} value={item.department_id}>{item.department_name}</MenuItem>))}
                                </Select>
                                {validateDepart.error && (<FormHelperText>{validateDepart.msg}</FormHelperText>)}
                            </FormControl>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField onBlur={handleBlur} name="nameImporter" id="filled-basic" error={validateNameImport.error} helperText={validateNameImport.msg} value={nameImporter} onChange={(e) => {
                                if (validateNameImport.error) {
                                    setValidateNameImport(initValidate);
                                }
                                setNameImporter(e.target.value)
                            }} label="Tên người nhập" variant="filled" />
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="p" sx={{ margin: '10px 0px' }} component={'p'} fontWeight={'bold'}>Thông tin hàng hóa</Typography>
                <Box sx={{ border: '1px solid #ddd', padding: '5px' }}>

                    <Grid sx={{ margin: '0px 0px' }} spacing={1} container>
                        <Grid item xs={3}>
                            <Autocomplete

                                value={modelCode}
                                sx={{
                                    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                                    {
                                        backgroundColor: "#ddd",
                                    },
                                }}
                                onChange={onChangeModel}
                                disablePortal
                                options={ListModel}
                                renderInput={(params) => <TextField placeholder="Nhập tên model..." variant="standard" {...params} label="Model" />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                disabled
                                autoComplete='off'
                                sx={{
                                    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                                    {
                                        backgroundColor: "#ddd",
                                    },
                                }}
                                renderOption={(props, option) => {
                                    const { label, color } = option;
                                    return (
                                        <span {...props} style={{ color: color }}>
                                            {label}
                                        </span>
                                    );
                                }}
                                value={color}
                                onChange={(event, newValue) => {
                                    if (newValue?.value === 'addNew') {
                                        setTypeModalAddData('COLOR')
                                        setOpenModalAddData(true);
                                        return;
                                    }
                                    setColor(newValue);
                                }}
                                disablePortal
                                options={[...ListColor, initOption]}
                                renderInput={(params) => <TextField disabled placeholder="Nhập màu sắc..." variant="standard" {...params} label="Màu sắc" />}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                renderOption={(props, option) => {
                                    const { label, color } = option;
                                    return (
                                        <span {...props} style={{ color: color }}>
                                            {label}
                                        </span>
                                    );
                                }}
                                sx={{
                                    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                                    {
                                        backgroundColor: "#ddd",
                                    },
                                }}
                                value={stage}
                                onChange={(event, newValue) => {
                                    if (newValue?.value === 'addNew') {
                                        setTypeModalAddData('STAGE')
                                        setOpenModalAddData(true);
                                        return;
                                    }
                                    setStage(newValue);
                                }}
                                disablePortal
                                options={[...ListStage, initOption]}
                                renderInput={(params) => <TextField name="stage" placeholder="Nhập công đoạn..." variant="standard" {...params} label="Công đoạn" />}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField placeholder="Nhập thông tin máy..." label="Máy" value={machine} onChange={(e) => { setMachine(e.target.value) }} variant="standard" />
                        </Grid>
                    </Grid>
                    <Grid sx={{ margin: '10px 0px' }} spacing={1} container>
                        <Grid item xs={3}>
                            <TextField label="Số lượng" error={validateQuantity.error} helperText={validateQuantity.msg} onChange={(e) => {
                                if (validateQuantity.error) {
                                    setValidateQuantity(initValidate);
                                }
                                setQuantity(e.target.value);
                            }} type="number" value={quantity} onBlur={handleBlur} name="quantity" placeholder="Nhập tổng số lượng" variant="standard" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField error={validateTotalOK.error} helperText={validateTotalOK.msg} label="Tổng số OK" onBlur={handleBlur} name="totalOK" onChange={onChangeTotalOK} type="number" value={totalOK} placeholder="Nhập tổng số OK" variant="standard" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField error={validateTotalNG.error} helperText={validateTotalNG.msg} placeholder="Nhập tổng số NG" onBlur={handleBlur} name="totalNG" onChange={onChangeTotalNG} type="number" value={totalNG} label="Tổng số NG" variant="standard" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Tỷ lệ(%)" InputProps={{
                                readOnly: true,
                            }} value={percent} onChange={(e) => { setMachine(e.target.value); }} variant="standard" />
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="p" sx={{ margin: '20px 0px 0px 0px' }} component={'p'} fontWeight={'bold'}>Thông tin hàng NG</Typography>

                <Grid sx={{ margin: '0px 0px', width: '100%' }} spacing={1} container>
                    <Grid item xs={6.5}>
                        <TextField fullWidth value={nameNG} onChange={(e) => { setValidateNameNG(initValidate); setNameNG(e.target.value); }} helperText={validateNameNG.msg} error={validateNameNG.error} placeholder="Nhập nội dung lỗi..." label="Nội dung lỗi" variant="standard" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField type="number" fullWidth value={numNG} helperText={validateNumNG.msg} error={validateNumNG.error} onChange={(e) => { setValidateNumNG(initValidate); setNumNG(e.target.value); }} placeholder="Nhập số lượng..." label="Số lượng" variant="standard" />
                    </Grid>
                    <Grid sx={{ textAlign: 'right' }} item xs={1.5}>
                        <Button onClick={hanldeAddInputNG} sx={{ marginTop: '20px' }} variant="text" startIcon={<AddIcon />}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ padding: '3px', border: '1px solid #ddd' }}>

                    <Box >
                        <Grid sx={{ padding: '5px', width: '100%', borderBottom: '1px solid #ddd' }} spacing={1} container>
                            <Grid item xs={1}>
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    STT
                                </Typography>
                            </Grid>
                            <Grid item xs={6.5}>
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    Name
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    Total
                                </Typography>
                            </Grid>
                            <Grid item xs={1.5}>
                                <Typography sx={{ fontWeight: 'bold' }} >
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{
                            maxHeight: '170px', overflowY: 'auto', '&::-webkit-scrollbar': {
                                width: '2px',
                            }, '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(52, 49, 76, 1)',
                            }
                        }}>

                            {listNG?.length > 0 ? (
                                listNG.map((item, index) => (<Grid sx={{ margin: '10px 0px', width: '100%', borderBottom: index === listNG?.length - 1 ? '' : '1px solid #ddd' }} spacing={1} container>
                                    <Grid item xs={1}>
                                        {index + 1}
                                    </Grid>
                                    <Grid item xs={6.5}>
                                        {item?.NG_name}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {item?.total}
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <IconButton onClick={() => { handleClearRowNG(index) }} aria-label="delete" size="small">
                                            <DeleteIcon sx={{ color: 'red' }} fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>))
                            ) : (
                                <Grid sx={{ margin: '10px 0px', width: '100%', display: 'flex', justifyContent: 'center' }} spacing={1} container>
                                    <Typography sx={{ textAlign: 'center' }} >
                                        chưa có dữ lệu
                                    </Typography>
                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Typography variant="p" component={'p'} sx={{ marginTop: '20px' }} fontWeight={'bold'}>Ghi chú</Typography>
                <Grid sx={{ margin: '10px 0px', width: '100%', height: '200px' }} spacing={1} container>
                    <QuillEditor data={note} setData={setNote} />
                </Grid>
            </Box>
            {/* </DialogContent> */}
            <DialogActions>
                <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={onCloseModal}>
                    Đóng
                </Button>
                <Button variant="contained" autoFocus onClick={handleClickSave}>
                    Lưu
                </Button>
            </DialogActions>
        </CustomModal >
        <ModalAddModel open={openModalAddModel} onCloseModal={onCloseModalAddModel} />
        <ModalAddNewData open={openModalAddData} onCloseModal={onCloseModalAddNewData} afterSave={onAfterAddData} typeModal={typeModalAddData} />
    </>);
}

export default ModalAddReport;