import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './contact.css';


{/*Displaying the information of the cards by using the eventID from the database */}
const ReservedCards = () => {
  const [mycards, setMycards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMyCards();
  }, []);

  {/*fetching the cards from the database */}
  const fetchMyCards = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const organizerId = userInfo.userId;
      const response = await axios.get(`http://localhost:8081/api/reservedevents/${organizerId}`);
      setMycards(response.data);
    } catch (error) {
      console.error('Error fetching my cards:', error);
    }
  };

  const handleDescribe = (eventId) => {
    // Navigate to the Description page with the eventId
    navigate(`/describe`);
    //store event id in local storage
    localStorage.setItem('eventId', eventId);
  };
  {/*Deleting the event from the database */}
  const handleDelete = async (eventId) => {
    try {
     
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const organizerId = userInfo.userId;
      await axios.put(`http://localhost:8081/api/reservedevents/${eventId}/${organizerId}/delete`);
      const response = await axios.get(`http://localhost:8081/api/reservedevents/${organizerId}`);
      setMycards(response.data);
    } catch (error) {
      console.error('Error deleting or fetching events:', error);
    }
  };

  return (
    //Displaying the information of the cards by using the eventID from the database
    <div className='contact-container'>
      {mycards.map((card) => (
        <div key={card.eventId} className='Contact_card'>
          <div className='Contact_card-image'>
            <img src={`http://localhost:8081/api/Cardsimages/${card.image}`} alt={card.title} className='Contact_object-cover' />
          </div>
          <div className='Contact_card-content'>
            <h5 className='Contact_card-title'>{card.title}</h5>
            <p className='Contact_card-text'>{card.details}</p>
          </div>
          <div className='Contact_card-actions'>
            <button className='Contact_btn' onClick={() => handleDescribe(card.eventId)}>
              Description
            </button>
          </div>
          <div className='Contact_card-actions'>
            <button className='Contact_btn' onClick={() => handleDelete(card.eventId)}>
              Attended
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservedCards;