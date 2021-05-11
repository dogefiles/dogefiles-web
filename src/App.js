import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "Utils/AuthContext";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "Components/PrivateRoute";
import AllPages from "Pages";
import { SignIn, SignUp } from "Pages/Auth";
import Theme from "Theme";

function App() {
  return (
    <ChakraProvider theme={Theme}>
      <AuthProvider>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact component={AllPages}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
