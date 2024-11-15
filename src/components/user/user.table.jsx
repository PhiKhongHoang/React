import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../service/api.service';
import { useState } from 'react';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([
        {
            _id: "eric",
            fullName: 25,
            Email: "hn"
        }
    ]);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

    ];


    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        // setDataUser(res.data)
    }

    loadUser();
    console.log(">>> run render")

    return (
        <Table columns={columns} dataSource={dataUser} />
    )
}

export default UserTable;