import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useRequest from "../hooks/useRegister";


const UserContext = createContext({
    isAuthenticated: false,
    isAdmin: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: ''
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { }
});

export function UserProvider({
    children
}) {
    const [user, setUser] = useLocalStorage(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = { email, password };
        let result;
        user?.accessToken ? result = await request('/users/me/password', 'POST', { user: password, newUser: password }, { accessToken: user.accessToken }) :
            result = await request('/users/register', 'POST', newUser);
        //console.log('registerHandler result:', result, user.accessToken);
        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });

        setUser(result);
    };

    const logoutHandler = () => {
        // console.log(`user.accessToken!!!: ${user.accessToken}`);
        return request('/users/logout', 'GET', null, { accessToken: user.accessToken })
            .finally(() => setUser(null));
    };

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        isAdmin: (user?.email == 'peter@abv.bg'),
        registerHandler,
        loginHandler,
        logoutHandler
    };


    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;