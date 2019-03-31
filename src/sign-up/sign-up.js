import React, {Component} from 'react';

class Signup extends Component {
    
    render() {

        console.log('history', this.props.history)

        return (
            <div>
                <header>
                    <h1>Sign-up</h1>
                </header>
                <section>
                    <form className='signup-form'>
                        <div>
                            <label htmlFor="first-name">First name</label>
                            <input placeholder='First Name' type="text" name='first-name' id='first-name' />
                        </div>
                        <div>
                            <label htmlFor="last-name">Last name</label>
                            <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
                        </div>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name='username' id='username' />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio</label>
                            <textarea name='bio' id='bio' />
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