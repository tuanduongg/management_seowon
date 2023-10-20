import Swal from "sweetalert2";
import { t } from "i18next";



const width = '300px';
export const ShowQuestion = ({ titleProp = 'notification', content = '', icon = 'info', showCancelButton = true, onClickYes = () => { }, onClickNo = () => { } }) => {
    return Swal.fire({
        title: t(titleProp),
        text: t(content),
        icon: icon,
        showCancelButton: showCancelButton,
        cancelButtonText: 'No',
        confirmButtonText: "Yes",
        allowOutsideClick: false,
        width: width,
        heightAuto: false,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            onClickYes();
        } else {
            onClickNo();
        }
    })
}

export const ShowAlert = ({ iconProp = 'success', titleProp = 'notification', textProp, confirmButtonText = 'close', onClose = () => { } }) => {
    return Swal.fire(
        {
            title: t(titleProp),
            text: t(textProp),
            icon: iconProp,
            allowOutsideClick: false,
            width: width,
            confirmButtonText: confirmButtonText
        }
    ).then((result) => {
        if (result.isConfirmed) {
            onClose();
        }
    })
}