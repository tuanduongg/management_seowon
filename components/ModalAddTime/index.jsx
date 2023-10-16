import styled from "@emotion/styled";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";
import { ShowAlert } from "utils/confirm";




const CustomModal = styled(Dialog)(({ theme }) => ({
    zIndex: 100,
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
const initialValidate = { err: false, message: '' };
const ModalAddTime = ({ open, onCloseModal, afterSave, rowSelect, typeModal }) => {
    const [name, setName] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [validateName, setValidateName] = useState(initialValidate);
    const [validateFrom, setValidateFrom] = useState(initialValidate);
    const [validateTo, setValidateTo] = useState(initialValidate);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'name':
                if (validateName.err) {
                    setValidateName(initialValidate);
                }
                setName(value);
                break;
            case 'from':
                if (validateFrom.err) {
                    setValidateFrom(initialValidate);
                }
                setFrom(value);
                break;
            case 'to':
                if (validateTo.err) {
                    setValidateTo(initialValidate);
                }
                setTo(value);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (rowSelect) {
            const {
                time_from,
                time_name,
                time_to,
            } = rowSelect
            setTo(time_to);
            setFrom(time_from);
            setName(time_name);
        }
    }, [rowSelect])

    const handleSave = async () => {
        const url = typeModal === 'ADD' ? RouteApi.addTime : RouteApi.updateTime;
        const response = await restApi.post(url, {
            from, to, name, id: rowSelect?.time_id
        });
        if (response?.status === 200) {
            ShowAlert({
                iconProp: 'success',
                textProp: typeModal === 'ADD' ? 'Thêm mới thông tin thành công !' : 'Lưu thông tin thành công!',
                onClose: () => {
                    afterSave();
                }
            });
        } else {
            ShowAlert({
                iconProp: 'warning',
                textProp: 'Cannot update time!',
            });
        }

    }

    const handleClickSave = () => {
        if (name.trim().length === 0 || name.trim().length > 200) {
            setValidateName({ err: true, message: 'Name is required' });
            return;
        }
        if (from.trim().length === 0 || from.trim().length > 200) {
            setValidateFrom({ err: true, message: 'From is required' });
            return;
        }
        if (to.trim().length === 0) {
            setValidateTo({ err: true, message: 'To is required' });
            return;
        }
        handleSave();
    }

    const beforeClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
        setName('');
        setFrom('');
        setTo('');
        setValidateName(initialValidate);
        setValidateFrom(initialValidate);
        setValidateTo(initialValidate);
        onCloseModal();
    }
    return (
        <>
            <CustomModal
                onClose={beforeClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {typeModal === 'ADD' ? '  Add new time' : 'Edit time'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={beforeClose}
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
                    <Box sx={{ margin: 'auto', maxWidth: '90%' }}>

                        <TextField
                            onChange={handleChange}
                            name="name"
                            size="small"
                            fullWidth
                            required
                            id="outlined-required"
                            label="Name"
                            value={name}
                            sx={{ marginRight: '20px' }}
                            placeholder="Please typing name ..."
                            error={validateName.err}
                            helperText={validateName.message}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>

                            <TextField
                                type="number"
                                sx={{ marginRight: '10px' }}
                                value={from}
                                onChange={handleChange}
                                name="from"
                                size="small"
                                fullWidth
                                required
                                id="outlined-required"
                                label="From"
                                placeholder="Please typing from..."
                                error={validateFrom.err}
                                helperText={validateFrom.message}
                            />
                            <TextField
                                type="number"
                                value={to}
                                onChange={handleChange}
                                name="to"
                                size="small"
                                fullWidth
                                required
                                id="outlined-required"
                                label="To"
                                placeholder="Please typing to..."
                                error={validateTo.err}
                                helperText={validateTo.message}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* </DialogContent> */}
                <DialogActions>
                    <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={beforeClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" autoFocus onClick={handleClickSave}>
                        Lưu
                    </Button>
                </DialogActions>
            </CustomModal>
        </>
    )

}

export default ModalAddTime;