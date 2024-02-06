import './Role.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { createRoles } from '~/Services/roleService';

function Role() {
    const dataChildDefault = {
        url: '',
        description: '',
        isValidUrl: true,
    };

    const [listChilds, setListChilds] = useState({
        child1: dataChildDefault,
    });

    const handleOnChangeInput = (name, value, key) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;

        if (value && name === 'url') {
            _listChilds[key]['isValidUrl'] = true;
        }

        setListChilds(_listChilds);
    };

    const handleAddNewInput = () => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;

        setListChilds(_listChilds);
    };

    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);

        delete _listChilds[key];
        setListChilds(_listChilds);
    };

    const buildDataToPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);

        let result = [];

        Object.entries(listChilds).map(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description,
            });
        });

        return result;
    };

    const handleSave = async () => {
        // return array
        let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });
        console.log(invalidObj);

        // if invalidObj === true thi co input bi rong~
        if (!invalidObj) {
            // call api

            let data = buildDataToPersist();

            let res = await createRoles(data);

            if (res && res.EC === 0) {
                toast.success(res.EM);
            }

            console.log('>>> CHECK DATA BUILD: ', data);
        } else {
            // error
            toast.error('Input URL must not be empty...');

            console.log('>>> invalidObj: ', invalidObj);

            let _listChilds = _.cloneDeep(listChilds);

            const key = invalidObj[0];

            _listChilds[key]['isValidUrl'] = false;

            setListChilds(_listChilds);
        }
    };

    return (
        <div className="role-container">
            <div className="container">
                <div className="row mt-3">
                    <div className="title-role">
                        <h4>Add a new role...</h4>
                    </div>
                    <div className="role-parents">
                        {Object.entries(listChilds).map(([key, child], index) => {
                            return (
                                <div className="row role-child mt-3" key={`child-${key}`}>
                                    <div className={`col-5 form-group ${key}`}>
                                        <label>URL: </label>
                                        <input
                                            className={child.isValidUrl ? 'form-control' : 'form-control is-invalid'}
                                            type="text"
                                            value={child.url}
                                            onChange={(e) => handleOnChangeInput('url', e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-5 form-group">
                                        <label>Description: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={child.description}
                                            onChange={(e) => handleOnChangeInput('description', e.target.value, key)}
                                        />
                                    </div>
                                    <div className="col-2 actions mt-4">
                                        <FontAwesomeIcon
                                            className="group-icons add"
                                            icon={faPlus}
                                            onClick={() => handleAddNewInput()}
                                        />
                                        {index >= 1 && (
                                            <FontAwesomeIcon
                                                className="group-icons delete"
                                                icon={faTrash}
                                                onClick={() => handleDeleteInput(key)}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div>
                        <button className="btn btn-warning mt-3" onClick={() => handleSave()}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
