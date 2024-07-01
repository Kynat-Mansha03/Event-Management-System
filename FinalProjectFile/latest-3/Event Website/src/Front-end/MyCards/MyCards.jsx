import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './contact.css';

const MyCards = () => {
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
      const response = await axios.get(`http://localhost:8081/api/myevents/${organizerId}`);
      setMycards(response.data);
    } catch (error) {
      console.error('Error fetching my cards:', error);
    }
  };

  const handleDescribe = (eventId) => {
    // Navigate to the Description page with the eventId
    localStorage.setItem('eventId', eventId);
    navigate(`/describe`);
    //store event id in local storage
    
  };
  {/*Deleting the event from the database */}
  {/*By sending the id */}
  const handleDelete = async (eventId) => {
    try {
     
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const organizerId = userInfo.userId;
      await axios.put(`http://localhost:8081/api/events/${eventId}/delete`);
      const response = await axios.get(`http://localhost:8081/api/myevents/${organizerId}`);
      setMycards(response.data);
    } catch (error) {
      console.error('Error deleting or fetching events:', error);
    }
  };
  {/*Displaying the information of the cards by using the eventID from the database */}
  return (
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
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCards;