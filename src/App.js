import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css'
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import Home from './components/Home';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchSneakers, fetchSneakersInCart, fetchSneakersInFavorite, loadOrders } from './features/cart/cartSlice';
import Favorite from './components/Favorite/Favorite';
import Order from './components/Drawer/Order';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSneakers())

  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSneakersInCart())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchSneakersInFavorite())
  }, [dispatch])
  useEffect(() => {
    dispatch(loadOrders())
  } , [dispatch])
  return (
    <Router>

    <div className="wrapper clear">
    <Header />
      <Route exact path='/drawer'>
      <Drawer />
      <Home />
      </Route>
      <Route exact path='/'>
      <Home />
      </Route>
      <Route exact path='/favorite'>
      <Favorite/>
      </Route>
      <Route exact path='/orders'>
      <Order/>
      </Route>
    

    

     
    </div>
    </Router>
  );
}

export default App;
