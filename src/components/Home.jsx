import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, addToCartFetch, addToFavoriteFetch } from '../features/cart/cartSlice';
import Card from '../components/Card/Card';
import { CloseOutlined } from '@ant-design/icons';
import Loader from './Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { sneakers, status, error } = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);
  };

  const onPlus = (item) => {
    dispatch(addToCartFetch(item));
  };
  const onfavorite = (item) => {
    dispatch(addToFavoriteFetch(item));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: " ${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="searchBlock d-flex">
          <img src="/img/search.svg" alt="" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={onChangeSearchInput}
          />
          {searchValue && (
            <CloseOutlined
              style={{ marginTop: '13px', color: 'gray', cursor: 'pointer' }}
              onClick={() => setSearchValue('')}
            />
          )}
        </div>
      </div>
      {error && <h1>Произошла ошибка : {error}</h1>}
      {status === 'loading' ? (
        [...Array(10)].map((i, index )=> <Loader key={index} className='m-20'/> )
       
      ) : (
        <div className="eachCart">
          {sneakers
            .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item) => (
              <Card
                {...item}
                key={item.id}
                id={item.id}
                name={item.title}
                price={item.price}
                img={item.imageUrl}
                onfavorite={() => onfavorite(item)}
                onPlus={() => onPlus(item)}
              />
            )
            )}
        </div>
      )}
    </div>
  );
};

export default Home;
