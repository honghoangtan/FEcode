import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import _ from 'lodash';

import { fetchGroups, createNewUser, updateCurrentUser } from '~/Services/userService';

function ModalUser(props) {
    const { show, handleClose, confirmDeleteUser, dataModalUser, onHide, action } = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    };

    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    };

    const [validInput, setValidInput] = useState(validInputsDefault);

    const [userData, setUserData] = useState(defaultUserData);

    const [userGroup, setUserGroup] = useState([]);

    useEffect(() => {
        getGroup();
    }, []);

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...userData, group: userGroup[0].id });
            }
        }
    }, [action]);

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, group: dataModalUser.Group ? dataModalUser.Group.id : '' });
        }
    }, [dataModalUser]);

    const getGroup = async () => {
        let res = await fetchGroups();

        if (res && res.EC === 0) {
            setUserGroup(res.DT);

            if (res && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        } else {
            toast.error(res.EM);
        }
    };

    const handleOnChangeInput = (value, name) => {
        setUserData(defaultUserData.email);
        let _userData = _.cloneDeep(userData);

        _userData[name] = value;
        setUserData(_userData);
    };

    const checkValiInput = () => {
        // create user
        if (action === 'UPDATE') return true;

        setValidInput(validInputsDefault);
        let arr = ['email', 'phone', 'password', 'group'];

        let check = true;

        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputsDefault);

                _validInput[arr[i]] = false;
                setValidInput(_validInput);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        return check;
    };

    const handleConfirmUser = async () => {
        // create user
        let check = checkValiInput();

        if (check === true) {
            let res =
                action === 'CREATE'
                    ? await createNewUser({ ...userData, groupId: userData['group'] })
                    : await updateCurrentUser({ ...userData, groupId: userData['group'] });

            if (res && res.EC === 0) {
                onHide();

                setUserData({ ...defaultUserData, group: userGroup && userGroup.length > 0 ? userGroup[0].id : '' });
            } else if (res && res.EC !== 0) {
                let _validInput = _.cloneDeep(validInputsDefault);

                _validInput[res.DT] = false;

                setValidInput(_validInput);

                toast.error(`Error create user ${res.EM}`);
            }
        }
    };

    const handleCloseModalUser = () => {
        onHide();
        setUserData(defaultUserData);
        setValidInput(validInputsDefault);
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={() => handleCloseModalUser()}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{action === 'CREATE' ? 'Create New User' : 'Edit A User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Email address (<span className="red">*</span>)
                            </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.email === true ? 'form-control' : 'form-control is-invalid'}
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleOnChangeInput(e.target.value, 'email')}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Phone number (<span className="red">*</span>)
                            </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.phone === true ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                value={userData.phone}
                                onChange={(e) => handleOnChangeInput(e.target.value, 'phone')}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>User name:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleOnChangeInput(e.target.value, 'username')}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            {action === 'CREATE' && (
                                <>
                                    <label>
                                        Password (<span className="red">*</span>)
                                    </label>
                                    <input
                                        className={
                                            validInput.password === true ? 'form-control' : 'form-control is-invalid'
                                        }
                                        type="password"
                                        value={userData.password}
                                        onChange={(e) => handleOnChangeInput(e.target.value, 'password')}
                                    />
                                </>
                            )}
                        </div>

                        <div className="col-12 col-sm-12 form-group">
                            <label>Address:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userData.address}
                                onChange={(e) => handleOnChangeInput(e.target.value, 'address')}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select
                                class="form-select mb-3"
                                aria-label=".form-select-lg example"
                                onChange={(e) => handleOnChangeInput(e.target.value, 'sex')}
                                value={userData.sex}
                            >
                                <option selected value="Male">
                                    Male
                                </option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Group (<span className="red">*</span>)
                            </label>
                            <select
                                className={
                                    validInput.group === true ? 'form-select mb-3' : 'form-select mb-3 is-invalid'
                                }
                                aria-label=".form-select-lg example"
                                onChange={(e) => handleOnChangeInput(e.target.value, 'group')}
                                value={userData.group}
                            >
                                {userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDeleteUser} onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalUser;
