import React, {useEffect, useState} from "react";
import axios from "axios";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardText, MDBCardTitle, MDBCol, MDBRow} from "mdbreact";
import { useStore} from "react-redux";
import {FcNext, FcPrevious} from "react-icons/all";
import './Homepage.css'
import {Link} from "react-router-dom";

export default function HomePage() {

    const [currentArticles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const store = useStore();

    console.log(store.getState().loggedIn);

    const getArticles = async () => {
        console.log(currentPage);
        axios({
            method: 'get',
            url: `http://localhost:3100/article/all`,
            headers: {'JWT': localStorage.getItem('token')}
        }).then(result => {
            console.log(result.data);
            setArticles(result.data);
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });
    };

    useEffect(() => {
        getArticles();
    }, [currentPage]);

    const incrementPage = (index) => {
        setCurrentPage(index);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const decrementPage = (index) => {
        setCurrentPage(index);
    };

    return (
        <div>
            <div>
                <h1 className='font-italic font-weight-bold text-center text-secondary'>
                    All Articles
                </h1>
            </div>
            {(() => {
                if (!currentArticles) {
                    return (
                        <Link className='font-italic font-weight-bold text-center align-content-center text-secondary'
                              to='/Sources'>
                            No Articles
                        </Link>
                    )
                } else {
                    return (
                        <div>
                            <MDBRow className='flex-1 mt-4'>
                                {currentArticles.map(currentArticle => {
                                    return (
                                        <MDBCol md="4" className='mb-3'>
                                            <MDBCard className='mycard'>
                                                <MDBCardBody className='align-items-center'>
                                                    <MDBCardTitle className='text-center font-weight-bold'>
                                                            {"Title: " + currentArticle.title.toUpperCase()}
                                                    </MDBCardTitle>
                                                    <MDBCardText className='font-weight-bolder font-weight-bold'>
                                                        {currentArticle.description === null ? "No Info" : currentArticle.description}
                                                    </MDBCardText>

                                                    <MDBCardFooter>
                                                        {"Author Name: " + currentArticle.authorId.fullName}
                                                    </MDBCardFooter>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    )
                                })}

                            </MDBRow>


                            <MDBBtn
                                color="black"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bold mb-3 text-white"
                                onClick={event => {
                                    currentPage > 0 ? setCurrentPage(currentPage - 1) :
                                        alert('This is the first Page');
                                }}>
                                <FcPrevious/>
                                Previous Page
                            </MDBBtn>

                            <MDBBtn
                                color="black"
                                rounded
                                type="button"
                                className="btn-block z-depth-1 font-weight-bold mb-3 text-white"
                                onClick={event => {
                                    setCurrentPage(currentPage + 1);
                                }}>

                                Next Page
                                <FcNext/>
                            </MDBBtn>
                        </div>)
                }
            })()}

        </div>


    )
}
