import React , {Component} from 'react'

class Login extends Component {
    render() {
        return (
            <div>
                <main role="main">
                    <section>
                        <header>
                            <h2>Login</h2>
                        </header>
                        <form>
                        <label htmlFor="username">Username
                            <input type="text" id="username"/>
                        </label>
                        <label htmlFor="password">Password
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