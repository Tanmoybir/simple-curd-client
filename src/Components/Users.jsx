import { useState } from "react";
import { useLoaderData } from "react-router-dom";



const Users = () => {
    const loadedUsers = useLoaderData()
    const [users,setUsers] = useState(loadedUsers)
    

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/users/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                alert('DELETE From Database Successfully')
                const remaining = users.filter(user => user._id !== id)
                setUsers(remaining)
            }
        })
    }

    return (
        <div>
            <h1>All user : {users.length}</h1>
            <div className="">
                {
                    users.map(user => <p key={user._id}>
                        {user.name} : {user.email} : {user._id} 
                        <button onClick={() => handleDelete(user._id)}>x</button>
                        </p>)
                }
            </div>
        </div>
    );
};

export default Users;