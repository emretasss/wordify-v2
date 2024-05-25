import AdminLine from "./AdminLine";
import axios from "axios";
import { useEffect, useState } from "react";
import './admin.css';
const baseURL = "https://server-three-taupe.vercel.app/api/items";


const Admin = () => {
    const [users,setUsers] = useState([]);
    const getUsers = async () =>{
        try{
            const response = await axios.get(`${baseURL}/getUser`);
            setUsers(response.data);

        }catch(error){
            console.log(error);
        } 
    }
    useEffect(() => {
        getUsers();  
    }, [users]);
    useEffect(() => {
        console.log('users',users);  
    }, [users]);
    const elements = users.map((data, index) => (
        <AdminLine
          key={index}
          username={data.username}
          password={data.password}
          role={data.role}
          id={data._id}
        />
      ));
    console.log(elements);
    return (
        <div className="center">
            <h1>This is the admin Dashboard</h1>
            {elements}
        </div>
    )
}
export default Admin;