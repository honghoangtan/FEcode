import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FormUser from './Form';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { postCreateUser } from '~/services/UserService';

function ModalAddNew(props) {
    const { show, handleClose, handleUpdateTable } = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);

        if (res && res.id) {
            // Success
            setName('');
            setJob('');
            toast.success('A user is created success!');
            handleUpdateTable({ first_name: name, id: res.id });
            handleClose();
        } else {
            // error
            toast.error('An error');
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <FormUser name={name} setName={setName} job={job} setJob={setJob} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAddNew;
