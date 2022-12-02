import Login from "./components/Login";

function App() {

  // const fdata = new FormData();
  // fdata.append('username', 'handuldul@gmail.com');
  // fdata.append('password', '123456789');
  const reqBody = {
    username: "Cook_Programmer@somewhere.com",
    password: "RecipeInBinary",
  };
  console.log(reqBody);

  fetch('/api/auth/login', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  })
  .then((response) => Promise.all([response.json(), response.headers]))
  .then(([body, headers]) => {
    const authValue = headers.get("authorization");
    console.log(authValue);
    // console.log(body);
  });
  

  return (
    <div>
       <Login />
    </div>
  );
}

export default App;
