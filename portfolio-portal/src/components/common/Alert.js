import Swal from 'sweetalert2';

const Alert = {
    success: (title, text) => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonText: 'OK',
        });
    },
    error: (title, text) => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: 'OK',
        });
    },
    confirm: async (title, text, t) => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('confirmation.delete.confirmButtonText'),
            cancelButtonText: t('confirmation.delete.cancelButtonText'),
        });
        return result.isConfirmed;
    }
};

export default Alert;