import styled from "@emotion/styled";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";
import { ShowAlert } from "utils/confirm";
import SaveIcon from '@mui/icons-material/Save';
import { ROLES } from "utils/constant";



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
const ModalProfile = ({ open, onCloseModal, afterSave, rowSelect, typeModal }) => {
    const [username, setUserName] = useState('');
    const [role, setRole] = useState(ROLES[0]);
    const [validateUserName, setValidateUserName] = useState(initialValidate);
    const [validateRole, setValidateRole] = useState(initialValidate);
    const [validatePassword, setValidatePassword] = useState(initialValidate);
    const [validateDepart, setValidateDepart] = useState(initialValidate);
    const [password, setPassword] = useState('12345');
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');


    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'username':
                if (validateUserName.err) {
                    setValidateUserName(initialValidate);
                }
                setUserName(value);
                break;
            case 'password':
                if (validatePassword.err) {
                    setValidatePassword(initialValidate);
                }
                setPassword(value);
                break;

            default:
                break;
        }
    }

    const getDepartment = async () => {
        const url = RouteApi.getDepart;
        const response = await restApi.post(url, {});
        if (response?.status === 200) {
            setDepartments(response?.data);
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
            setUserName(username);
            setRole(role);
            setDepartment(department_id);
            setPassword('');
        }
    }, [rowSelect]);

    useEffect(() => {
        if (open) {
            getDepartment();
        }
    }, [open])

    const handleSave = async () => {
        const url = typeModal === 'ADD' ? RouteApi.addUser : RouteApi.updateUser;
        //{ username, password, role, department }
        const response = await restApi.post(url, {
            role, password, department, username, id: rowSelect?.user_id
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
                textProp: 'Account already exist!',
            });
        }

    }

    const handleClickSave = () => {
        if (username.trim().length === 0 || username.trim().length > 200) {
            setValidateUserName({ err: true, message: 'Username is required' });
            return;
        }
        if (username.includes(' ')) {
            setValidateUserName({ err: true, message: 'Username cannot contain spaces' });
            return;
        }
        if (typeModal === 'ADD') {
            if (password.trim().length === 0 || password.trim().length > 200) {
                setValidatePassword({ err: true, message: 'Password is required' });
                return;
            }
        }
        if (department.length === 0) {
            setValidateDepart({ err: true, message: 'Department is required' });
            return;
        }
        handleSave();
    }

    const beforeClose = (e, reason) => {
        if (reason === 'backdropClick') {
            return;
        }
        setUserName('');
        setPassword('12345');
        setDepartment('');
        setValidateUserName(initialValidate);
        setValidatePassword(initialValidate);
        setValidateDepart(initialValidate);
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
                    Profile
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

                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <TextField
                                onChange={handleChange}
                                name="username"
                                size="small"
                                fullWidth
                                required
                                id="outlined-required"
                                label="Username"
                                value={username}
                                sx={{ marginRight: '20px' }}
                                placeholder="Please typing username..."
                                error={validateUserName.err}
                                helperText={validateUserName.message}
                            />
                            <TextField
                                onChange={handleChange}
                                name="password"
                                size="small"
                                fullWidth
                                required
                                id="outlined-required"
                                label="Password"
                                value={password}
                                placeholder="Please typing password..."
                                error={validatePassword.err}
                                helperText={validatePassword.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>

                            <FormControl sx={{ marginRight: '20px' }} error={validateDepart.err}
                                size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                    error={validateDepart.err}
                                    helperText={validateDepart.message}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={department}
                                    label="Department"
                                    onChange={(e) => { if (validateDepart.err) { setValidateDepart(initialValidate) } setDepartment(e.target.value) }}
                                >
                                    {departments?.map((item, index) =>
                                        (<MenuItem key={index} value={item.department_id}>{item.department_name}</MenuItem>))}
                                </Select>
                                <FormHelperText>{validateDepart.message}</FormHelperText>
                            </FormControl>
                            <FormControl error={validateRole.err}
                                size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    error={validateRole.err}
                                    helperText={validateRole.message}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    onChange={(e) => { if (validateRole.err) { setValidateRole(initialValidate) } setRole(e.target.value) }}
                                >
                                    {ROLES?.map((item, index) =>
                                        (<MenuItem key={index} value={item}>{item}</MenuItem>))}
                                </Select>
                                <FormHelperText>{validateRole.message}</FormHelperText>
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

export default ModalProfile;