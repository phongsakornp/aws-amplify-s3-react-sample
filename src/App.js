import React from "react";
import { Grommet, Box } from "grommet";
import { Auth, Hub } from "aws-amplify";

import { MAuthenticator } from "./auth";
import StorageViewer from "./StorageViewer";

function App() {
  const [user, setUser] = React.useState(null);

  const loadUser = () => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(user => {
        setUser({ user });
      })
      .catch(err => {
        console.log(`Error authenticate user:`, err);
        setUser({ user: null });
      });
  };

  React.useEffect(() => {
    loadUser();
    Hub.listen("auth", data => {
      const { payload } = data;
      loadUser(payload);
    });
  }, []);

  let main = user ? <StorageViewer /> : <MAuthenticator />;

  return (
    <Grommet>
      <Box
        fill="horizontal"
        align="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        {main}
      </Box>
    </Grommet>
  );
}

export default App;
