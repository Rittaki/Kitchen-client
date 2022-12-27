import { useEffect, useState } from "react";
import Login from "./Login/Login";
import { useLocalState } from "./util/utilLocalStorage";
import { Routes, Route } from "react-router-dom";
import Recipes from "./Recipes/Recipes";
import Homepage from "./Homepage/Homepage";
import PrivateRoute from "./PrivateRoute";
import Register from "./Register/Register";
import RecipeView from "./RecipeView/RecipeView";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [someValue, setSomeValue] = useState("");

  // useEffect(() =>{
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "Cook_Programmer@somewhere.com",
  //       password: "RecipeInBinary",
  //     };
  //     console.log(reqBody);

  //     fetch('/api/auth/login', {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(reqBody),
  //     })
  //     .then((response) => Promise.all([response.json(), response.headers]))
  //     .then(([body, headers]) => {
  //       setJwt(headers.get("authorization"));
  //     });
  //   }
  // }, []);  

  useEffect(() => {
    console.log(`JWT is: ${jwt}`);
  }, [jwt]);

  return (
    <Routes>
      <Route
        path="/recipes"
        element={
          <PrivateRoute>
            <Recipes />
          </PrivateRoute>
        }
      />
      
      <Route
      path="/recipes/:id/"
      element={
        <PrivateRoute>
        <RecipeView />
        </PrivateRoute>
      }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recipes" element={<Homepage />} />
    </Routes>
  );
}

export default App;
