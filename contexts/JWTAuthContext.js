import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'components';
import { RouteApi } from 'RouteApi';
import { ConfigApp } from 'config';
import { ASSET_TOKEN, DATA_USER } from 'utils/constant';
import restApi from 'utils/restAPI';


const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
}

const setSession = (accessToken, user) => {
    if (accessToken) {
        localStorage.setItem(DATA_USER, JSON.stringify(user));
        localStorage.setItem(ASSET_TOKEN, accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem(DATA_USER);
        localStorage.removeItem(ASSET_TOKEN);
        delete axios.defaults.headers.common.Authorization;
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (username, password) => {
        const response = await restApi.post(RouteApi.login, {
            username,
            password,
        });

        if (response?.data?.user) {

            const { accessToken, user } = response.data;

            setSession(accessToken, user);

            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                },
            })
        }
        return null;
    }

    const register = async (email, username, password) => {
        // const response = await axios.post('/api/auth/register', {
        //     email,
        //     username,
        //     password,
        // })

        // const { accessToken, user } = response.data

        // setSession(accessToken)

        // dispatch({
        //     type: 'REGISTER',
        //     payload: {
        //         user,
        //     },
        // })
    }

    const logout = () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem(ASSET_TOKEN);
                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);
                    const response = await restApi.get(RouteApi.profile);
                    const user = response.data;

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
