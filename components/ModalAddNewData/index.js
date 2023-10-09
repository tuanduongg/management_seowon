import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react";
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";




const CustomModal = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        // maxWidth: '100% !important'
        overflowX: 'hidden',
        width: '280px'
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const initValidate = { err: false, msg: '' };

const ModalAddNewData = ({ open, onCloseModal, typeModal, afterSave }) => {

    const [color, setColor] = useState('');
    const [validateColor, setValidateColor] = useState(initValidate);
    const [stage, setStage] = useState('');
    const [validateStage, setValidateStage] = useState(initValidate);

    const hanldeChangeInput = (e) => {
        const { value, name } = e.target;
        switch (typeModal) {
            case 'STAGE':
                if (validateStage?.err) {
                    setValidateStage(initValidate);
                }
                setStage(value);
                break;
            case 'COLOR':
                if (validateColor?.err) {
                    setValidateColor(initValidate);
                }
                setColor(value);
                break;
            default:
                break;
        }
    }

    const handleAddNew = async () => {
        const data = {
            type: typeModal,
            data: {
                stage, color
            }
        };
        const response = await restApi.post(RouteApi.addDataMaster, data);
        if (response?.status === 200) {
            const data = response?.data?.origin;
            afterSave(data);
        }
    }

    const onSave = () => {
        switch (typeModal) {
            case 'STAGE':
                if (stage?.trim() === '') {
                    setValidateStage({ err: true, msg: 'Bắt buộc nhập công đoạn' });
                    return;
                }
                break;
            case 'COLOR':
                if (color?.trim() === '') {
                    setValidateColor({ err: true, msg: 'Bắt buộc nhập màu' });
                    return;
                }
                break;
            default:
                break;
        }
        handleAddNew();

    }



    const afterClose = (event, reason) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setColor('');
        setStage('');
        setValidateStage(initValidate);
        setValidateColor(initValidate);
        onCloseModal();
    }

    return (
        <>
            <CustomModal
                onClose={afterClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add new  {typeModal}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={afterClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ minWidth: '750px', padding: '10px', borderTop: '1px solid #d7d7d7' }}>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {typeModal === 'COLOR' && (<TextField
                        error={validateColor.err}
                        helperText={validateColor.msg}
                        sx={{ minWidth: '250px' }}
                        required
                        name="color"
                        onChange={hanldeChangeInput}
                        label="Màu sắc"
                        placeholder="Nhập màu sắc..."
                    />)}
                    {typeModal === 'STAGE' && (<TextField
                        sx={{ minWidth: '250px' }}
                        error={validateStage.err}
                        helperText={validateStage.msg}
                        required
                        name="stage"
                        onChange={hanldeChangeInput}
                        label="Công đoạn"
                        placeholder="Nhập công đoạn..."
                    />)}
                </Box>
                <DialogActions>
                    <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={afterClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" autoFocus onClick={onSave}>
                        Thêm
                    </Button>
                </DialogActions>
            </CustomModal>
        </>
    )

}

export default ModalAddNewData;