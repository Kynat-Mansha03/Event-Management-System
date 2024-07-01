import React from 'react'
import './aboutus.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

{/*About us page */}
const Aboutus = () => {
  return (
    //Displaying the information
    <div className='about-work'>
      <div className='content'>
        <h1>About Work</h1>
        <p>
          Welcome to Eventify, where dreams become reality in Pakistan. Founded
          by Hassaan Farooq and Kynat Mansha, we specialize in crafting
          unforgettable events tailored to your vision. With a deep
          understanding of Pakistani culture and a commitment to excellence, we
          curate experiences that leave a lasting impression.
        </p>
        <p>
          From weddings to corporate gatherings, trust us to bring your story to
          life with precision and finesse. Welcome to a world of celebration
          with Eventify.
        </p>
      </div>
      {/*Social media icons */}
      <div className='social-icons'>
        <a
          href='https://www.facebook.com/groups/2506986672753736'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faFacebook} size='2x' />
        </a>
        <a
          href='https://twitter.com/?lang=en'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faTwitter} size='2x' />
        </a>
        <a
          href='https://www.instagram.com/p/C62t09OAhxs/?igsh=d2sydXR2emNzM29x'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faInstagram} size='2x' />
        </a>
      </div>
    </div>
  )
}

export default Aboutus
