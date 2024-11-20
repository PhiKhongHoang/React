import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../service/api.service';


const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadUser();
    }, [current, pageSize]); // [current] #87 5:43


    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataUser(res.data.result)
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <UserForm loadUser={loadUser} />
                <UserTable
                    loadUser={loadUser}
                    dataUser={dataUser}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default UserPage;