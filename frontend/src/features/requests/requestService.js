import axios from "axios"
const base_url = "http://localhost:3001/api/requests"

export const addRequest = async(to_id,token) => {
    console.log(to_id)
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        },
    };
    const response = await axios.post(`${base_url}/add-friend-request/${to_id}`,{},config)
    return response.data;
};