import { Button, Card, Grid, styled, useTheme } from '@mui/material';
import ModalAddReport from 'components/ModalAddReport';
import { Fragment, useState } from 'react';
import RowCards from 'views/dashboard/shared/RowCards';
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));


const DailyReport = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    const handleClickAdd = () => {
        setOpenModalAdd(true);
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    }

    return (<>
        <ContentBox className="analytics">
            <Grid container spacing={3}>

                <Grid item lg={12} md={12} sm={12} xs={12}>

                    <Button variant="contained" onClick={handleClickAdd}>Thêm báo cáo</Button>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>

                    <H4>Báo cáo hằng ngày</H4>
                    <RowCards />
                </Grid>
            </Grid>
        </ContentBox>
        <ModalAddReport open={openModalAdd} onCloseModal={handleCloseModalAdd} />
    </>);

}

export default DailyReport;