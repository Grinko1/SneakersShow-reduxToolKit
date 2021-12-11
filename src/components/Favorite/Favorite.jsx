import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Card/Card.module.scss';
import { PlusOutlined, CheckOutlined, HeartOutlined } from '@ant-design/icons';
import { addToCartFetch, fetchRemoveFromFavorite } from '../../features/cart/cartSlice';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const Favorite = () => {
  const { favorite , status} = useSelector((state) => state.cart);
  const [isAdded, setIsAdded] = useState(false)
  const dispatch = useDispatch();
  console.log(favorite, 'favorite');

  const onPlus = (item) => {
    dispatch(addToCartFetch(item));
    setIsAdded(!isAdded)
  };
  const onDelete = (id) => {
      dispatch(fetchRemoveFromFavorite(id))
  }
  return (
    <>
      <h1 className="ml-50">Избранное</h1>
{ status === 'loading' ? (
        [...Array(10)].map((i, index )=> <Loader key={index} className='m-20'/> )
       
      ) : ( 
    <>
    { favorite.length > 0 ?
    
   ( <div className="eachCart ml-50">
          
        {favorite.map((item) => (
         

          <div key={item.id} className={style.card}>
            <div className={style.favorite}>
              <HeartOutlined style={{ fontSize: '20px', color: 'red' }}  onClick={() => onDelete(item.id)}/>
            </div>
            <img width={133} height={112} src={item.imageUrl} alt="" />
            <h5>{item.title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена :</span>
                <b>{item.price}руб.</b>
              </div>

              <div className={style.plus}>
                
                {/* {
                    isAdded ? <CheckOutlined  style={{fontSize: '20px', color:'green', fontWeight:'600'}} /> : */}
                            
                <PlusOutlined style={{ fontSize: '20px' }} onClick={() => onPlus(item)} />
                {/* // } */}
              </div>
            </div>
          </div>
        ))}
      </div>)
      : 
      (
        <div  className='text-center mt-50'>
            <div >
                <img src="/img/favoriteSmile.png" alt=""/>
            </div>
            <h1>Избранного нет :(</h1>
            <p>Вы ничего не добавляли в избранное</p>
            <Link to='/'>
            <button style={{width:'300px', marginBottom:'100px'}} className="greenButton2 ">
        <img src="img/arrow.svg" alt="Arrow" className='mr-15'/>
        Вернуться назад
      </button>
      </Link>
        </div>
      )
      }
      </>
      )}
    </>
  );
};

export default Favorite;
