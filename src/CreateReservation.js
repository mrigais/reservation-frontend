import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Button, Alert} from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';


const initialState = {
  users: [],
  reservationDateTime: new Date(),
  selectedUsers: [],
  message: "",
  status: false
};

class CreateReservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    let fetchedUsers = "";
    fetch('http://localhost:8000/api/users')
      .then((response) => response.json())
      .then((res) => {
        fetchedUsers = res.map((user) => {
          return {value: user.id, label: user.name} 
        });
        this.setState({ users: fetchedUsers });
      }).catch(error => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    this.setState({selectedUsers: event});
  }

  
  dateChange = (event) => {
    this.setState({reservationDateTime: event})
  }

   handleSubmit = async (event) => {

    let selectedUsers = this.state.selectedUsers.map( user => user['value'])
    event.preventDefault();
    try {
      let create_reservation = await fetch("http://localhost:8000/api/create-reservation", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user_ids" : selectedUsers,
        "reservation_datetime" : moment.utc(this.state.reservationDateTime).local().format('YYYY-MM-DD HH:mm') })
      });
      
      let response = await create_reservation.json();

      if(response.is_booking_restricted){
        this.setState({message: "Reservation for some user(s) exists, kindly try a different time!"})
        this.showAlert();
      }else{
        this.setState({message: "Reservation created succesfully!"})
        this.showAlert();
      }
      
    } catch (err){
      this.setState({message: "Reservation for some user(s) exists, kindly try a different time!"})
    }
  }

  showAlert = () => {
    this.setState({status: true}, ()=>{
      window.setTimeout(()=> {
        this.setState({status: false})
        // this.setState(initialState)
      }, 5000)
    })
  }

  render() {
    return (
      <Form className='form-control-main' onSubmit={this.handleSubmit}><b>Create Reservation</b>
      <Alert  variant="primary" show={this.state.status} dismissible>{this.state.message}</Alert>
          <Form.Group style={{marginTop: 15, marginBottom: 15}}>
          <Form.Label>Users</Form.Label>
              <Select
                // name='selectedUsers'
                // value={this.state.users}
                onChange={this.handleChange}
                  isMulti
                  options={this.state.users}
                  // options={this.state.users.map((user)=>{
                  //   return ({
                  //     key: user.name,
                  //     value: user.id,
                  //     label: user.name
                  //   }
                  //   )}
                    // )}
              />    
          </Form.Group>

          <Form.Group style={{marginBottom: 15}}>
          <Form.Label>Date Time</Form.Label>
          <DatePicker
              required
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={this.state.reservationDateTime}
              onChange={ this.dateChange }
              value={this.state.reservationDateTime}
          />
          </Form.Group>

          <Button variant="primary" type="submit" style={{marginBottom: 15}}>
            Submit
          </Button>
        </Form>
    );
  }
}

export default CreateReservation;