import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'




const CustomModal = styled(Dialog)(({ theme }) => ({
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

const ModalAddModel = ({ open, onCloseModal }) => {

    return (
        <>
            <CustomModal
                onClose={onCloseModal}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    modal add new model
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onCloseModal}
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
                </Box>
                {/* </DialogContent> */}
                <DialogActions>
                    <Button sx={{ color: 'black', fontWeight: 'bold' }} onClick={onCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="contained" autoFocus onClick={onCloseModal}>
                        Lưu
                    </Button>
                </DialogActions>
            </CustomModal>
        </>
    )

}

export default ModalAddModel;