import React from "react";
import { Authenticator } from "aws-amplify-react";

import MSignIn from "./MSignIn";

const MAuthenticator = () => (
  <Authenticator hideDefault>
    <MSignIn />
  </Authenticator>
);

export default MAuthenticator;
