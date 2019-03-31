import React , {Component} from 'react'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('Send request to API')
        this.props.goToHome()
    }

    render() {
        return (
            <div>
                <main role="main">
                    <section>
                        <header>
                            <h2>Login</h2>
                        </header>
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
            </div>
        )
    }
}

export default Login