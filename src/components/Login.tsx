import * as React from "react";

export interface LoginProps { }

export interface LoginState {
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
    }

    render() {
        const loginFormStyle = {
            "width": "100%",
            "max-width": "330px",
            "padding": "15px",
            "margin": "auto",
        }

        return (
            <form className="form-signin" style={loginFormStyle}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus></input>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        );
    }
}