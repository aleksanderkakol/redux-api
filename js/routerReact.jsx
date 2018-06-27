import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {connect, Provider} from 'react-redux';
import * as actions from './actions.jsx';
import {reducer} from './reducer.jsx';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import {getDataFailed} from "./actions.jsx";

require('../style/style.scss');

const store = createStore(
    reducer,
    {isLoading: false, isError: false, users: []},
    applyMiddleware(thunk)
);


class Navigation extends React.Component{
    render(){
        return <header className='header'>
            <h1>Aplikacja React z React Router</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>

                </ul>
            </nav>
        </header>
    }
}
class Main extends React.Component{
    render(){
        return <div className='main'>
            <h2>Witaj na stronie</h2>
        </div>
    }
}

class Users extends React.Component{

    componentDidMount(){
        const {getData} = this.props;
        getData();
        this.setState({
            loading:false
        })
    }

    render(){

        const {isLoading, isError, users} = this.props;

        if(isLoading) {
            return <div className='loader'/>
        }

        else if(isError) {
            return console.log(getDataFailed());
        }

        let userList = users.map(user => {
            return (
                <li key={user.name}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            )
        });

        return <div className='main'>
            <h2>Users list:</h2>
            <ul>
                {userList}
            </ul>
            {users.map(path => {
                return (
                    <Route key={path.id} path={`/users/${path.id}`} render={(props) => <AboutUser {...props} infoUser={path}/>}/>
                )
            })}

        </div>
    }
}

class AboutUser extends React.Component{
    render() {
        return (
        <div className='info'>
            <ul className='userInfo'>
                <li>Name: {this.props.infoUser.name}</li>
                <li>Username: {this.props.infoUser.username}</li>
                <li>Email: {this.props.infoUser.email}</li>
                <li>Phone: {this.props.infoUser.phone}</li>
                <li>Website: {this.props.infoUser.website}</li>
            </ul>
        </div>
        )}
}

class NotFound extends React.Component{
    render(){
        return (<div className='main'>
            <h2>This is not the page you are looking for...</h2>
        </div>)
    }
}

class App extends React.Component{
    render(){
        return (<HashRouter>
            <div className='container'>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/users" component={Users}/>
                    <Route path='*' component={NotFound} />
                </Switch>
                </div>
        </HashRouter>)
    }
}


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchProps = (dispatch) => {
    return {
        getData: () => dispatch(actions.getData())
    }
};

Users = connect(mapStateToProps, mapDispatchProps)(Users);
AboutUser = connect(mapStateToProps, mapDispatchProps)(AboutUser);



document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});