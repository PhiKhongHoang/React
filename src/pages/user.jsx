import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../service/api.service';


const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    // empty array => run once 
    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        setDataUser(res.data)
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <UserForm loadUser={loadUser} />
                <UserTable dataUser={dataUser} />
            </div>
        </div>
    )
}

export default UserPage;