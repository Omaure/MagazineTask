import React, {useState} from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon} from 'mdbreact';
import axios from "axios";

export default function NewArticle(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createAnArticle = (description, title) => {
        axios
        ({
            method: 'post',
            url: `http://localhost:3100/article/`,
            data: {description, title},
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                alert("Article Created");
                props.history.push('/articles');

            }
        })
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <p className="h4 text-center mb-4">New Article</p>
                    <label htmlFor="defaultFormContactNameEx" className="grey-text">
                        Article Title
                    </label>
                    <input type="text" id="defaultFormContactNameEx" className="form-control"
                           onChange={(e) => {
                               setTitle(e.target.value);
                           }}/>
                    <br/>
                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Description
                    </label>
                    <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3"
                              onChange={(e) => {
                                  setDescription(e.target.value);
                              }}
                    />
                    <div className="text-center mt-4">
                        <MDBBtn color="warning" outline onClick={(e) => {
                            createAnArticle(description, title);
                        }}>
                            Create Article
                            <MDBIcon far icon="paper-plane" className="ml-2"/>
                        </MDBBtn>
                    </div>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

