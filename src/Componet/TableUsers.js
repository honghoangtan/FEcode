import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import ReactPaginate from 'react-paginate';
import _, { debounce } from 'lodash';

import { fetchAllUser } from '~/services/UserService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faArrowUp,
    faCirclePlus,
    faCircleXmark,
    faFileArrowDown,
    faFileImport,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import { CSVLink, CSVDownload } from 'react-csv';

import Papa from 'papaparse';

import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';

import './TableUser.scss';
import { toast } from 'react-toastify';

function TableUsers() {
    const [listUsers, setListUsers] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataUserEdit, setDataUserEdit] = useState({});

    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [keyword, setKeyword] = useState('');

    const [showloading, setShowLoading] = useState(false);

    const [dataExport, setDataExport] = useState([]);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    useEffect(() => {
        //call API
        // dry
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        setShowLoading(true);

        let respon = await fetchAllUser(page);

        if (respon && respon.data) {
            setTotalUsers(respon.total);
            setTotalPages(respon.total_pages);
            setListUsers(respon.data);
        }
        setShowLoading(false);
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleEditUserFromModal = (user) => {
        let newList = _.cloneDeep(listUsers);

        let index = listUsers.findIndex((item) => item.id === user.id);

        newList[index].first_name = user.first_name;

        setListUsers(newList);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteFromModal = (user) => {
        let newList = _.cloneDeep(listUsers);

        newList = newList.filter((item) => item.id !== user.id);

        setListUsers(newList);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        //  Trong thực tế việc sắp xếp: gọi api rồi truyền sortBy, sortField và cái page muốn lấy
        //  Sau khi lấy xong db thì gọi lại hàm setList
        let newList = _.cloneDeep(listUsers);

        newList = _.orderBy(newList, [sortField], [sortBy]);

        setListUsers(newList);
    };

    const handlerSearch = debounce((e) => {
        const searchValue = e.target.value;
        setKeyword(searchValue);
        // || searchValue.trim()

        if (searchValue) {
            if (!searchValue.startsWith(' ')) {
                let newList = _.cloneDeep(listUsers);

                newList = newList.filter((item) => item.email.includes(searchValue));

                setListUsers(newList);
            }
        } else {
            getUsers(1);
        }
    }, 500);

    useEffect(() => {
        const fetchApi = async () => {
            setShowLoading(true);
            let respon = await fetchAllUser(1);

            if (respon && respon.data) {
                setShowLoading(false);
            }
        };

        fetchApi();
    }, [keyword]);

    const getUsersExport = (event, done) => {
        let result = [];

        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name']);

            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;

                result.push(arr);
            });

            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Only accept csv file...');
                return;
            }

            Papa.parse(file, {
                // header = true thi` chuyen [[]] => [{}] (theo nhu ban dau)
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;

                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 4) {
                            if (
                                rawCSV[0][0] !== 'Id' ||
                                rawCSV[0][1] !== 'Email' ||
                                rawCSV[0][2] !== 'First name' ||
                                rawCSV[0][3] !== 'Last name'
                            ) {
                                toast.error('Wrong format CSV file!');
                            } else {
                                let result = [];

                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 4) {
                                        let obj = {};

                                        obj.id = item[0];
                                        obj.email = item[1];
                                        obj.first_name = item[2];
                                        obj.last_name = item[3];

                                        result.push(obj);
                                    }
                                });
                                setListUsers(result);
                                console.log(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file!');
                        }
                    } else {
                        toast.error('Not found data on CSV file!');
                    }
                },
            });
        }
    };

    return (
        <>
            {/* bootrap class: my-3, btn, btn-success */}
            <div className="my-3 add-new d-sm-flex">
                <span className="">
                    {' '}
                    <b>List Users:</b>
                </span>
                <div className="group-btns mt-sm-0 mt-2">
                    <label htmlFor="test" className="btn btn-warning">
                        Import
                        <FontAwesomeIcon className="group-icons" icon={faFileImport} />
                    </label>
                    <input id="test" type="file" hidden onChange={(e) => handleImportCSV(e)} />
                    <CSVLink
                        filename={'my-file.csv'}
                        className="btn btn-primary"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        Export
                        <FontAwesomeIcon className="group-icons" icon={faFileArrowDown} />
                    </CSVLink>

                    <button className="btn btn-success" onClick={handleShowModal}>
                        Add new user
                        <FontAwesomeIcon className="group-icons" icon={faCirclePlus} />
                    </button>
                </div>
            </div>

            <div className="col-12 col-sm-4 my-3 search-input">
                <input
                    className="form-control"
                    placeholder="Search user by email"
                    // value={keyword}
                    onChange={(e) => {
                        handlerSearch(e);
                    }}
                />

                {showloading && <FontAwesomeIcon className="loading" icon={faSpinner} />}
            </div>

            <div className="custormize-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span>ID</span>
                                    <span>
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faArrowDown}
                                            onClick={() => handleSort('desc', 'id')}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faArrowUp}
                                            onClick={() => handleSort('asc', 'id')}
                                        />
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="sort-header">
                                    <span>First Name</span>
                                    <span>
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faArrowDown}
                                            onClick={() => handleSort('desc', 'first_name')}
                                        />
                                        <FontAwesomeIcon
                                            className="icon"
                                            icon={faArrowUp}
                                            onClick={() => handleSort('asc', 'first_name')}
                                        />
                                    </span>
                                </div>
                            </th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-item"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <ModalAddNew show={showModal} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteFromModal={handleDeleteFromModal}
            />
        </>
    );
}

export default TableUsers;
