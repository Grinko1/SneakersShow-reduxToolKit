import React from 'react';
import { Link } from 'react-router-dom';



const Info = ({image, title, description}) => {
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <Link to='/'>
      <button  className="greenButton2">
        <img src="img/arrow.svg" alt="Arrow" className='mr-15'/>
        Вернуться назад
      </button>
      </Link>
    </div>
    );
};

export default Info;