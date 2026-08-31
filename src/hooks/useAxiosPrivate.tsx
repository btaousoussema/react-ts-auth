import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken, { type RefreshFunction } from "./useRefreshToken";
import { Auth } from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const refresh: RefreshFunction = useRefreshToken();
    const { auth }: { auth: Auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(config => {
            if(!config.headers['Authorization']) {
                 config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                 console.log("The auth in request intercept: ", {auth})
            }
            return config;
            }, (error) => Promise.reject(error)
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(response => response, 
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status == 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    //setAuth(newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;