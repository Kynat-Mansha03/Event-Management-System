import React from 'react'
import './contact.css'
import Image1 from '../../Images/pic1.jpg'
import Image2 from '../../Images/pic2.jpg'

const Contact = () => {
  return (
    <>
    {/*This is Contact section */}
      <div className='contact-container'>
        <div className='Contact_card'>
          <div className='Contact_card-image'>
            <img src={Image1} alt={'pic1'} className='Contact_object-cover' />
          </div>
          <div className='Contact_card-content'>
            <h5 className='Contact_card-title'>Hassaan Farooq</h5>
            <p className='Contact_card-text'>Professional Coder Graduated from FAST University</p>
          </div>
          <div className='Contact_card-actions'>
            <a href="mailto:i210442@nu.edu.pk" className='Contact_btn'>Email Us</a>
          </div>
        </div>
        <div className='Contact_card'>
          <div className='Contact_card-image'>
            <img src={Image2} alt={'pic2'} className='Contact_object-cover' />
          </div>
          <div className='Contact_card-content'>
            <h5 className='Contact_card-title'>Kynat Mansha</h5>
            <p className='Contact_card-text'>Professional Coder Graduated from FAST University</p>
          </div>
          <div className='Contact_card-actions'>
            <a href="mailto:i210684@nu.edu.pk" className='Contact_btn'>Email Us</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact