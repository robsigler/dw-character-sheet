import * as React from "react";

export interface LoginProps { }

export interface LoginState {
    email: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(evt: any) {
        const newEmail: string = evt.target.value;
        this.setState((state: LoginState) => {
            return {
                email: newEmail,
            };
        });
    }

    handlePasswordChange(evt: any) {
        const newPassword: string = evt.target.value;
        this.setState((state: LoginState) => {
            return {
                password: newPassword,
            };
        });
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
                <input onChange={this.handleEmailChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus></input>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.handlePasswordChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        );
    }
}