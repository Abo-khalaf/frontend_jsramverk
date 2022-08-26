export async function create(username, password) {
    let input = JSON.stringify({
      username: username,
      password: password,
    });
  
    return await fetch(
      `http://localhost:1337/signup`,
      {
        method: "POST",
        body: input,
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((data) => data.json())
      .then(function (data) {
        localStorage.setItem("userId", data.id);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
  }
  
  
  export async function login(username, password) {
    let input = JSON.stringify({
      username: username,
      password: password,
    });
  
    return await fetch(`http://localhost:1337/login`, {
      method: "POST",
      body: input,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(function (data) {
        console.log("data from users.js", data);
        return data.userId;
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
  }