import './User.scss';

import { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

import { toast } from 'react-toastify';

import { fetchAllUser, deleteUser } from '~/Services/userService';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleRefresh } from '~/Redux/Actions/userActions';

function Users() {
    const [listUsers, setListUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPage, setTotalPage] = useState(0);

    const [showModalDelete, setShowModalDelete] = useState(false);
    // data modal delete
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false);

    const [actionModalUser, setActionModalUser] = useState('UPDATE');

    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUers();
    }, [currentPage]);

    const fetchUers = async () => {
        let response = await fetchAllUser(+currentPage, +currentLimit);

        console.log('CHECK RESPONSE: ', response);

        if (response && response.EC === 0) {
            // setListUsers(response.DT);
            console.log(response);
            setTotalPage(response.DT.totalPages);

            console.log(response.DT.totalPages);
            setListUsers(response.DT.users);
        }
    };

    const handlePageClick = async (e) => {
        setCurrentPage(+e.selected + 1);
        await fetchUers();
    };

    const handleDelete = async (user) => {
        setShowModalDelete(true);
        setDataModal(user);
    };

    const handleClose = () => {
        setShowModalDelete(false);
        setDataModal({});
    };

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal);
        console.log('>> CHECK response: ', response);

        if (response && response.EC === 0) {
            toast.success(response.EM);

            await fetchUers();
            setShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUers();
    };

    const handleEditUser = (dataUser) => {
        setActionModalUser('UPDATE');
        setDataModalUser(dataUser);
        setIsShowModalUser(true);
    };

    const handleAddNewUSer = () => {
        setIsShowModalUser(true);
        setActionModalUser('CREATE');
    };

    const handleRefresh = async () => {
        await fetchUers();
        console.log('REFRESH');
    };

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage Users</h3>
                        </div>

                        <div className="actions my-3">
                            <button className="btn btn-success refresh" onClick={() => handleRefresh()}>
                                <FontAwesomeIcon className="group-icons" icon={faArrowsRotate} />
                                Refresh
                            </button>
                            <button className="btn btn-primary" onClick={() => handleAddNewUSer()}>
                                <FontAwesomeIcon className="group-icons" icon={faPlus} />
                                Add new user
                            </button>
                        </div>

                        <div className="custormize-table">
                            <table class="table table-dark table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers &&
                                        listUsers.length > 0 &&
                                        listUsers.map((item, index) => {
                                            return (
                                                <tr key={`users-${index}`}>
                                                    <th scope="row">{(currentPage - 1) * currentLimit + index + 1}</th>
                                                    <th>{item.id}</th>
                                                    <td>{item.username}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.sex}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <span
                                                            className="edit"
                                                            title="Edit"
                                                            onClick={() => handleEditUser(item)}
                                                        >
                                                            <FontAwesomeIcon
                                                                className="group-icons"
                                                                icon={faPenToSquare}
                                                            />
                                                        </span>
                                                        <span
                                                            className="delete"
                                                            title="Delete"
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <FontAwesomeIcon className="group-icons" icon={faTrash} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>

                        {totalPage > 0 && (
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={totalPage}
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
                        )}
                    </div>
                </div>
            </div>

            <ModalDelete
                show={showModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />

            <ModalUser
                show={isShowModalUser}
                onHide={onHideModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    );
}

export default Users;
