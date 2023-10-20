import { Box, Button, Card, CardActions, CardContent, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ROLES } from "utils/constant";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import restApi from "utils/restAPI";
import { RouteApi } from "RouteApi";
import { ShowAlert } from "utils/confirm";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ConfigRouter } from "ConfigRouter";
import { useTranslation } from "react-i18next";

const initValidate = { err: false, msg: '' };

const ChangePassword = ({ dataUser, departments }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validateCurrentPassword, setValidateCurrentPassword] = useState(initValidate);
    const [validateNewPassword, setValidateNewPassword] = useState(initValidate);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState(initValidate);

    const [listRole, setListRole] = useState([...ROLES, 'ADMIN']);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    // useEffect(() => {
    //     if (dataUser) {
    //         const {
    //             username,
    //             id,
    //             role,
    //             department_id,
    //         } = dataUser;
    //         setUsername(username);
    //         setRole(role);
    //         setDepartment(department_id);
    //     }
    // }, [dataUser])

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'new_password':
                if (validateNewPassword.err) {
                    setValidateNewPassword(initValidate);
                }
                setNewPassword(value);
                break;
            case 'current_password':
                if (validateCurrentPassword.err) {
                    setValidateCurrentPassword(initValidate);
                }
                setCurrentPassword(value);
                break;
            case 'confirm_password':
                if (validateConfirmPassword.err) {
                    setValidateConfirmPassword(initValidate);
                }
                setConfirmPassword(value);
                break;

            default:
                break;
        }
    }

    const handleClickSave = () => {
        let check = false;
        if (currentPassword.trim().length < 4) {
            setValidateCurrentPassword({ err: true, msg: 'Current password must be more than 4 character' });
            check = true;
        }
        if (newPassword.trim().length < 4) {
            setValidateNewPassword({ err: true, msg: 'New password must be more than 4 character' });
            check = true;
        }
        if (confirmPassword.trim().length < 4) {
            setValidateConfirmPassword({ err: true, msg: 'Confirm password must be more than 4 character' });
            check = true;
        }
        if (confirmPassword !== newPassword) {
            setValidateConfirmPassword({ err: true, msg: 'Confirm password must be equal new password' });
            check = true;
        }
        if (!check) {
            handleSave();
        }
    }

    const handleSave = async () => {
        const response = await restApi.post(RouteApi.changePasswordUser, {
            currentPassword, newPassword, id: dataUser?.id
        });
        if (response?.status === 200) {

            ShowAlert({
                titleProp: 'notification', textProp: 'Password changed successful!', onClose: () => {
                    logout();
                    navigate(ConfigRouter.login);
                }
            });

        } else {
            setValidateCurrentPassword({ err: true, msg: 'Invalid current password!' })
        }
    }

    return (<>
        <Card sx={{ minWidth: 275, border: '1px solid #ddd', height: '100%' }}>
            <Box sx={{ width: '100%', height: '40px' }}>
                <Typography component={'h5'} sx={{ marginLeft: '20px', marginTop: '20px' }} variant="h5">
                    {t('change-pw')}
                </Typography>
            </Box>
            <CardContent>
                <Box>
                    <FormControl error={validateCurrentPassword.err} size="small" sx={{ marginBottom: '20px', width: '100%' }} variant="outlined">
                        <InputLabel >Current password</InputLabel>
                        <OutlinedInput
                            value={currentPassword}
                            required
                            name='current_password'
                            placeholder="Please typing current password..."
                            id="outlined-adornment-password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            setShowCurrentPassword(!showCurrentPassword);
                                        }}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {validateCurrentPassword.err && (<FormHelperText>{validateCurrentPassword.msg}</FormHelperText>)}
                    </FormControl>
                    <FormControl error={validateNewPassword.err} size="small" sx={{ marginBottom: '20px', width: '100%' }} variant="outlined">
                        <InputLabel >New password</InputLabel>
                        <OutlinedInput
                            value={newPassword}
                            required
                            name='new_password'
                            placeholder="Please typing new password..."
                            id="outlined-adornment-password"
                            type={showNewPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            setShowNewPassword(!showNewPassword);
                                        }}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {validateNewPassword.err && (<FormHelperText>{validateNewPassword.msg}</FormHelperText>)}
                    </FormControl>
                    <FormControl error={validateConfirmPassword.err} size="small" sx={{ marginBottom: '10px', width: '100%' }} variant="outlined">
                        <InputLabel >Confirm password</InputLabel>
                        <OutlinedInput
                            value={confirmPassword}
                            required
                            name='confirm_password'
                            placeholder="Please typing confirm password..."
                            id="outlined-adornment-password"
                            type={showConfirm ? 'text' : 'password'}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            setShowConfirm(!showConfirm);
                                        }}
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {validateConfirmPassword.err && (<FormHelperText>{validateConfirmPassword.msg}</FormHelperText>)}
                    </FormControl>
                </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button sx={{ marginRight: '10px' }} startIcon={<SaveIcon />} onClick={handleClickSave} variant="contained" size="small">Save</Button>
            </CardActions>
        </Card>
    </>)
}

export default ChangePassword;