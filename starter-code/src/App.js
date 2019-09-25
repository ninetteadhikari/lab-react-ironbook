import React, { Component } from "react";
import users from "./users";
import "./App.css";

class App extends Component {
  state = {
    user: users,
    search: "",
    teacher: false,
    student: false,
    city: ""
  };

  handleSearchChange = event => {
    const value = event.target.value;
    console.log(this.state.search);
    this.setState({
      search: value
    });
  };

  handleChecked = event => {
    const value = event.target.checked;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSelect = event => {
    console.log(event)
    const value = event.target.value;
    this.setState({
      city: value
    });
   console.log( this.state.city)
  };

  render() {
    const filteredUser = this.state.user.filter(user => {
      let nameMatched =
        user.firstName
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.state.search.toLowerCase());

      let role = "";
      if (this.state.teacher) {
        role = "teacher";
      } else if (this.state.student) {
        role = "student";
      }

      let roleMatched = user.role.includes(role);

      let cityMatched = user.campus.includes(this.state.city);

      return nameMatched && roleMatched && cityMatched;
    });

    console.log(filteredUser);

    let citySet = new Set();
    users.map(data => {
      return citySet.add(data.campus);
    });
    let cityArr = [...citySet];

    return (
      <div>
        <h1>IronBook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search</label>
          <input
            type="search"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          <div>
            <input
              type="checkbox"
              name="student"
              id="student"
              checked={this.student}
              onChange={this.handleChecked}
            />
            <label htmlFor="student">Student</label>
            <input
              type="checkbox"
              name="teacher"
              id="teacher"
              checked={this.teacher}
              onChange={this.handleChecked}
            />
            <label htmlFor="teacher">Teacher</label>
          </div>
          <select name="city" id="city" onChange={this.handleSelect} value={this.state.city}>
            {cityArr.map(data => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </form>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
            {filteredUser.map(data => {
              return (
                <tr>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.campus}</td>
                  <td>{data.role}</td>
                  <td>
                    {data.linkedin && (
                      <img height="20px" src="linkedin.png" alt="" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
