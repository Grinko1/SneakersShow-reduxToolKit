import React from 'react';
import { Link } from 'react-router-dom';
import {HeartOutlined} from '@ant-design/icons'

const Header = () => {
    return (
        <header className="d-flex justify-between align-center p-40">
            
        <div className="d-flex align-center">
        <Link to='/'>
          <img width={40} height={40} src="/img/logo.png" alt="" />
          <div>

            <h3 className="text-uppercase">React Sneakers</h3>
            
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          
          
           
          </div>
          </Link>
        </div>
        
        <ul className="d-flex">
          <li className="mr-30">
              <Link to='/drawer'>
            <img width={18} height={18} src="/img/cart.svg" alt="" />
            </Link>
            <span> 1205 руб.</span>
          </li>
          <li>
            <Link to='/favorite'>
            <HeartOutlined style={{color:'gray', fontSize:'18px', marginTop:'3px', marginRight:'5px', cursor:'pointer'}}/>
            </Link>
          </li>
          <li>
            <Link to='/orders'>
            <img width={18} height={18} src="/img/user.svg" alt="" />
            </Link>
          </li>
        </ul>
      </header>
    );
};

export default Header;