import { useContext, useEffect, useCallback, useState } from "react";
import UserContext from "../contexts/UserContext";

let baseUrl = "http://localhost:3031/jsonstore";

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [dataState, setDataState] = useState(initialState);

    const request = useCallback(async (url, method = 'GET', data, config = {}) => {
        let options = {};

        if (method) {
            options.method = method;
        }

        if (data) {
            options.headers = {
                "content-type": "application/json",
            };

            options.body = JSON.stringify(data);
        }

        if (config.accessToken || isAuthenticated) {
            options.headers = {
                ...options.headers,
                "X-Authorization": config.accessToken || user.accessToken, //X-Admin: true - give full access and skip ownership
            };
        }

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if (response.status === 204) {
            return;
        }

        const result = await response.json();

        switch (method) {
            case "GET":
                setDataState(Object.values(result));
                break;
            case "POST":
                setDataState(state => [...state, result]);
                break;
            case "PUT":
                setDataState(state => state.map(currentItem => {
                    if (currentItem._id !== data._id) {
                        return { ...result };
                    } else {
                        return currentItem;
                    }
                }));
                break;
            case "DELETE":
                setDataState(state => state.filter(currentItem => currentItem._id !== data._id));
                break;
            default:
                break;
        }

    }, [isAuthenticated, user]);

    useEffect(() => {
        if (!url) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        request(url)
            .catch((err) => alert(err));
    }, [url, request]);

    return {
        request: request,
        data: dataState,
    };
}
