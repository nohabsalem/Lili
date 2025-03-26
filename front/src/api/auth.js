import instance from "./config";
import axios from "axios"


async function signIn(data) {
    console.log('jkl');

    return await instance.post("/api/login", data)

}

async function listUsersExample() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        return response.data
    } catch (error) {
        return error
    }
}


export { signIn, listUsersExample }