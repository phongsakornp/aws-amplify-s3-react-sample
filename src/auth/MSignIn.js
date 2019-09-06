/*
  Refererence: https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/SignIn.jsx.
*/
import React from "react";
import { Auth, JS } from "aws-amplify";
import styled from "styled-components";
import { space, width } from "styled-system";

import { Box, TextInput, Text, Button } from "grommet";

import MAuthPiece from "./MAuthPiece";

const Form = styled.form`
  ${space} ${width};
`;

const MInput = styled(TextInput)`
  box-sizing: border-box;
  border: 1px solid rgb(209, 214, 219);
`;

export default class MSignIn extends MAuthPiece {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);

    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.state = {};
  }

  checkContact(user) {
    Auth.verifiedContact(user).then(data => {
      if (!JS.isEmpty(data.verified)) {
        this.changeState("signedIn", user);
      } else {
        user = Object.assign(user, data);
        this.changeState("verifyContact", user);
      }
    });
  }

  signIn(e) {
    const { username, password } = this.inputs;
    console.log(`SignIn`, username, password);
    Auth.signIn(username, password)
      .then(user => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.changeState("requireNewPassword", user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => {
        console.log(`User SignIn Failed > ${JSON.stringify(err)}`);
        this.error(err);
      });

    e.preventDefault();
  }

  signInSuccess(user) {
    this.setState({ error: "" });
  }

  showComponent() {
    return (
      <Box
        align="center"
        justify="center"
        elevation="medium"
        background="transparent"
      >
        <Box style={{ minWidth: 470 }}>
          <Box pad="16px" background="white">
            <Box align="center" justify="center" pad="16px">
              <Text align="center" weight="bold">
                Log in to SERVICES
              </Text>

              <Box margin={{ vertical: "10px" }}>
                <Form width={1}>
                  <Box
                    fill="horizontal"
                    background="transparent"
                    margin={{ vertical: "10px" }}
                  >
                    <Text htmlFor="username">Username</Text>
                    <MInput
                      id="username"
                      name="username"
                      placeholder="Username?"
                      onChange={this.handleInputChange}
                    />
                  </Box>

                  <Box
                    fill="horizontal"
                    background="transparent"
                    margin={{ vertical: "16px" }}
                  >
                    <Text htmlFor="password">Password</Text>
                    <MInput
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password?"
                      onChange={this.handleInputChange}
                    />
                  </Box>

                  <Button
                    primary
                    label="Login"
                    onClick={this.signIn}
                    style={{ width: "180px", height: "50px" }}
                  />
                </Form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
