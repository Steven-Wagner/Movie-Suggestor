import React, {Component} from 'react';
import ErrorMessage from '../commonComponents/error-message';
import {API_BASE_URL} from '../config';
import TokenService from '../services/token-services';
import Nav from '../commonComponents/navigation';
import Footer from '../commonComponents/footer';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            bio: '',
            error: ''
        }
    }

    handleChange= e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validateForm = () => {
        let error = '';

        //can I use switch here?
        
        if (this.state.firstName.length === 0) {
            error = 'First name is required'
        }
        else if (this.state.lastName.length === 0) {
            error = 'Last name is required'
        }
        else if (this.state.username.length === 0) {
            error = 'Username is required'
        }
        else if (this.state.password.length < 6) {
            error = 'password must be 6 or more characters in length'
        }
        return error
    }

    handleSubmit= e => {
        e.preventDefault()
        const newError = this.validateForm()
        if (newError) {
            this.setState({
                error: {message: newError}
            })
        }
        else {

            const newUser = {
                first_name: this.state.firstName.trim(),
                last_name: this.state.lastName.trim(),
                username: this.state.username.trim(),
                password: this.state.password.trim(),
                bio: this.state.bio.trim(),
            }

            this.fetchPostNewUser(newUser)
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
    
                this.props.goToHome(res.user_id)
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
        }
    }

    fetchPostNewUser = newUser => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                }).then(res => {
                    return (!res.ok)
                    ? res.json().then(e => {reject(e)})
                    : resolve(res.json())
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }
    
    render() {

        return (
            <div>
                <Nav status="signUp"/>
                <section className="logIn remote-edge">
                    <header>
                        <h2>Sign-up</h2>
                    </header>
                    <ErrorMessage error={this.state.error}/>
                    <form onSubmit={this.handleSubmit} className='signup-form'>
                        <div>
                            <label htmlFor="first-name">First name</label>
                            <input onChange={(e) => this.handleChange(e)} placeholder='First Name' type="text" name='first-name' id='firstName' />
                        </div>
                        <div>
                            <label htmlFor="last-name">Last name</label>
                            <input onChange={(e) => this.handleChange(e)} type="text" name='last-name' id='lastName' placeholder='Last Name' />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => this.handleChange(e)} type="text" name='username' id='username' autoComplete='username'/>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => this.handleChange(e)} type="password" name='password' id='password' autoComplete='new-password'/>
                        </div>
                        <div>
                            <label htmlFor="bio">Bio</label>
                            <textarea onChange={(e) => this.handleChange(e)} name='bio' id='bio' placeholder="Tell others about your favorite movies and what you like."/>
                        </div>
                        <button className="remote-button" type='submit'>Sign Up</button>
                        <button className="remote-button" onClick={this.props.clickCancel}>Cancel</button>
                    </form>
                </section>
                <Footer/>
            </div>
        )
    }
}

export default Signup