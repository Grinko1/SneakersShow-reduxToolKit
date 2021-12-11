import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import style from './Drawer.module.scss'
import { PlusOutlined, CheckOutlined, HeartOutlined } from '@ant-design/icons';
import OrderItem from './OrderItem';

const Order = () => {
    const { orders , status} = useSelector((state) => state.cart);
    console.log(orders, 'Orders');
    return (
        <>
        <h1 className="ml-50">Заказы</h1>
  { status === 'loading' ? (
          [...Array(10)].map((i, index )=> <Loader key={index} className='m-20'/> )
         
        ) : ( 
      <>
      { orders.length > 0 ?
      
     ( <div className="eachCart ml-50">
            
          {orders.map((item) => (
           
  
            <div key={item.id} >
            <OrderItem title={item.title} imageUrl={item.imageUrl} price={item.price}/> 
    
            </div>
          ))}
        </div>)
        : 
        (
          <div  className='text-center mt-50'>
              <div >
                  <img src="img/orderSmile.png" alt=""/>
              </div>
              <h1>У вас нет заказов :(</h1>
              <p>Вы ещё ничего не заказывали</p>
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

export default Order;