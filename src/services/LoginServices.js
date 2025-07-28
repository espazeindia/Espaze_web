import requests from "./httpService";

const LoginServices = {
    LoginOperationalGuy : async(body)=>{
        return requests.post("/login/operational_guy/login",body)
    }

}

export default LoginServices;
