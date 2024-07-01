import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './events.css';

const Events = () => {
  const [mycards, setMycards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  const [filterValue, setFilterValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCards();
  }, []);

  {/*fetching the cards from the database */}
  const fetchMyCards = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const organizerId = userInfo.userId;
      const response = await axios.get(`http://localhost:8081/api/eventsnotid/${organizerId}`);
      setMycards(response.data);
      setFilteredCards(response.data);
    } catch (error) {
      console.error('Error fetching my cards:', error);
    }
  };

  {/*When the user clicks on the card, store the eventid and navigate to description */}
  const handleReserve = (eventId) => {
    navigate(`/description`);
    localStorage.setItem('eventId', eventId);
  };

  {/*Filtering the cards based on the city or the event type */}
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setFilterValue('');
    if (e.target.value === 'All') {
      setFilteredCards(mycards);
    }
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
    filterCards(e.target.value);
  };

  const filterCards = (value) => {
    if (filterOption === 'All') {
      {/*DO nothing as function is being called */}
      return;
    } else if (filterOption === 'Select by City') {
      const filtered = mycards.filter((card) => card.city.toLowerCase() === value.toLowerCase());
      setFilteredCards(filtered);
    } else if (filterOption === 'Select by Event Type') {
      const filtered = mycards.filter((card) => card.type.toLowerCase() === value.toLowerCase());
      setFilteredCards(filtered);
    }
  };

  return (
    <>
    {/*Filtering the cards based on the city or the event type */}
      <div className='events_filter-container'>
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Select by City">Select by City</option>
          <option value="Select by Event Type">Select by Event Type</option>
        </select>
        {(filterOption === 'Select by City' || filterOption === 'Select by Event Type') && (
          <select value={filterValue} onChange={handleFilterValueChange}>
            <option value="">Select an option</option>
            {filterOption === 'Select by City' &&
              [...new Set(mycards.map((card) => card.city))].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            {filterOption === 'Select by Event Type' &&
              [...new Set(mycards.map((card) => card.type))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        )}
      </div>
      {/*Displaying the cards */}
      <div className='events_contact-container'>
        <div className='event_container'>
          {filteredCards.map((card) => (
            <div key={card.eventId} className='events_Contact_card'>
              <div className='events_Contact_card-image'>
                <img src={`http://localhost:8081/api/Cardsimages/${card.image}`} alt={card.title} className='events_Contact_object-cover' />
              </div>
              <div className='events_Contact_card-content'>
                <h5 className='events_Contact_card-title'>{card.title}</h5>
                <p className='events_Contact_card-text'>{card.details}</p>
              </div>
              <div className='events_Contact_card-actions'>
                <button className='events_Contact_btn' onClick={() => handleReserve(card.eventId)}>
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;