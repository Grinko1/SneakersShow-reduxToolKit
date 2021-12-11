import React from 'react';
import style from '../Card/Card.module.scss'

const OrderItem = ({imageUrl, title, price}) => {
    return (
        <div className={style.card}>
       

         
        
          <img width={133} height={112} src={imageUrl} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена :</span>
              <b>{price}руб.</b>
            </div>
         
              
          </div>
      
        </div>
    );
};

export default OrderItem;