import React, {useState, useEffect} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';

class SettingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {n: 0,
                  g: '',
                  d: '',
                  tz: '',
                  message: '',
                  status: false};
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/setting')
      .then((response) => response.json())
      .then((res) => {

        this.setState({n: res.n, d: res.d, g: res.g, tz: res.tz, status: false})

      }).catch(error => {
        console.log(error);
      })
  }

  showAlert = () => {
    this.setState({status: true}, ()=>{
      window.setTimeout(()=> {
        this.setState({status: false})
      }, 5000)
    })
  }
  
  updateReservationSettings = async (e) => {

    e.preventDefault();
      let update = await fetch('http://localhost:8000/api/update-setting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "n":this.state.n,
            "d": this.state.d,
            "g": this.state.g,
            "tz": this.state.tz
        })

    });

    let res = await update.json();
    this.setState(this.setState({n: res.n, d: res.d, g: res.g, tz: res.tz, message: 'Updated Successfully', status: false}))
    this.showAlert()
};

  render() {
    return (

      <Form className='form-control-main' onSubmit={this.updateReservationSettings}><b>Reservation Setting</b>
      <Alert  variant="primary" show={this.state.status} dismissible>{this.state.message}</Alert>
        <Form.Group className="mb-3" >
          <Form.Label>n</Form.Label>
          <Form.Control type="number" value={this.state.n} onChange={event => this.setState({n: event.target.value})} placeholder="Enter number of reservations" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>d</Form.Label>
          <Form.Control
            as="select"
            value={this.state.d}
            onChange={event => this.setState({d: event.target.value})}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </Form.Control>
        </Form.Group>
          <Form.Group controlId="formBasicSelect" className="mb-3">
          <Form.Label>g</Form.Label>
          <Form.Control
            as="select"
            value={this.state.g}
            onChange={event => this.setState({g: event.target.value})}
          >
            <option value="individual">Individual</option>
            <option value="group">Group</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>tz</Form.Label>
          <Form.Control value={this.state.tz} type="text" onChange={event => this.setState({tz: event.target.value})} placeholder="Enter Timezone" />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default SettingForm;
