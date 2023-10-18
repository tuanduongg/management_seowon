import styled from "@emotion/styled";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";
import { ShowAlert } from "utils/confirm";
import SaveIcon from '@mui/icons-material/Save';



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
const ModalAccount = ({ open, onCloseModal, colors, afterSave, rowSelect, typeModal }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [color, setColor] = useState('');
    const [validateName, setValidateName] = useState(initialValidate);
    const [validateCode, setValidateCode] = useState(initialValidate);
    const [validateColor, setValidateColor] = useState(initialValidate);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'name':
                if (validateName.err) {
                    setValidateName(initialValidate);
                }
                setName(value);
                break;
            case 'code':
                if (validateCode.err) {
                    setValidateCode(initialValidate);
                }
                setCode(value);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (rowSelect) {
            const {
                user_id,
                department_id,
                username,
                role,
            } = rowSelect
            // setCode(model_code);
            // setColor(color);
            setName(username);

            console.log(rowSelect);
        }
    }, [rowSelect])

    const handleSave = async () => {
        const url = typeModal === 'ADD' ? RouteApi.addModel : RouteApi.updateModel;
        const response = await restApi.post(url, {
            color, code, name, id: rowSelect?.model_id
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
                textProp: 'Code model đã tồn tại!',
            });
        }

    }

    const handleClickSave = () => {
        if (name.trim().length === 0 || name.trim().length > 200) {
            setValidateName({ err: true, message: 'Name model is required' });
            return;
        }
        if (code.trim().length === 0 || code.trim().length > 200) {
            setValidateCode({ err: true, message: 'Code model is required' });
            return;
        }
        if (color.trim().length === 0) {
            setValidateColor({ err: true, message: 'Color is required' });
            return;
        }
        handleSave();
    }

    const beforeClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
        setName('');
        setCode('');
        setColor('');
        setValidateName(initialValidate);
        setValidateCode(initialValidate);
        setValidateColor(initialValidate);
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
                    {typeModal === 'ADD' ? '  Add new account' : 'Edit account'}
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
                            label="Username"
                            value={name}
                            sx={{ marginRight: '20px' }}
                            placeholder="Please typing name model..."
                            error={validateName.err}
                            helperText={validateName.message}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>

                            <TextField
                                sx={{ marginRight: '10px' }}
                                value={code}
                                onChange={handleChange}
                                name="code"
                                size="small"
                                fullWidth
                                required
                                id="outlined-required"
                                label="Code"
                                placeholder="Please typing code model..."
                                error={validateCode.err}
                                helperText={validateCode.message}
                            />
                            <FormControl error={validateColor.err}
                                size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                                <Select
                                    error={validateColor.err}
                                    helperText={validateColor.message}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={color}
                                    label="Color"
                                    onChange={(e) => { if (validateColor.err) { setValidateColor(initialValidate) } setColor(e.target.value) }}
                                >
                                    {colors?.map((item, index) =>
                                        (<MenuItem key={index} value={item.color_name}>{item.color_name}</MenuItem>))}
                                </Select>
                                <FormHelperText>{validateColor.message}</FormHelperText>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                {/* </DialogContent> */}
                <DialogActions>
                    <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={beforeClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" startIcon={<SaveIcon />} autoFocus onClick={handleClickSave}>
                        Lưu
                    </Button>
                </DialogActions>
            </CustomModal>
        </>
    )

}

export default ModalAccount;