import { useContext, useEffect, useReducer, useCallback } from "react";
import UserContext from "../contexts/UserContext";

let baseUrl = "http://localhost:3031/jsonstore";

function requestReducer(state, action) {
    console.log('>>>>>requestReducer', state, action);
    switch (action.type) {
        case "GET_ALL":
            return Object.values(action.payload);
        case "ADD":
            return Array.isArray(state) ? [...state, action.payload] : state; //[...state, action.payload];
        case "DELETE":
            return Array.isArray(state) ? [...state, action.payload] : state; //state.filter(item => item._id !== action.payload)
        case "GET_ONE":
            return action.payload;
        default:
            return state;
    }
}

export default function useRequest(url, initialState, actionType = "GET_ALL") {
    //console.log(initialState);
    const { user, isAuthenticated } = useContext(UserContext);
    //const [data, setData] = useState(initialState);
    const [data, dispatch] = useReducer(requestReducer, initialState);
    // console.log('data:', data);
    // TODO Fix infinite loop problem on mount request with useEffect
    const request = useCallback(async (url, method, data, config = {}) => {
        console.log('>>>>>READ', url);
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

        // console.log(`url: ${baseUrl}${url}`);
        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
            throw response.statusText;
        }

        if (response.status === 204) {
            return {};
        }

        const result = await response.json();

        return result;
    }, [isAuthenticated, user.accessToken]);

    useEffect(() => {
        if (!url) return;
        console.log('>>>>>>REQUESTING DATA');
        // console.log(url);
        request(url)
            .then((result) => {
                //console.log(result);
                //const data = (Object.values(result))//(Object.entries(result));
                //setData(result)
                //console.log(actionType);
                dispatch({
                    type: actionType,
                    payload: result,
                });

            })
            .catch((err) => alert(err));
    }, [url, actionType, request]);

    return {
        request,
        data,
        dispatch,
    };
}
