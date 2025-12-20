import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { urlAPI } from "../config/global";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      url: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("masuk");
    try {
      console.log(`${this.state.url}/login/check`);
      const response = await axios.post(`${this.state.url}/login/check`, {
        username: this.state.username, // Updated field name
        password: this.state.password, // Updated field name
      });
      console.log(response.data);
      if (response.data.status === "success") {
        sessionStorage.setItem(
          "user",
          JSON.stringify(response.data.user.username)
        );
        sessionStorage.setItem("url", this.state.url);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Selamat, Anda Berhasil Masuk",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = `/`;
        });
      } else {
        this.setState({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.error("Error:", err);
      this.setState({ error: "Failed to connect to server" });
    }
  };

  render() {
    const dataOption = [
      { value: "http://26.45.147.210:5004", label: "Klinik Kemiling" },
      { value: "http://26.142.134.35:5004", label: "Klinik Rajabasa" },
      { value: "http://26.153.78.144:5004", label: "Klinik Urip" },
      { value: "http://26.233.238.40:5004", label: "Klinik Tugu" },
      { value: "http://26.173.89.26:5004", label: "Klinik Palapa" },
      { value: "http://26.192.81.231:5004", label: "Klinik Tirtayasa" },
      { value: "http://26.36.157.170:5004", label: "Klinik Panjang" },
      { value: "http://26.193.33.81:5004", label: "Klinik Teluk" },
      { value: "http://26.174.51.4:5004", label: "Klinik Amanah" },
      { value: "http://26.87.103.138:5004", label: "Klinik Sumber Waras" },
      { value: "http://26.77.0.24:5004", label: "GTS Tirtayasa" },
      { value: "http://26.254.31.254:5004", label: "GTS Kemiling" },
    ];
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px flex flex-col justify-start gap-2">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={this.state.url}
                onChange={(e) => {
                  this.setState({ url: e.target.value });
                }}
              >
                <option>Pilih Cabang Klinik</option>
                {dataOption.map((data) => (
                  <option value={data.value}>{data.label}</option>
                ))}
              </select>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          {this.state.error && (
            <p className="text-red-500 text-center">{this.state.error}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
