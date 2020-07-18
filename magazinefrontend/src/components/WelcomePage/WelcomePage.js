import React, {useState} from "react";
import "./WelcomePage.css";
import LoginPage from '../Login/Login';
import Signup from "../Signup/Signup";
import userReducer from "../../reducers/userReducer";

export default function WelcomePage() {

    const [whichPage, setWhichpage] = useState(false);

    console.log(userReducer.loggedIn);

    return (
        <div className="w-100 h-100" style={{
            backgroundImage: `url(https://previews.123rf.com/images/aihumnoi/aihumnoi1611/aihumnoi161100593/67680373-why-you-should-get-your-articles-syndicated-text-background-wordcloud-concept.jpg)`
            , backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div style={{height: '100%'}}>
                <div className="mask rgba-gradient d-flex justify-content-center align-items-center">
                    <div class="container px-md-3 px-sm-0">
                        <div class="row wow fadeIn">
                            <div class="col-md-12 mb-4 white-text text-center wow fadeIn">
                                <h3 class="display-3 font-weight-bold white-text mb-0 pt-md-5 pt-5">Welcome to the articles
                                    website</h3>
                                <h4 class="subtext-header mt-2 mb-4"> Please Login or Register to Access Your Articles</h4>
                                <a onClick={() => {
                                    setWhichpage(true)
                                }} class="btn btn-rounded btn-outline-white">
                                    <i class="fa fa-home"></i> Sign In
                                </a>
                                <a onClick={() => {
                                    setWhichpage(false)
                                }} className="btn btn-rounded btn-outline-white">
                                    <i className="fa fa-home"></i> Sign Up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {(() => {
                    if (whichPage) {
                        return (
                            <LoginPage/>
                        )
                    }
                    if (!whichPage) {
                        return (
                            <Signup/>
                        )
                    }
                })()}
            </div>
        </div>
    )
}

