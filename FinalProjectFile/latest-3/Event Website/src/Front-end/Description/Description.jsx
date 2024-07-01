// Description.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Description.css';
import eventImage from '../../Images/event-homepage.svg';
import { useNavigate } from 'react-router-dom';

const Description = () => {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventId = localStorage.getItem('eventId'); // Retrieve eventId from local storage
        const response = await axios.get(`http://localhost:8081/api/eventdetail/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, []);

 const handlePayment = () => {
    // Navigate to the Payment page
    navigate('/payment');
    // Store event id in local storage
   // localStorage.setItem('eventId', eventId);
};

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="description-container">
      <div className="event-image-container">
        <img src={eventImage} alt={event.title} className="event-image" />
      </div>
      <div className="event-details">
        <h1 className="event-title">{event.title}</h1>
        <div className="event-info">
          <p className="event-price">${event.price}</p>
          <p className="event-category">{event.type}</p>
          <p className="event-organizer">by {JSON.parse(localStorage.getItem('user')).name} | {JSON.parse(localStorage.getItem('user')).email}</p>
        </div>
        <button className="get-ticket-btn" onClick={() => handlePayment()}>Get Ticket</button>
        <div className="event-date-location">
          <p className="event-date">
            <span className="icon">📅</span>
            {new Date(event.dateTime).toLocaleString()} / {event.day}
          </p>
          <p className="event-location">
            <span className="icon">📍</span>
            {event.location}, {event.city}
          </p>
        </div>
        <div className="event-description">
          <h2>What You'll Learn:</h2>
          <p>{event.details}</p>

        </div>
      </div>
    </div>
  );
};

export default Description;