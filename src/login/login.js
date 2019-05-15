import React , {Component} from 'react'
import ErrorMessage from '../commonComponents/error-message'
import {API_BASE_URL} from '../config'
import TokenService from '../services/token-services';
import {setStatePromise} from '../util/common';
import Nav from '../commonComponents/navigation';
import Footer from '../commonComponents/footer';
import changeLoadingStatusTo from '../util/changeLoadingStatus';
import LoadingMessage from '../commonComponents/loading-message';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        setStatePromise(this, {
            error: ''
        })
        .then(() => {
            this.submitLoginInfo()
        })
    }

    submitLoginInfo = () => {
        const loginBody = {
            username: this.state.username.trim(),
            password: this.state.password.trim()
        }

        changeLoadingStatusTo(this, true)
        .then(() => {

            this.fetchPostLoginInfo(loginBody)
            .then(authInfo => {
                TokenService.saveAuthToken(authInfo.authToken)

                this.props.goToHome(authInfo.user_id)
            })
            .catch(error => {
                changeLoadingStatusTo(this, false)
                .then(() => {
                    this.setState({
                        error: error
                    })
                })
            })
        })
    }

    fetchPostLoginInfo = loginBody => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginBody)
                })
                .then(res => {
                    
                    return (!res.ok)
                        ? res.json().then(e => reject(e))
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }

    render() {

        //should loading message be displayed?
        let loadingMessage;
        this.state.loading.status 
            ? loadingMessage = <LoadingMessage/>
            : loadingMessage = ''

        return (
            <main role="main">
                <Nav status="login"/>
                <section className="logIn remote-edge">
                    <header>
                        <h2>Login</h2>
                    </header>
                    {loadingMessage}
                    <ErrorMessage error={this.state.error}/>
                    <form onSubmit={this.handleSubmit}>
                    <label className="login-label" htmlFor="username">Username
                        <input className="loginInput" onChange={this.handleChange} type="text" id="username" autoComplete="current-password"/>
                    </label>
                    <label className="login-label" onChange={this.handleChange} htmlFor="password">Password
                        <input className="loginInput" type="password" id="password" autoComplete="current-password"/>
                    </label>
                    <button className="remote-button" type="submit">Submit</button>
                    <button className="remote-button" onClick={this.props.clickCancel}>Cancel</button>
                    </form>
                </section>
                <Footer/>
            </main>
        )
    }
}

export default Login