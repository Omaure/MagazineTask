import React, {useState} from 'react';
import {useStore} from "react-redux";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/Homepage';
import NavbarPage from './components/Navbar/Navbar';
import NotFound from "./components/NotFound/NotFoundPage";
import NewArticle from "./components/NewArticle/NewArticle";
import UpdateArticle from "./components/UpdateArticle/UpdateArticle";
import ArticlesPage from "./components/ArticlesPage/ArticlesPages";
import './App.css';

function App(props) {

    console.log(window.location.pathname);

    const [userStatus, setUserStatus] = useState(false);
    const store = useStore();


    store.subscribe(function () {
        store.getState().loggedIn === true ? setUserStatus(true) : setUserStatus(false);
    });

    console.log(store.getState());
    console.log(userStatus);

    if (!userStatus) {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={WelcomePage}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    } else {
        return (
            <Router>
                <div className="App">
                    <NavbarPage/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/articles" component={ArticlesPage}/>
                        <Route path="/create" component={NewArticle}/>
                        <Route path="/update/:articleId" component={UpdateArticle} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
