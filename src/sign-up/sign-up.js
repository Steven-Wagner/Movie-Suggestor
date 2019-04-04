import React, {Component} from 'react';
import { users } from '../dataModel/fakeData';
import ErrorMessage from '../commonComponents/error-message'

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
        
        if (this.state.firstName.length === 0) {
            error = 'First name is required'
        }
        else if (this.state.lastName.length === 0) {
            error = 'Last name is required'
        }
        else if (this.state.username.length === 0) {
            error = 'Username is required'
        }
        else if (this.userAlreadyExists(this.state.username)) {
            error = 'Username is already taken'
        }
        else if (this.state.password.length < 6) {
            error = 'password must be 6 or more characters in length'
        }
        return error
    }

    userAlreadyExists= userToCheck => {
        return users.find(user =>  user.username === userToCheck)
    }

    handleSubmit= e => {
        e.preventDefault()
        const newError = this.validateForm()
        if (newError) {
            this.setState({
                error: newError
            })
        }
        else {
            console.log('form submitted')
            const newUser = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                bio: this.state.bio,
                friends: []
            }
            this.props.addUser(newUser)
            this.props.goToHome(newUser.username)
        }
    }
    
    render() {

        return (
            <div>
                <header>
                    <h1>Sign-up</h1>
                </header>
                <section>
                    <ErrorMessage errorMessage={this.state.error}/>
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
                            <input onChange={(e) => this.handleChange(e)} type="text" name='username' id='username' />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => this.handleChange(e)} type="password" name='password' id='password' />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio</label>
                            <textarea onChange={(e) => this.handleChange(e)} name='bio' id='bio' placeholder="Tell others about your favorite movies and what you like."/>
                        </div>
                        <button type='submit'>Sign Up</button>
                        <button onClick={this.props.clickCancel}>Cancel</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default Signup