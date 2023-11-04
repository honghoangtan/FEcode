import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { deleteUser } from '~/services/UserService';

function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteFromModal } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);

        if (res && +res.statusCode === 204) {
            toast.success('Delete user success');

            handleDeleteFromModal(dataUserDelete);
            handleClose();
        } else {
            toast.error('Error delete user');
            handleClose();
        }

        console.log('check => ', res);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        This action can't be undone! Do want to delete this user,
                        <br /> <b>email = {dataUserDelete.email}</b>?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalConfirm;
