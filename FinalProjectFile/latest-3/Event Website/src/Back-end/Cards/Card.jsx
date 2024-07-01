//making a card structure that can be use anywhere needed
import React from 'react'
import './card.css'
import ImageLink from '../../../../../wallpaper/20210512_130831.jpg'
// const Card = ({title,text,imagelink}) => {
//   return (
//     <div className="card">
//     <div className="card-image">
//       <img src={imagelink} alt={title} className="object-cover" />
//     </div>
//     <div className="card-content">
//       <h5 className="card-title">{title}</h5>
//       <p className="card-text">{text}</p>
//     </div>
//      {/* Remember to add a link which takes u to the description page */} 
//     <div className="card-actions">
//       <button className="btn">Read More</button>
//     </div>
//   </div>
//   );
// }
const Card = () => {
    return (
      <div className="card">
      <div className="card-image">
        <img src={ImageLink} alt={'HELlo'} className="object-cover" />
      </div>
      <div className="card-content">
        <h5 className="card-title">fdf</h5>
        <p className="card-text">fdfddddddfjkjk</p>
      </div>
       {/* Remember to add a link which takes u to the description page */} 
      <div className="card-actions">
        <button className="btn">Read More</button>
      </div>
    </div>
    );
  }
export default Card