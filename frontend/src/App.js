import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import MealView from './views/MealView';
import CartView from './views/CartView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import ShippingView from './views/ShippingView';
import PaymentView from './views/PaymentView';
import PlaceOrderView from './views/PlaceOrderView';
import OrderView from './views/OrderView';



const App = () => {
  return (
    <Router>
       <div className="bg-moon-gray">
        <Header />
        <main className='py-3'>
          <Container>
              <Route path='/signin' component={LoginView} exact/>
              <Route path='/register' component={RegisterView} exact/>
              <Route path='/' component={HomeView} exact/>
              <Route path='/meal/:id' component={MealView} exact/>
              <Route path='/cart/:id?' component={CartView} exact/>
              <Route path='/profile' component={ProfileView} exact/>
              <Route path='/shipping' component={ShippingView} exact/>
              <Route path='/payment' component={PaymentView} exact/>
              <Route path='/placeorder' component={PlaceOrderView} exact/>
              <Route path='/order/:id' component={OrderView} exact/>

          </Container>
        </main>
        <Footer/>
      </div>
    </Router>
    );
  }

export default App;
