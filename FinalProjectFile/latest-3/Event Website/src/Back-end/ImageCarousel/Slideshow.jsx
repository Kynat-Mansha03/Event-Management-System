import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Image1 from '../../Images/1.jpg'
import Image2 from '../../Images/2.png'
import Image3 from '../../Images/3.jpeg'
import Image4 from '../../Images/4.jpg'
import Image5 from '../../Images/5.jpg'
import './slideshow.css'
const Slideshow = () => {
  return (
    <div className='carousel-t'>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={Image1}
            alt='First slide'
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>DJ Events</h3>
            <p>Concert, DJ's.......... Name everything u want</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={Image2}
            alt='Second slide'
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>Press Conference</h3>
            <p>Hold Lectures, Protest etc </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={Image3}
            alt='third slide'
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>Party with your Friends</h3>
            <p>
              Enjoy the moment, have fun, and make memories with your friends
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={Image4}
            alt='fourth slide'
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>Famous Artist</h3>
            <p>
              Signup for the event and get a chance to meet your favorite artist
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100 carousel-image'
            src={Image5}
            alt='Fifth slide'
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>Late Party Nights</h3>
            <p>
              tired from office, wanna have some fun, join us for the late-night
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Slideshow
