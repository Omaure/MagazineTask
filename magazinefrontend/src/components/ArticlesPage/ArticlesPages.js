import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow
} from "mdbreact";
import {FaJoint, IoMdRemoveCircle} from "react-icons/all";
import './ArticlesPage.css';

import {Link} from "react-router-dom";
import NewArticle from "../NewArticle/NewArticle";
import Button from "react-bootstrap/Button";


export default function ArticlesPage() {

    const [allArticles, setallArticles] = useState([]);

    const deleteAnArticle = (articleId) => {
        axios
        ({
            method: 'delete',
            url: `http://localhost:3100/article/${articleId}`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                setArticles();
            }
        })
    };

    const setArticles = () => {
        axios
        ({
            method: 'get',
            url: `http://localhost:3100/article/myarticles`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.data.error) {
                console.log("error");
            } else {
                setallArticles(res.data);
            }
        })
    };


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3100/article/myarticles`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then(res => {
            console.log("this is articles page", res.data);
            setallArticles(res.data);
        }).catch(err => {
            console.log(err);
        })

    }, []);

    return (
        <div>
            <div>
                <h1 className='font-italic font-weight-bold text-center text-secondary'>
                    Your Articles
                </h1>
            </div>
            <Button color="black">
                <Link to='/create'>Create Article</Link>
            </Button>

            <div className='mt-4 mb-4' style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                <MDBRow className='flex-1'>
                    {allArticles.map(currentArticle => {
                        return (
                            <MDBCol md="4" className='mb-3'>
                                <MDBCard className='h-600'>
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-center font-weight-bold'>
                                            {currentArticle.title}
                                        </MDBCardTitle>
                                        <MDBCardText className='font-weight-bold'>
                                            {currentArticle.description.slice(0, 100) + "..."}
                                        </MDBCardText>
                                    </MDBCardBody>
                                    <MDBBtn onClick={(e) => {
                                        deleteAnArticle(currentArticle._id);
                                    }}>
                                        Delete Article
                                    </MDBBtn>
                                    <Button>
                                        <Link to={`/update/${currentArticle._id}`}>
                                            Update Article
                                        </Link>
                                    </Button>


                                </MDBCard>
                            </MDBCol>
                        )
                    })}
                </MDBRow>
            </div>
        </div>
    )
}
