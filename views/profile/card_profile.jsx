import { Box, Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ROLES } from "utils/constant";

const CardProfile = ({ dataUser, departments }) => {

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [listRole, setListRole] = useState([...ROLES, 'ADMIN']);
    const { t, i18n } = useTranslation();


    useEffect(() => {
        if (dataUser) {
            const {
                username,
                id,
                role,
                department_id,
            } = dataUser;
            setUsername(username);
            setRole(role);
            setDepartment(department_id);
        }
    }, [dataUser])

    const handleChange = (e) => {
        const { value, name } = e.target;
    }

    return (<>
        <Card sx={{ minWidth: 275, border: '1px solid #ddd', height: '100%' }}>
            <Box sx={{ width: '100%', height: '40px' }}>
                <Typography component={'h5'} sx={{ marginLeft: '20px', marginTop: '20px' }} variant="h5">
                    {t('per-info')}
                </Typography>
            </Box>
            <CardContent>
                <Box>
                    <TextField
                        size="small"
                        fullWidth
                        required
                        id="outlined-required"
                        label="Username"
                        value={username}
                    />

                    <Box sx={{ display: 'flex', marginTop: '20px' }}>

                        <FormControl size="small" fullWidth sx={{ marginRight: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                inputProps={{
                                    readOnly: true
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={handleChange}
                            >
                                {listRole?.map((item, index) => (
                                    <MenuItem value={item}>{item}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Department</InputLabel>
                            <Select
                                inputProps={{
                                    readOnly: true
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={department}
                                label="Department"
                                onChange={handleChange}
                            >
                                {departments?.map((item, index) =>
                                    (<MenuItem key={index} value={item.department_id}>{item.department_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </CardContent>
            {/* <CardActions>
                <Button variant="contained" size="small">Save</Button>
            </CardActions> */}
        </Card>
    </>)
}

export default CardProfile;