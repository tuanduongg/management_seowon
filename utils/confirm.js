import Swal from "sweetalert2"
const width = '300px';
export const ShowQuestion = ({ titleProp = 'Thông báo', content = '', icon = 'info', showCancelButton = true, onClickYes = () => { }, onClickNo = () => { } }) => {
    return Swal.fire({
        title: titleProp,
        text: content,
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

export const ShowAlert = ({ iconProp = 'success', titleProp = 'Thông báo', textProp, confirmButtonText = 'Đóng', onClose = () => { } }) => {
    return Swal.fire(
        {
            title: titleProp,
            text: textProp,
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