import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

let baseUrl = 'http://localhost:3031';

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [data, setData] = useState(initialState);

    // TODO Fix infinite loop problem on mount request with useEffect
    const request = useCallback(async (url, method, data, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                'X-Authorization': config.accessToken || user.accessToken,
                'X-Admin': true,
            }
        }
        
    try {
       const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok || response.status >= 403) {
            if (response.status === 409) {
                alert(`The email already registered`);
            } else { 
                alert(`Incorrect user or password`);
            }
            return response.statusText;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        return result;
    
    } catch (error) {
       console.log(error);
    }
}, [isAuthenticated, user]);

    useEffect(() => {
        if (!url) return;

        request(url)
            .then(result => setData(result))
            .catch(err => console.log(err));
    }, [url,request]);

    return {
        request,
        data,
        setData,
    }
}
