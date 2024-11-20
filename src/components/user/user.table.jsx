import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { DeleteUserAPI } from '../../service/api.service';

const UserTable = (props) => {
    const {
        dataUser, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize,
    } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                            }}
                        >
                            {record._id}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />

                    <Popconfirm
                        title="Delete user"
                        description="xóa không cu?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        const res = await DeleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "delete user",
                description: "xóa user thành công"
            })
            await loadUser()
        } else {
            notification.error({
                message: "error delete user",
                description: JSON.stringify(res.message)
            })
        }
    }


    const onChange = (pagination, filters, sorter, extra) => {
        // setCurrent, setPageSize,
        // nếu thay đổi trang current
        if (pagination && pagination.current) {
            // current: giá trị react lưu
            // pagination.current: giá trị mới
            // dùng dấu cộng (+) trước 1 tên biến thì sẽ tự động chuyển string thành int
            if (+pagination.current != +current) {
                setCurrent(+pagination.current)
            }

        }

        // nếu thay đổi tổng số phần tử : pageSize 
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) {
                setPageSize(+pagination.pageSize)
            }

        }

    };


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}

            />
        </>
    )
}

export default UserTable;