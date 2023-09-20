import { Button, Card, Grid, styled, useTheme } from '@mui/material';
import ModalAddReport from 'components/ModalAddReport';
import { Fragment, useState } from 'react';
import RowCards from 'views/dashboard/shared/RowCards';
import { useTranslation } from 'react-i18next';
// the hook


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
    const { t, i18n } = useTranslation();

    const handleClickAdd = () => {
        setOpenModalAdd(true);
    }

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    }

    return (<>
        <ContentBox className="analytics">
            <Grid container spacing={3}>

                <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item lg={12} md={12} sm={12} xs={12}>
                    <Button variant="contained" onClick={handleClickAdd}>{t('btn-add-report')}</Button>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <h1>{t('password')}</h1>
                    <H4>Báo cáo hằng ngày</H4>
                    <RowCards />
                </Grid>
            </Grid>
        </ContentBox>
        <ModalAddReport open={openModalAdd} onCloseModal={handleCloseModalAdd} />
    </>);

}

export default DailyReport;