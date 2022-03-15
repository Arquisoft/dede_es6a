
import { useState } from "react";
import "./FormLogin.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Autocomplete} from "@mui/material";
import Provider from "./Provider";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import {
    handleIncomingRedirect, 
    onSessionRestore
  } from "@inrupt/solid-client-authn-browser";
  import { useEffect } from 'react';
  import { useNavigate } from "react-router-dom";
  


export default function LoginForm() {
/*
  return (
      <div className="login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Inicio de sesión</h3>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control"
                             placeholder="Nombre de usuario *"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control"
                                placeholder="Contraseña *"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btnSubmit" 
                            value="Acceder">Acceder</button>
                        </div>
                        <div className="form-group">
                            <a href="register" className="ForgetPwd">¡Registrate ahora!</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
  */
  const authOptions = {
    clientName: "DedEx: Decentralized Delivery",
  };

  const navigate = useNavigate();

  const [oidcIssuer, setOidcIssuer] = useState("https://broker.pod.inrupt.com/");



  const { session } = useSession();

  onSessionRestore((url) => {
    if (session.info.isLoggedIn) {
      navigate(url);
    }
  });

  useEffect(() => {
    handleIncomingRedirect({
      restorePreviousSession: true
    }).then(() => {
      if (session.info.isLoggedIn) {
        navigate("/profile");
      }
    })
  }, []);
 return(
    <>
            <Autocomplete>
          disablePortal
          id="combo-box-providers"
          options={Provider}
          renderInput={(params: any) => <div {...params} label="Provider:" />}
          getOptionLabel={(option: any) => option.displayName}
          onChange={(e: any, value: any) => {
            if (value != null)
              setOidcIssuer(value.url)
          }}
        <Autocomplete/>
            <LoginButton
              oidcIssuer={oidcIssuer}
              redirectUrl={window.location.href}
              authOptions={authOptions}>            </LoginButton>

        <div className="help">
          Don't have a POD? Get one here: <a id="solidcom" href="https://solidcommunity.com/">Inrupt</a>
        </div>
        </div>
</>
  );
}
