import { useState, useEffect } from "react";
import { LoginButton, SessionProvider } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";


function LoginForm(): JSX.Element {

    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  
    useEffect(() => {
      setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);
    
    return (
        <>
            <Container>
            <FormGroup>
                <TextField
                label="Identity Provider"
                placeholder="Identity Provider"
                type="url"
                value={idp}
                onChange={(e) => setIdp(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <SessionProvider>
                            <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                                Login
                            </LoginButton>
                        </SessionProvider>
                    ),
                }}
                />
            </FormGroup>
            </Container>
        </>
    );
}

export default LoginForm;