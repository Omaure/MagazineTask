// Action Creators

import axios from "axios";

export function setUser(payload) {
    return {type: "SET_USER", payload}
};

export function logUserOut() {
    return {type: "LOG_OUT"}
};

// Methods
export const fetchUser = (email, password) => dispatch => {
    axios
        .post(`http://localhost:3100/login`, {
            email,
            password,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                localStorage.setItem("token", res.data.token);
                dispatch(setUser(res.data.user));
            }
        });
};

export const logoutUser = () => dispatch => {
    axios({
        method: 'post',
        url: `http://localhost:3100/logout`,
        headers: {'JWT': localStorage.getItem("token")}
    }).then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.error) {
            console.log("error");
        } else {
            dispatch(logUserOut());
            window.location = '/';
        }
    });
};

export const signUserUp = (fullName, email, password) => dispatch => {
    axios
        .post(`http://localhost:3100/user`, {
            fullName,
            email,
            password,
        })
        .then((res) => {
            if (res.data.error) {
                console.log("error");
            } else {
                alert("Registration successful please login")
            }
        });

};
