import useAuth from "./useAuth";
import axiosPrivate from "../api/axios";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () =>{
        const response = await axiosPrivate.get('/auth/refresh', {
            withCredentials: true,
        })

        setAuth(prev => {
        console.log("Previous auth state: ", prev);
        console.log("Data from token refresh: ", response.data);
        console.log("AccessToken from token refresh: ", response.data?.accessToken);

        return { ...prev, accessToken: response?.data?.accessToken };
        });

        return response.data?.accessToken;
    };
    
    return refresh;
}

export default useRefreshToken;