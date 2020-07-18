import React, {useEffect, useState} from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput} from 'mdbreact';
import axios from "axios";
import {Link} from "react-router-dom";

export default function UpdateArticle(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {
        match: {params},
    } = props;
    console.log(params.articleId);


    const getCurrentArticle = (currentArticleId) => {
        axios
        ({
            method: 'get',
            url: `http://localhost:3100/article/${currentArticleId}`,
            data: {description, title},
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            if (res.data.error) {
                console.log("error");
            } else {
                setTitle(res.data[0].title);
                setDescription(res.data[0].description);
            }
        })
    };


    const updateAnArticle = (articleId, description, title) => {
        axios
        ({
            method: 'patch',
            url: `http://localhost:3100/article/${articleId}`,
            data: {description, title},
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                alert("Article Updated")
            }
        })
    };

    useEffect(() => {
        getCurrentArticle(params.articleId);
    }, []);

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <p className="h4 text-center mb-4">Update Article</p>
                    <label htmlFor="defaultFormContactNameEx" className="grey-text">
                        Article Title
                    </label>
                    <input value={title} type="text" id="defaultFormContactNameEx" className="form-control"
                           onChange={(e) => {
                               setTitle(e.target.value);
                           }}/>
                    <br/>
                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                        Description
                    </label>
                    <textarea value={description} type="text" id="defaultFormContactMessageEx" className="form-control"
                              rows="3"
                              onChange={(e) => {
                                  setDescription(e.target.value);
                              }}
                    />
                    <div className="text-center mt-4">
                        <MDBBtn color="warning" outline onClick={(e) => {
                            updateAnArticle(params.articleId, description, title);
                        }}>
                            Update Article
                            <MDBIcon far icon="paper-plane" className="ml-2"/>
                        </MDBBtn>
                    </div>

                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

