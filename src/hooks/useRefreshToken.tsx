import useAuth from "./useAuth";
import axiosPrivate from "../api/axios";
import { Auth } from "../context/AuthProvider";

export type RefreshFunction = () => Promise<string | null>;


const useRefreshToken = (): RefreshFunction => {
    const { setAuth }: { setAuth: React.Dispatch<React.SetStateAction<Auth>> } = useAuth();

    const refresh = async () : Promise<string | null> => {
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