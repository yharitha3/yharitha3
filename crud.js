import React, { Component } from "react";
import axios from "axios";

class Crud extends Component {
  constructor() {
    super();
    this.state = {
      userlist: [],
      userinfo: {},
      message: "",
    };
  }

  processInput = (obj) => {
    let userinfo = this.state.userinfo;
    userinfo[obj.target.name] = obj.target.value;

    this.setState({
      userinfo,
    });
  };

  saveitem = () => {
    let input = JSON.stringify(this.state.userinfo); // array to json
    let url = "http://firstenquiry.com/api/react/crud/save.php";
    axios.post(url, input).then((response) => {
      this.setState({
        message: response.data,
      });
      this.getUsers(); // after saving the record list should reload
    });
  };

  getUsers = () => {
    let url = "http://firstenquiry.com/api/react/crud/list.php";
    axios.get(url).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          userlist: response.data,
        });
      } //if end here
    });
  };

  deleteUser = (userid) => {
    this.setState({
      userlist: [],
      message: "Please Wait Processing....",
    });

    let input = { id: userid };
    input = JSON.stringify(input); // array to json
    let url = "http://firstenquiry.com/api/react/crud/delete.php";
    axios.post(url, input).then((response) => {
      this.setState({
        message: response.data,
      });
      this.getUsers(); // to reload the list after deleting the record
    });
  };

  componentDidMount() {
    this.getUsers();
  }
  // 8792462607
  render() {
    return (
      <div className="container mt-4">
        <div className="row mt-2">
          <div className="col-lg-3">
            <label>Enter Name</label>
            <input
              type="text"
              className="form-control"
              name="fname"
              onChange={this.processInput}
            />
          </div>
          <div className="col-lg-3">
            <label>Enter Mobile No</label>
            <input
              type="number"
              className="form-control"
              name="mobile"
              onChange={this.processInput}
            />
          </div>
          <div className="col-lg-3">
            <label>Enter e-Mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.processInput}
            />
          </div>
          <div className="col-lg-3 pt-4">
            <button className="btn btn-primary" onClick={this.saveitem}>
              Save User
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-12 text-center">
            <h5> CRUD - Create, Read, Update, Delete </h5>
            <p className="text-danger">{this.state.message}</p>

            <table className="table table-bordered table-sm">
              <thead>
                <tr className="bg-light text-primary">
                  <td>Sl No</td>
                  <td>Name</td>
                  <td>E-Mail</td>
                  <td>Mobile No</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {this.state.userlist.map((xuser, index) => {
                  return (
                    <tr key={index}>
                      <td> {xuser.id} </td>
                      <td> {xuser.name} </td>
                      <td> {xuser.email} </td>
                      <td> {xuser.mobile} </td>
                      <td>
                        <button onClick={this.deleteUser.bind(this, xuser.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Crud;
