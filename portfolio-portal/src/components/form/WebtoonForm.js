import Swal from 'sweetalert2';
import { toProperCase } from '../../utils/stringUtils';

const WebtoonForm = (handleAddWebtoon) => {
    const showAddWebtoonForm = () => {
        Swal.fire({
            title: 'Add New Webtoon',
            html: `
                <input id="swal-input-title" class="swal2-input" placeholder="Webtoon Title">
                <input id="swal-input-description" class="swal2-input" placeholder="Description">
                <input id="swal-input-alias" class="swal2-input" placeholder="Alias" readonly>
                <input id="swal-input-genre" class="swal2-input" placeholder="Genre">
                <input id="swal-input-img" class="swal2-input" placeholder="Image URL">
                <input id="swal-input-max-chapter" class="swal2-input" type="number" placeholder="Chapter Count">
                <input id="swal-input-tag" class="swal2-input" placeholder="Tag">
                <input id="swal-input-source" class="swal2-input" placeholder="Source URL">
                <input id="swal-input-suffix" class="swal2-input" placeholder="Suffix">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input-title').value;
                const maxChapter = parseInt(document.getElementById('swal-input-max-chapter').value);
                const source = document.getElementById('swal-input-source').value;
                const suffix = document.getElementById('swal-input-suffix').value;

                if (!title || !maxChapter || !source || !suffix) {
                    Swal.showValidationMessage('Please fill out all fields');
                }

                const alias = toProperCase(title);

                return { title, alias, maxChapter, source, suffix };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddWebtoon(result.value);
            }
        });
    };

    return { showAddWebtoonForm };
};

export default WebtoonForm;
