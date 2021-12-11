import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import style from './Drawer.module.scss';
import {completeOrder, fetchRemoveFromCart} from '../../features/cart/cartSlice'
import Info from '../Info';

const Drawer = () => {
  const  {cartItem, orders}  = useSelector((state) => state.cart);
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const dispatch = useDispatch()
  console.log(cartItem, 'cart');

  console.log(isOrderComplete);
  const deleteFromCart = (id) => {
    dispatch(fetchRemoveFromCart(id))
}

const handleOrder = (cartItem) => {
  dispatch(completeOrder(cartItem))
}
  return (
    <div className={style.overlay}>
      <div className={style.drawer}>
        <h2 className="mb-30 d-flex align-center justify-between">
          Корзина{' '}
          <Link to="/">
            <img className="removeBtn  cu-p" width={15} height={15} src="/img/delete.svg" alt="" />
          </Link>
        </h2>

       { cartItem.length > 0 ? 
        (<> <div className={style.items}>
          {cartItem.map((item) =><CartItem 
          key={item.id} 
          id={item.id} 
          name={item.title} 
          price={item.price} 
          img={item.imageUrl}  
          deleteFromCart={() => deleteFromCart(item.id)} 
           />)}
        </div>
        <div className={style.cartTotalBlock}>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 489 руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>1450 руб.</b>
            </li>
          </ul>
          
          <button className={style.greenButton} onClick={() =>handleOrder(cartItem)}>
            Оформить заказ
            <img src="/img/next.svg" alt="" />
          </button>
          
        </div>
        </>)
        :(  orders.length > 0 ?
          <Info
          title={ 'Заказ оформлен!'}
          description={ `Ваш заказ #${12} скоро будет передан курьерской доставке`
            
          }
          image={'img/complete-order.jpg'}
        /> 
        :  <Info
        title={ 'Корзина пустая'}
        description={ 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
        }
        image={ 'img/empty-cart.jpg'}
      /> 
        )}
      </div>
    </div>
  );
};

export default Drawer;
