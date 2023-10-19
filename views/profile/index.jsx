import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CardProfile from "./card_profile";
import { RouteApi } from "RouteApi";
import restApi from "utils/restAPI";
import ChangePassword from "./change_password";



const TABS = [
    { label: 'Profile', id: 'profile', icon: <AccountCircleIcon /> },
    { label: 'Change password', id: 'changepassword', icon: <LockIcon /> },
]
const Profile = () => {
    const [valueTab, setValueTab] = useState('profile');
    const [dataUser, setDataUser] = useState(null);
    const [departments, setDepartments] = useState([]);


    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    }

    const getProfile = async () => {

        const response = await restApi.get(RouteApi.profile);
        console.log(response);
        if (response?.status === 200) {
            const user = response.data;
            setDataUser(user);
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
        getProfile();
        getDepartment();
    }, [])
    return (<>
        {/* <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={valueTab} onChange={handleChangeTab}>
                {TABS?.map((item, index) => (
                    <Tab icon={item.icon} iconPosition="start" sx={{ textTransform: 'none' }} label={item.label} value={item.id} />))}
            </Tabs>
            <Box sx={{ width: '70%' }}>
                {valueTab === 'profile' && <CardProfile dataUser={dataUser} departments={departments} />}
                {valueTab === 'changepassword' && <ChangePassword dataUser={dataUser} departments={departments} />}
            </Box>
        </Box> */}
        <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex' }}>
            <Grid spacing={3} container>
                <Grid item xs={6}>
                    <CardProfile dataUser={dataUser} departments={departments} />
                </Grid>
                <Grid item xs={6}>
                    <ChangePassword dataUser={dataUser} departments={departments} />
                </Grid>
            </Grid>
        </Box>
    </>);


}


export default Profile;