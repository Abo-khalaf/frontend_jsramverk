import React, { useState } from "react";
import { create, login } from "./users";

export default function Login({ callBack }) {
  const [username, setUsername] = useState("");
  const [username2, setUsername2] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [signInUp, setSignInUp] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleErrorMessages = () => {
    let ifReturn = false;
    if (!username) {
      setErrorUser("Oops! You need to add a username.");
      ifReturn = true;
    }
    if (!password) {
      setErrorPassword("Oops! You need to add a password.");
      ifReturn = true;
    }

    if (password.length < 8) {
      setErrorPassword("Your password needs to be at least 8 characters long.");
    }

    return ifReturn;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();


    await create(username, password);

  };

  const handleSignIn = async (event) => {
    event.preventDefault();



    const userID = await login(username2, password2);
    callBack(userID);

  };

  return (
    <div>
      {/* SIGN UP */}
      <form onSubmit={(event) => handleSignUp(event)}>
        <div className={signInUp ? "" : "hidden"}>
          <h4>Sign up to JSEditor</h4>
          <div>
            <label>Username</label>
            <p className={errorUser ? "text-red-600" : "hidden"}>{errorUser}</p>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label>
              Password
              <span className="text-xs text-yellow-600">
                (Must be at least 8 characters)
              </span>
            </label>
            <p className={errorPassword ? "text-red-600" : "hidden"}>
              {errorPassword}
            </p>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
          >
            <p className="text-gray-100">Submit</p>
          </button>
          {/* <p className="text-center mt-8 mb-2">Already a user?</p>
          <button
            type="button"
            className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow w-full"
            onClick={() => setSignInUp(!signInUp)}
          >
            <p className="text-gray-100">Login</p>
          </button> */}
        </div>
      </form>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

      {/* LOGIN IN */}
      <form onSubmit={(event) => handleSignIn(event)}>
        <div className={signInUp ? "hidden" : ""}>
          <h4>Log in</h4>
          <div>
            <label>Username</label>
            <p className={errorUser ? "text-red-600" : "hidden"}>{errorUser}</p>
            <input
              type="text"
              value={username2}
              onChange={(event) => setUsername2(event.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <p className={errorPassword ? "text-red-600" : "hidden"}>
              {errorPassword}
            </p>
            <input
              type="password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
          </div>

          <button type="submit">
            <p>Submit</p>
          </button>
          {/* <p className="text-center mt-8 mb-2">Don't have a account yet?</p>
          <button type="button" onClick={() => setSignInUp(!signInUp)}>
            <p className="text-gray-100">Sign up</p>
          </button> */}
        </div>
      </form>
    </div>
  );
}
