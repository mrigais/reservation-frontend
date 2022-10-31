import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';


const CreateReservation = () => {

  const [users, setUsers] = useState([]);
  let selectedUsers = {};
  const [reservationDateTime, setReservationDateTime] = useState(new Date());
  
  //to get a list of users
  useEffect(() => {
    const url = "http://localhost:8000/api/users";
    const fetchUsers = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUsers();
  }, []);

  //to select the users
  const handleChange = (value) => {
    selectedUsers = value.map(function(user) {
      return user.value;
    });
     
  }
  //creating reservation
  let handleSubmit = async(event) => {
    event.preventDefault();
    try {
      // let x = JSON.stringify({"user_ids" : selectedUsers});
      console.log(selectedUsers);
      let create_reservation = await fetch("http://localhost:8000/api/create-reservation", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user_ids" : selectedUsers,
        "reservation_datetime" : moment.utc(reservationDateTime).local().format('YYYY-MM-DD HH:mm') })
      });
      
      let response = await create_reservation.json();

      console.log(response)
    } catch (err){
      console.log(err)
    }
  }

      return (

        <Form className='form-control-main' onSubmit={handleSubmit}><b>Create Reservation</b>
          <Form.Group style={{marginTop: 15, marginBottom: 15}}>
          <Form.Label>Users</Form.Label>
              <Select
                // name='selectedUsers'
                // value={users}
                onChange={handleChange}
                  isMulti
                  options={users.map((user)=>{
                    return ({
                      // key: user.id,
                      value: user.id,
                      label: user.name
                    }
                    )})}
              />    
          </Form.Group>

          <Form.Group style={{marginBottom: 15}}>
          <Form.Label>Date Time</Form.Label>
          <DatePicker
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={reservationDateTime}
              onChange={ setReservationDateTime }
              value={reservationDateTime}
          />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
}

export default CreateReservation;
