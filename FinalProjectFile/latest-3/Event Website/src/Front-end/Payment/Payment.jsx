import React, { useState, useEffect } from 'react';
import './payment.css';
import CreditCard from './CreditCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = ({ eventData }) => {
  const [cardId, setCardId] = useState('');
  const [ticketType, setTicketType] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedCardId = localStorage.getItem('eventId');
    if (storedCardId) {
      setCardId(storedCardId);
    }
  }, []);

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const eventId = localStorage.getItem('eventId');
      const response = await axios.get(`http://localhost:8081/api/eventtickets/${eventId}/${ticketType}`);
      console.log(response.data);
      localStorage.setItem('ticketType', ticketType);
      console.log(localStorage.getItem('ticketType'));
  
      // Send the ticket data to the backend
      // const userId = JSON.parse(localStorage.getItem('user')).userId;
      // const reservedEvent = {
      //   eventId,
      //   userId,
      //   ticketType: response.data.type,
      //   ticketCount: response.data.count
      // };
      // await axios.post('http://localhost:8081/api/reserve-event', reservedEvent);
      // Navigate to the CreditCard component or perform other actions
      if(response.data >0)
        {
          navigate('/credit-card'); 
        }
      else
      {
        alert('No tickets available');
      }
      // Corrected navigation
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="paymentform-login">
      <div className="paymentform-form-container">
        <h2 className="paymentform-title">Payment Form</h2>
      {/*Keeping the input as readonly  */ }
        <form className="paymentform-form" onSubmit={handleSubmit}>
          <div className="paymentform-input-group">
            <label htmlFor="cardId">Card ID</label>
            <input
              type="text"
              id="cardId"
              value={cardId}
              readOnly
            />
          </div>

          {/**  TIcket type */}
          <div className="paymentform-input-group">
            <label htmlFor="ticketType">Ticket Type</label>
            <select id="ticketType" value={ticketType} onChange={handleTicketTypeChange}>
              <option value="">Select Ticket Type</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
            </select>
          </div>
          <button type="submit" className="paymentform-sign">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;