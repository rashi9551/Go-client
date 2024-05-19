import axios from "axios";

const createAxios=(userToken:string)=>{
    const axiosUser=axios.create({
        baseURL:"http://localhost:3001/users",
        headers:{
            "Content-Type":"application/json"
        }
    });
    console.log(userToken)
    return axiosUser
}

export default createAxios