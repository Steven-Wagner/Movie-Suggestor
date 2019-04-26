import React , {Component} from 'react'
import ErrorMessage from '../commonComponents/error-message'
import {API_BASE_URL} from '../config'
import TokenService from '../services/token-services';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        //todo: add validation

        const loginBody = {
            username: this.state.username,
            password: this.state.password
        }
        console.log('apiurl', API_BASE_URL)

        fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginBody)
        })
        .then(res => {
            
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        .then(res => {
            TokenService.saveAuthToken(res.authToken)

            this.props.goToHome(res.user_id)
        })
        .catch(res => {
            this.setState({
                error: res.error
            })
        })
    }

    render() {
        return (
                <main role="main">
                    <section>
                        <header>
                            <h2>Login</h2>
                        </header>
                        <ErrorMessage errorMessage={this.state.error}/>
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="username">Username
                            <input onChange={this.handleChange} type="text" id="username"/>
                        </label>
                        <label onChange={this.handleChange} htmlFor="password">Password
                            <input type="text" id="password"/>
                        </label>
                        <button type="submit">Submit</button>
                        <button onClick={this.props.clickCancel}>Cancel</button>
                        </form>
                    </section>
                </main>
        )
    }
}

export default Login