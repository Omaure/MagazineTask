import React, {useState} from "react";
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBInput,
} from "mdbreact";

import {fetchUser} from "../../actions/userActions";
import {useDispatch} from "react-redux";
import {FcSignature, FcUnlock} from "react-icons/all";
import "./Login.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    return (

        <div style={{width: '50%', marginTop: "10%", marginLeft: "auto", marginRight: "auto"}}>
            <MDBCard
                className="card-image signupForm w-100 h-100"
                style={{
                    backgroundImage:
                        "url(https://media.istockphoto.com/photos/newspapers-with-headlines-on-horizontal-surface-old-newspaper-picture-id1175069864)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    border: "solid grey 2px",
                }}
            >
                <div className="text-white rgba-stylish-strong pb-2 px-2 z-depth-4 h-35 ">
                    <div className="text-center">
                        <h3 className="white-text mb-2 mt-2 font-weight-bold">
                            <strong>SIGN</strong>
                            <span className="green-text font-weight-bold">
                                <strong> IN <FcUnlock/></strong>
                            </span>
                        </h3>
                    </div>
                    <MDBInput
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        group
                        type="email"
                        validate
                        labelClass="white-text"
                        className="text-white"
                    />
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                label="Password"

                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                group
                                type="password"
                                validate
                                labelClass="white-text"
                                className="md-col-4 m-0 text-white"

                            />
                        </MDBCol>

                    </MDBRow>

                    <MDBRow className="d-flex align-items-center mb-0">
                        <div className="text-center mb-0 col-md-12">
                            <MDBBtn
                                color="success"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bolder"
                                onClick={() => {
                                    dispatch(fetchUser(email, password))
                                }}
                            >
                                SignIn
                                <FcSignature/>
                            </MDBBtn>
                        </div>
                    </MDBRow>
                </div>
            </MDBCard>

        </div>


    );
}
