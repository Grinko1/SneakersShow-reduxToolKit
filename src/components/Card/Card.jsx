import React, { useState } from 'react';
import style from './Card.module.scss'
import{PlusOutlined, CheckOutlined, HeartOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { fetchRemoveFromFavorite } from '../../features/cart/cartSlice';


const Card = ({id, title, imageUrl, price, onPlus, onfavorite}) => {
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const dispatch = useDispatch()
 

 

  const onClickPlus = () => {
    onPlus()
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onfavorite()
    setIsFavorite(!isFavorite)
  }
  const onDelete = (id) => {
    dispatch(fetchRemoveFromFavorite(id))
}
 
 
    return (
        <div className={style.card}>
       

         
        <div className={style.favorite}  >

           {
             isFavorite ? <HeartOutlined style={{fontSize: '20px', color:'red'}} onClick={() => setIsFavorite(!isFavorite)} /> : <HeartOutlined style={{fontSize: '20px'}}  onClick ={onClickFavorite} />
           }
            
            </div>
          <img width={133} height={112} src={imageUrl} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена :</span>
              <b>{price}руб.</b>
            </div>
         
              <div className={style.plus}  >
                {
                  isAdded ?  <CheckOutlined  style={{fontSize: '20px', color:'green', fontWeight:'600'}} /> :
                     <PlusOutlined onClick={onClickPlus} style={{fontSize: '20px'}} /> 
                     
                }
            
              
              </div>
          </div>
      
        </div>
    );
};

export default Card;