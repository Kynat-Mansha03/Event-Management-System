import React, { useState } from 'react'
import './cardform.css'
import axios from 'axios'

const CardForm = () => {
  // const [eventId, setEventId] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [location, setLocation] = useState('')
  const [city, setCity] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [day, setDay] = useState('')
  const [type, setType] = useState('')
  // const [organizerId, setOrganizerId] = useState('')
  const [vipTickets, setVipTickets] = useState('')
  const [regTickets, setRegTickets] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  // const [deleteStatus, setDeleteStatus] = useState(false)

  const handleSubmit = async e => {
    {/*Getting the data from the form and sending
    it to the backend for creating the event
    by the organizer*/}
    e.preventDefault()
    const organizer = JSON.parse(localStorage.getItem('user'))
    const organizerId = organizer.userId
    console.log('Organizer ID:', organizerId)
    const formData = new FormData()
    if (organizerId) {
      formData.append('title', title)
      formData.append('details', details)
      formData.append('location', location)
      formData.append('city', city)
      formData.append('dateTime', dateTime)
      formData.append('day', day)
      formData.append('type', type)
      formData.append('organizerId', organizerId)
      formData.append('vipTickets', vipTickets)
      formData.append('regTickets', regTickets)
      formData.append('price', price)
      formData.append('image', image)
    }

    {/*Sending the data to the backend*/}
    try {
      
      const response = await axios.post(
        'http://localhost:8081/api/events_create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Response:', response.data) // Log the response data
      alert('Card added successfully') // Alert the user
    } catch (error) {
      console.error('Error:', error)
      //display error message
    }
  }

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  return (
    <div className='cardform-login'>
      <div className='cardform-form-container'>
        <p className='cardform-title'>Event Form</p>
        <form className='cardform-form' onSubmit={handleSubmit}>
          {/* <div className='cardform-input-group'>
            <label htmlFor='eventId'>Event ID</label>
            <input
              type='number'
              name='eventId'
              id='eventId'
              value={eventId}
              onChange={e => setEventId(e.target.value)}
            />
          </div> */}
          <div className='cardform-input-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='details'>Details</label>
            <input
              type='text'
              name='details'
              id='details'
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='city'>City</label>
            <select
              name='city'
              id='city'
              value={city}
              onChange={e => setCity(e.target.value)}
            >
              <option value=''>Select city</option>
              <option value='Islamabad'>Islamabad</option>
              <option value='Lahore'>Lahore</option>
              <option value='Karachi'>Karachi</option>
              <option value='Faisalabad'>Faisalabad</option>
              <option value='Rawalpindi'>Rawalpindi</option>
              <option value='Gujranwala'>Gujranwala</option>
              <option value='Peshawar'>Peshawar</option>
              <option value='Multan'>Multan</option>
              <option value='Hyderabad'>Hyderabad</option>
              <option value='Quetta'>Quetta</option>
            </select>
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='dateTime'>Date and Time</label>
            <input
              type='date'
              name='dateTime'
              id='dateTime'
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='day'>Day</label>
            <select
              name='day'
              id='day'
              value={day}
              onChange={e => setDay(e.target.value)}
            >
              <option value=''>Select day</option>
              <option value='Monday'>Monday</option>
              <option value='Tuesday'>Tuesday</option>
              <option value='Wednesday'>Wednesday</option>
              <option value='Thursday'>Thursday</option>
              <option value='Friday'>Friday</option>
              <option value='Saturday'>Saturday</option>
              <option value='Sunday'>Sunday</option>
            </select>
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='type'>Type</label>
            <select
              name='type'
              id='type'
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value=''>Select event type</option>
              <option value='Conference'>Conference</option>
              <option value='Seminar'>Seminar</option>
              <option value='Workshop'>Workshop</option>
              <option value='Concert'>Concert</option>
              <option value='Exhibition'>Exhibition</option>
              <option value='Festival'>Festival</option>
              <option value='Party'>Party</option>
              <option value='Sports'>Sports</option>
              <option value='Theatre'>Theatre</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          {/* <div className='cardform-input-group'>
            <label htmlFor='organizerId'>Organizer ID</label>
            <input
              type='number'
              name='organizerId'
              id='organizerId'
              value={organizerId}
              onChange={e => setOrganizerId(e.target.value)}
            />
          </div> */}
          <div className='cardform-input-group'>
            <label htmlFor='vipTickets'>VIP Tickets</label>
            <input
              type='number'
              name='vipTickets'
              id='vipTickets'
              value={vipTickets}
              onChange={e => setVipTickets(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='regTickets'>Regular Tickets</label>
            <input
              type='number'
              name='regTickets'
              id='regTickets'
              value={regTickets}
              onChange={e => setRegTickets(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className='cardform-input-group'>
            <label htmlFor='image'>Image</label>
            <input
              type='file'
              name='image'
              id='image'
              onChange={handleImageChange}
            />
          </div>
          {/* <div className='cardform-input-group'>
            <label htmlFor='deleteStatus'>Delete Status</label>
            <input
              type='checkbox'
              name='deleteStatus'
              id='deleteStatus'
              checked={deleteStatus}
              onChange={e => setDeleteStatus(e.target.checked)}
            />
          </div> */}
          <button className='cardform-sign' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CardForm
