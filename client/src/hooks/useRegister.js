import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

let baseUrl = 'http://localhost:3031';

export default function useRequest(url, initialState) {
    const { user, isAuthenticated } = useContext(UserContext);
    const [data, setData] = useState(initialState);

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
                    //'X-Admin': true,
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


    // const request = useCallback(
    //     async (path, method = "GET", payload = undefined, config = {}) => { // 🔧 CHANGED: defaults for method & payload
    //         const options = { method };                 // 🔸 ADDED: always define method
    //         const headers = {};                         // 🔸 ADDED: always start with a headers object

    //         // Body & content-type
    //         if (payload !== undefined) {                // 🔧 CHANGED: check against undefined (allows falsy values)
    //             headers["Content-Type"] = "application/json"; // 🔸 ADDED: canonical header casing
    //             options.body = JSON.stringify(payload);
    //         }

    //         // Auth header – only if not explicitly skipped
    //         // 🔸 ADDED: `skipAuth` switch and safer token decision
    //         const shouldSendAuth =
    //             !config.skipAuth && (config.accessToken || (isAuthenticated && user?.accessToken));
    //         if (shouldSendAuth) {
    //             headers["X-Authorization"] = config.accessToken || user.accessToken; // 🔸 ADDED
    //         }

    //         options.headers = headers;                  // 🔸 ADDED: set headers once

    //         try {
    //             const response = await fetch(`${baseUrl}${path}`, options);

    //             // 🔧 CHANGED: clearer error buckets
    //             if (!response.ok || response.status >= 403) {
    //                 if (response.status === 409) {
    //                     alert(`The email is already registered`);
    //                 } else if (response.status === 401 || response.status === 403) {
    //                     alert(`Not authorized or incorrect user/password`);
    //                 } else {
    //                     alert(`Request failed (${response.status})`);
    //                 }
    //                 return response.statusText;
    //             }

    //             if (response.status === 204) {
    //                 return {}; // 🔧 CHANGED: explicit empty object for 204
    //             }

    //             const ct = response.headers.get("Content-Type") || ""; // 🔸 ADDED
    //             if (ct.includes("application/json")) {                 // 🔸 ADDED
    //                 return await response.json();
    //             }

    //             return await response.text();                          // 🔸 ADDED: fallback to text
    //         } catch (error) {
    //             console.log(error);
    //             throw error;                                           // 🔸 ADDED: rethrow so caller can handle
    //         }
    //     },
    //     [isAuthenticated, user]
    // );

    // useEffect(() => {
    //     if (!url) return;

    //     request(url)
    //         .then((result) => setData(result))
    //         .catch((err) => console.log(err));
    // }, [url, request]);

    // return {
    //     request,
    //     data,
    //     setData,
    // };


}
