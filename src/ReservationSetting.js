import React from 'react'

const ReservationSetting = () => {
    async function getReservationSettings() {
        let result = fetch("http://localhost:8000/api/setting", 
        {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        (await result).json
        console.log(result)
    } 
  return (
    <div>
      
    </div>
  )
}

export default ReservationSetting
