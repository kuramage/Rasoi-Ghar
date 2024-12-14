import { Component } from "react";
import logo from "./signin.png";
import logo2 from "./signup.png";

export class SignIn extends Component {
  state = {
    isSignIn: true,
    isSignUp: true,
    message: "",
    email: "",
    password: "",
  };

  toggleForm = () => {
    this.setState((prevState) => ({
      isSignIn: !prevState.isSignIn,
      isSignUp: !prevState.isSignUp,
      message: "",
    }));
  };

  handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ message: 'Sign in successful!' });
      } else {
        this.setState({ message: data.error || 'Sign in failed.' });
      }
    } catch (error) {
      this.setState({ message: 'Error: ' + error.message });
    }
  };

  handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ message: 'Sign up successful!' });
      } else {
        this.setState({ message: data.error || 'Sign up failed.' });
      }
    } catch (error) {
      this.setState({ message: 'Error: ' + error.message });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { isSignIn, isSignUp, message} = this.state;
    return (
      <div
        className="sign"
        style={{
          display: "flex",
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        }}
      >
        <div className={`login ${isSignIn ? "" : "fade"}`}>
          <div />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700"
              style={{
                background: "#6F3B10",
                height: "95vh",
                width: "36vw",
                boxShadow: " inset 20px 20px 20px rgba(0, 0, 0, 0.3)",
                padding: "20px",
                borderRadius: "18px",
              }}
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "80px",
                    marginBottom: "60px",
                  }}
                >
                  Sign In
                </h1>

                {message && (
                <p className="text-red-500">{message}</p> // Display error/success messages
                )}

                <form className="space-y-4 md:space-y-6" action="#" onSubmit={this.handleSignIn} >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-4xl font-bold text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 text-2xl border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      style={{
                        background: "#A86E3E",
                        width: "25vw",
                        height: "10vh",
                      }}
                      placeholder="name@company.com"
                      required=""
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-4xl font-bold text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 text-4xl border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      style={{
                        background: "#A86E3E",
                        width: "25vw",
                        height: "10vh",
                      }}
                      required=""
                      onChange={this.handleChange}
                    />
                  </div>
                  {
                    /* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */
                  }
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    style={{
                      fontSize: "30px",
                      background: "#A86E3E",
                      width: "10vw",
                      height: "10vh",
                      marginLeft: "130px",
                      marginTop: "50px",
                    }}
                    // onClick={this.toggleForm}
                  >
                    Sign in
                  </button>
                  <p
                    className="text-xl font-light text-gray-500 dark:text-gray-400"
                    style={{ marginLeft: "50px" }}
                  >
                    Don’t have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-white hover:underline dark:text-primary-500"
                      onClick={this.toggleForm}
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`register ${isSignIn ? "fade" : ""}`}>
            <div />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                style={{
                  background: "#111125",
                  height: "95vh",
                  width: "36vw",
                  boxShadow: " inset 40px 40px 40px rgba(0, 0, 0, 0.7)",
                  padding: "20px",
                  borderRadius: "18px",
                }}
              >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1
                    className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "80px",
                      marginBottom: "60px",
                    }}
                  >
                    Sign Up
                  </h1>

                  {message && (
                  <p className="text-red-500">{message}</p> // Display error/success messages
                  )}

                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={this.handleSignUp}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-4xl font-bold text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 text-2xl border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style={{
                          background: "#F9F0E9",
                          width: "25vw",
                          height: "10vh",
                        }}
                        placeholder="name@company.com"
                        required=""
                        onChange={this.handleChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-4xl font-bold text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 text-4xl border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style={{
                          background: "#F9F0E9",
                          width: "25vw",
                          height: "10vh",
                        }}
                        required=""
                        onChange={this.handleChange}
                      />
                    </div>
                    {
                      /* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */
                    }
                    <button
                      type="submit"
                      className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      style={{
                        fontSize: "30px",
                        background: "#F9F0E9",
                        width: "10vw",
                        height: "10vh",
                        marginLeft: "130px",
                        marginTop: "50px",
                      }}
                      // onClick={this.toggleForm}
                    >
                      Sign up
                    </button>
                    <p
                      className="text-xl font-light text-gray-500 dark:text-gray-400"
                      style={{ marginLeft: "50px" }}
                    >
                      Don’t have an account yet?{" "}
                      <a
                        href="#"
                        className="font-medium text-white hover:underline dark:text-primary-500"
                        onClick={this.toggleForm}
                      >
                        Sign in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className={`image-container ${isSignIn ? "" : "slide"}`}
          src={logo}
          alt="photo"
        />
        <img
          className={`image-container2 ${isSignUp ? "" : "slide2"}`}
          src={logo2}
          alt="photo"
        />
      </div>
    );
  }
}



export default SignIn;