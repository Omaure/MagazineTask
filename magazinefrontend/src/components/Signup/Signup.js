import React, {useState} from "react";
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBInput,
} from "mdbreact";
import {signUserUp} from "../../actions/userActions";
import {FcRegisteredTrademark, FaRegistered} from "react-icons/all";
import {useDispatch} from "react-redux";
import "./Signup.css";

export default function RegistrationPage() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();

    const validateRegistration = (
        userFirstName,
        userLastName,
        userEmail,
        confirmMail,
        userPassword,
        confirmPass
    ) => {
        console.log(
            userFirstName,
            userLastName,
            userEmail,
            confirmMail,
            userPassword,
            confirmPass
        );

        const userFullName = userFirstName + " " + userLastName;

        if (userPassword.length < 8) {
            alert("Please user a password with a length more than 8");
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userEmail)) {
            alert("Please Enter a valid Email");
        }
        if (userEmail !== confirmMail) {
            alert("Emails do not match");
        }
        if (userPassword !== confirmPass) {
            alert("Password does not match");
        } else {
            dispatch(signUserUp(userFullName, email, password));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            validateRegistration(
                firstName,
                lastName,
                email,
                confirmEmail,
                password,
                confirmPassword
            );
        }
    };

    return (

        <div onKeyPress={handleKeyDown}
             style={{width: '50%', marginTop: "5%", marginLeft: "auto", marginRight: "auto"}}>
            <MDBCard
                className="card-image signupForm w-100 h-100"
                style={{
                    backgroundImage:
                        "url(https://media.istockphoto.com/photos/newspapers-with-headlines-on-horizontal-surface-old-newspaper-picture-id1175069864)",
                    width: "40rem",
                    border: "solid grey 2px",

                }}
            >
                <div className="text-white rgba-stylish-strong pb-2 px-2 z-depth-4 h-35 ">
                    <div className="text-center">
                        <h3 className="white-text mb-2 mt-2 font-weight-bold">
                            <strong>SIGN</strong>
                            <span className="green-text font-weight-bold">
                                <strong> UP <FcRegisteredTrademark/></strong>
                            </span>
                        </h3>
                    </div>
                    <MDBInput
                        label="Your email"
                        onChange={(e) => setEmail(e.target.value)}
                        group
                        type="email"
                        validate
                        labelClass="white-text"
                        className="text-white"
                    />
                    <MDBInput
                        label="Confirm email"
                        onChange={(e) => {
                            setConfirmEmail(e.target.value);
                        }}

                        group
                        type="email"
                        validate
                        pattern={/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/}
                        labelClass="white-text"
                        className="m-0 text-white"
                    />
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                label="Your password"

                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                group
                                type="password"
                                validate
                                labelClass="white-text"
                                className="md-col-4 m-0 white-text"

                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                label="Confirm password"

                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                group
                                type="password"
                                validate
                                labelClass="white-text"
                                className="md-col-4 m-0 text-white"
                            />
                        </MDBCol>

                    </MDBRow>

                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                label="Your First Name"
                                className="text-white"

                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                group
                                type="text"
                                validate
                                labelClass="white-text"
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                label="Your Last Name"
                                className="text-white"

                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                group
                                type="text"
                                validate
                                labelClass="white-text"
                            />
                        </MDBCol>


                    </MDBRow>


                    <MDBRow className="d-flex align-items-center mb-0">
                        <div className="text-center mb-0 col-md-12">
                            <MDBBtn
                                color="success"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bold"
                                onClick={() => {
                                    validateRegistration(
                                        firstName,
                                        lastName,
                                        email,
                                        confirmEmail,
                                        password,
                                        confirmPassword
                                    );
                                }}
                            >
                                Signup
                                <FaRegistered/>
                            </MDBBtn>
                        </div>
                    </MDBRow>
                </div>
            </MDBCard>
        </div>
    );
}
