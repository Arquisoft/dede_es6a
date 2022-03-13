import React, { useState } from "react";
import { AuthButton, Link, LoggedOut } from "@solid/react";
import {  LoggedIn } from "@solid/react";
import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function LoginForm( Login: any, error: any ) {

  return (
      <div className="login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Login for Form 1</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                        <div className="form-group">
                            <a href="#" className="ForgetPwd">Register Now</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}