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
const ModalAddDepartment = ({ open, onCloseModal, afterSave, rowSelect, typeModal }) => {
    const [name, setName] = useState('');
    const [validateName, setValidateName] = useState(initialValidate);
    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'name':
                if (validateName.err) {
                    setValidateName(initialValidate);
                }
                setName(value);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (rowSelect) {
            const {
                department_name,
            } = rowSelect
            setName(department_name);

            console.log();
        }
    }, [rowSelect])

    const handleSave = async () => {
        const url = typeModal === 'ADD' ? RouteApi.addDepart : RouteApi.updateDepart;
        const response = await restApi.post(url, {
            name, id: rowSelect?.department_id
        });
        if (response?.status === 200) {
            ShowAlert({
                iconProp: 'success',
                textProp: typeModal === 'ADD' ? 'add-success-text' : 'save-success-text',
                onClose: () => {

                    afterSave();
                }
            });
        } else {
            ShowAlert({
                iconProp: 'warning',
                textProp: 'Cannot update!',
            });
        }

    }

    const handleClickSave = () => {
        if (name.trim().length === 0 || name.trim().length > 200) {
            setValidateName({ err: true, message: 'Name is required' });
            return;
        }
        handleSave();
    }

    const beforeClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
        setName('');
        setValidateName(initialValidate);
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
                    {typeModal === 'ADD' ? '  Add new department' : 'Edit department'}
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
                            placeholder="Please typing name model..."
                            error={validateName.err}
                            helperText={validateName.message}
                        />
                    </Box>
                </Box>
                {/* </DialogContent> */}
                <DialogActions>
                    <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={beforeClose}>
                        Đóng
                    </Button>
                    <Button startIcon={<SaveIcon />} variant="contained" autoFocus onClick={handleClickSave}>
                        Lưu
                    </Button>
                </DialogActions>
            </CustomModal>
        </>
    )

}

export default ModalAddDepartment;