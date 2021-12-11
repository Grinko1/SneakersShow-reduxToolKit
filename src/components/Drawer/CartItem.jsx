import React from 'react';
import style from './Drawer.module.scss';

const CartItem = ({id, name, price, img, deleteFromCart}) => {
    return (
        <div className={style.cartItem} >
        <div
          style={{ backgroundImage: `url(${img})` }}
          className={style.cartItemImg}></div>
        <div className="mr-20 flex">
          <p className="mb-5">{name}</p>
          <b>{price}руб.</b>
        </div>

        <img onClick={deleteFromCart}
          className={style.removeBtn}
          width={15}
          height={15}
          src="/img/delete.svg"
          alt=""
        />
      </div>
    );
};

export default CartItem;