import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getCurrentWeek, checkShift, getPercentNG, isPositiveInteger } from "./modal_add_report.service";
import ModalAddModel from "components/ModalAddModel";


const CustomModal = styled(Dialog)(({ theme }) => ({
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
        id: 'a',
        name: 'A(Ngày)'
    },
    {
        id: 'b',
        name: 'B(Đêm)'
    }
];

const DAY = [];
const DEPARTMENT = [
    {
        department_id: '1',
        department_name: 'Converting'
    },
    {
        department_id: '2',
        department_name: 'Rubber'
    },
    {
        department_id: '3',
        department_name: 'Assy'
    },
];
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

const MODEL = [
    { 'model_code': '1', 'label': 'AAA' },
    { 'model_code': '2', 'label': 'BBB' },
    { 'model_code': '3', 'label': 'CCC' },
];

const STAGES = [
    { 'stage_id': '1', 'label': 'Ngoại quan mực' },
    { 'stage_id': '2', 'label': 'Edge coat TOP' },
    { 'stage_id': '3', 'label': 'Packing' },
    { 'stage_id': '4', 'label': 'Hot Press' },
];
const COLORS = [
    { 'color_code': '1', 'label': 'Green' },
    { 'color_code': '2', 'label': 'Black' },
    { 'color_code': '3', 'label': 'Lavender' },
    { 'color_code': '4', 'label': 'Beige' },
];
const initValidate = {
    error: false,
    msg: ''
}


const ModalAddReport = ({ open, onCloseModal }) => {

    const { t, i18n } = useTranslation();
    const [shift, setShift] = useState(SHIFT[0].id);
    const [day, setDay] = useState(new Date().getDate());
    const [week, setWeek] = useState(getCurrentWeek());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [time, setTime] = useState(TIMETEXT[0]);

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
                    setValidateQuantity({ error: true, msg: 'Tổng số lượng không được để trống' })
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

    return (<>
        <CustomModal
            onClose={onCloseModal}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {t('title-modal-addreport')}
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
            <Box sx={{ minWidth: '800px', padding: '10px', borderTop: '1px solid #d7d7d7' }}>
                <Typography variant="p" component={'p'} fontWeight={'bold'}>Thời gian</Typography>
                <Grid sx={{ margin: '10px 0px' }} container>
                    <Grid item xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard">
                            <InputLabel id="demo-controlled-open-select-label">Ca</InputLabel>
                            <Select
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
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel id="demo-controlled-open-select-label">Time</InputLabel>
                            <Select
                                placeholder="Nhập Time làm việc..."
                                value={time}
                                label="Time"
                                onChange={(e) => { setTime(e.target.value) }}
                            >
                                {TIMETEXT.map((item) =>
                                    (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 100 }} variant="standard">
                            <InputLabel id="demo-controlled-open-select-label">Tuần</InputLabel>
                            <Select
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
                                value={year}
                                label="Năm"
                                placeholder="Nhập năm..."
                                onChange={(e) => { setYear(e.target.value) }}
                            >
                                {[...Array(new Date().getFullYear() - 2004).keys()].map((item, index) =>
                                    (<MenuItem key={2005 + index} value={2005 + index}>{2005 + index}</MenuItem>))}
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>
                <Grid sx={{ margin: '10px 0px' }} container>
                    <Grid item xs={2.4}>
                        <FormControl error={validateDepart.error} sx={{ m: 1, minWidth: 120 }} variant="standard">
                            <InputLabel id="demo-controlled-open-select-label">Phòng ban</InputLabel>
                            <Select
                                onBlur={handleBlur}
                                name="department"
                                value={department}
                                label="Phòng ban"
                                placeholder="Nhập phòng ban..."
                                onChange={handleChangeDepartment}
                            >
                                {DEPARTMENT.map((item, index) =>
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

                <Typography variant="p" component={'p'} fontWeight={'bold'}>Thông tin hàng hóa</Typography>
                <Grid sx={{ margin: '10px 0px' }} spacing={1} container>
                    <Grid item xs={3}>
                        <Autocomplete

                            value={modelCode}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                setModelCode(newValue);
                            }}
                            disablePortal
                            options={MODEL}
                            renderInput={(params) => <TextField placeholder="Nhập tên model..." variant="standard" {...params} label="Model" />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            value={stage}
                            onChange={(event, newValue) => {
                                setStage(newValue);
                            }}
                            disablePortal
                            options={STAGES}
                            renderInput={(params) => <TextField placeholder="Nhập công đoạn..." variant="standard" {...params} label="Công đoạn" />}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete

                            value={color}
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                setColor(newValue);
                            }}
                            disablePortal
                            options={COLORS}
                            renderInput={(params) => <TextField placeholder="Nhập màu sắc..." variant="standard" {...params} label="Màu sắc" />}
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
                        }} value={percent} onChange={(e) => { setMachine(e.target.value) }} variant="standard" />
                    </Grid>
                </Grid>
                <Typography variant="p" component={'p'} fontWeight={'bold'}>Thông tin hàng NG</Typography>
                <Grid sx={{ margin: '10px 0px', width: '100%' }} spacing={1} container>
                    <Grid item xs={6}>
                        <TextField fullWidth placeholder="Nhập nội dung lỗi..." label="Nội dung lỗi" variant="standard" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth placeholder="Nhập số lượng..." label="Số lượng" variant="standard" />
                    </Grid>
                </Grid>
                <Typography variant="p" component={'p'} fontWeight={'bold'}>Ghi chú</Typography>
                <Grid sx={{ margin: '10px 0px', width: '100%' }} spacing={1} container>
                    <TextField
                        value={note}
                        onChange={(e) => { setNote(e.target.value) }}
                        fullWidth
                        placeholder="Nhập ghi chú..."
                        label="Ghi chú"
                        multiline
                        rows={8}
                    />
                </Grid>
            </Box>
            {/* </DialogContent> */}
            <DialogActions>
                <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={onCloseModal}>
                    Đóng
                </Button>
                <Button variant="contained" autoFocus onClick={onCloseModal}>
                    Lưu
                </Button>
            </DialogActions>
        </CustomModal>
        <ModalAddModel open={openModalAddModel} onCloseModal={onCloseModalAddModel} />
    </>);
}

export default ModalAddReport;