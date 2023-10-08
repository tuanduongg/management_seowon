import { Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, makeStyles, styled, tableCellClasses, useTheme } from '@mui/material';
import ModalAddReport from 'components/ModalAddReport';
import { Fragment, useState } from 'react';
import RowCards from 'views/dashboard/shared/RowCards';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from 'components';
import { getPercentNG } from 'components/ModalAddReport/modal_add_report.service';
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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: '12px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// const useStyles = makeStyles((theme) => ({
//     hoverTableRow: {
//         "&:hover": {
//             backgroundColor: "green !important",
//         },
//     },
// }));

const HEAD_TABLE = [
    {
        title: 'STT',
        with: '50px',
        align: 'center'
    },
    {
        title: 'W(주차)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'N(년)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'T(월)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'N(일)',
        // with: '50px',
        align: 'center'
    },
    {
        title: 'Shift(주/야)',
        align: 'center',
        // with: '100px',
    },
    {
        title: 'Model(모델)',
        align: 'left',
        with: '150px',
    },
    {
        title: 'Color(색상)',
        align: 'center'
    },
    {
        title: 'Stage(공정)',
        align: 'left',
        with: '150px',
    },
    {
        title: 'Quantity(생산수)',
        align: 'center'
    },
    {
        title: `OK Q'TY(양품)`,
        align: 'center'
    },
    {
        title: `NG Q'TY(불량)`,
        align: 'center'
    },
    {
        title: 'NG Rate(불량률)',
        align: 'center'
    },
];


const DailyReport = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const theme = useTheme();
    const [rowSelected, setRowSelected] = useState('');
    const { t, i18n } = useTranslation();

    const handleClickAdd = () => {
        setOpenModalAdd(true);
    }


    const handleCloseModalAdd = (event, reason) => {
        if (reason && reason == "backdropClick") {
            return
            // return;
        }

        setOpenModalAdd(false);
    }
    function createData(id, w, N, T, DAY, SHIFT, MODEL, COLOR, STAGE, QUANTITY, TOTAL_OK, TOTAL_NG, PERCENTAG_NG) {
        return { id, w, N, T, DAY, SHIFT, MODEL, COLOR, STAGE, QUANTITY, TOTAL_OK, TOTAL_NG, PERCENTAG_NG };
    }

    const handleClickRow = (row) => {
        setRowSelected(row);
    }

    const rows = [
        createData(1, 37, 2023, 9, 13, 'DAY', 'DM3', 'GREEN', 'Ngoại quan mực', 2400, 1200, 200, 4.0),
        createData(2, 37, 2023, 9, 13, 'NIGHT', 'DM3', 'GREEN', 'Ngoại quan mực', 3700, 1200, 200, 4.3),
        createData(3, 37, 2023, 9, 13, 'DAY', 'Q5 Front', 'GREEN', 'Ngoại quan mực', 2400, 1200, 200, 6.0),
        createData(4, 37, 2023, 9, 13, 'NIGHT', 'DM3', 'LAVENDER', 'Ngoại quan mực', 6700, 1200, 200, 4.3),
        createData(5, 37, 2023, 9, 13, 'V5 CRD', 'DM3', 'GREEN', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
        createData(6, 37, 2023, 9, 13, 'DAY', 'DM3', 'BLACK', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
        createData(7, 37, 2023, 9, 13, 'DAY', 'Q5 Front', 'SAND', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
        createData(8, 37, 2023, 9, 13, 'DAY', 'DM3', 'GREEN', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
        createData(9, 37, 2023, 9, 13, 'V5 CRD', 'DM3', 'BLUE', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
        createData(10, 37, 2023, 9, 13, 'DAY', 'DM3', 'GREEN', 'Ngoại quan mực', 4900, 1200, 200, 3.9),
    ];
    return (<>
        <ContentBox className="analytics">
            <Grid container spacing={3}>

                <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} item lg={12} md={12} sm={12} xs={12}>
                    <Button variant="contained" onClick={handleClickAdd}>{t('btn-add-report')}</Button>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <H4>Báo cáo hằng ngày</H4>
                    <TableContainer sx={{ backgroundColor: '#e3e3e3ed' }}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    {HEAD_TABLE.map((item, index) => (
                                        <StyledTableCell key={index} width={item?.with} align={item?.align}>{item?.title}</StyledTableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow sx={{ cursor: 'pointer' }} onClick={() => { handleClickRow(row) }} selected={row?.id === rowSelected?.id} hover key={row.name}>
                                        <StyledTableCell align='center'>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.w}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.N}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.T}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.DAY}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {row?.SHIFT}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row?.MODEL}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.COLOR}</StyledTableCell>
                                        <StyledTableCell align="left">{row?.STAGE}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.QUANTITY}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.TOTAL_OK}</StyledTableCell>
                                        <StyledTableCell align="center">{row?.TOTAL_NG}</StyledTableCell>
                                        <StyledTableCell align="center">{getPercentNG(row?.QUANTITY, row?.TOTAL_NG)}%</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={5}
                    // page={page}
                    // onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </ContentBox >
        <ConfirmationDialog open={false} text={'confirm text'} onYesClick={() => { console.log('onclickyes') }} />
        <ModalAddReport open={openModalAdd} onCloseModal={handleCloseModalAdd} />
    </>);

}

export default DailyReport;