import React from "react";
import "./App.css";

function App() {
  const [email, setEmail] = React.useState("");
  const [emailTypeCheck, setEmailTypeCheck] = React.useState("");

  const handleChange = (event) => {
    if (event.target.value === "") {
      setEmailTypeCheck("");
    }
    setEmail(event.target.value);
  };

  const submitForm = async () => {
    let emailChars =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailChars.test(email)) {
      setEmailTypeCheck("Processing");
      console.log("Sending this email : ", email);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email}),
      };
      console.log(requestOptions.body)
      fetch("http://127.0.0.1:8000/api/users/", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            setEmailTypeCheck("Failed");
            return Promise.reject(error);
          }
          setEmailTypeCheck("Subscribed");
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setEmailTypeCheck("Failed");
        });
    } else if (email === "") {
      setEmailTypeCheck("");
    } else {
      setEmailTypeCheck("Enter a valid email");
    }
  };

  return (
    <div className="App bg-blue-50 bg-opacity-50 h-screen pt-16">
      <h1 className="m-8 text-3xl">Sign up for our newsletter</h1>
      <form className="w-full max-w-sm mx-auto">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="email"
            >
              Enter email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="email"
              placeholder="abc@gmail.com"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="mx-auto">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={submitForm}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="mx-auto mt-4">
          {emailTypeCheck === "Failed" ? (
            <label className="block text-red-500 mb-1 md:mb-0 pr-4" for="email">
              {emailTypeCheck}
            </label>
          ) : (
            <label
              className="block text-gray-500 mb-1 md:mb-0 pr-4"
              for="email"
            >
              {emailTypeCheck}
            </label>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
