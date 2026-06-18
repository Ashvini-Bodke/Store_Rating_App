import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">

            <h2>Users List</h2>

            <table className="table table-bordered mt-3">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.address}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default Users;