import React, { Component } from "react";
class ApiFour extends Component {
  constructor() {
    super();
    this.state = {
      citylist: [],
    };
  }

  getCity = () => {
    fetch("http://firstenquiry.com/api/react/live/allcity.php")
      .then((response) => response.json())
      .then((citydata) => this.setState({ citylist: citydata }));
  };

  componentDidMount() {
    this.getCity();
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h4> {this.state.citylist.length} - Available City </h4>
          </div>
        </div>
        <div className="row text-center">
          {this.state.citylist.map((xcity, index) => {
            return (
              <div className="col-lg-3 form-group" key={index}>
                <p className="border p-3">{xcity.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ApiFour;
