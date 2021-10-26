import React, {Component} from 'react';
import SearchBox from '../components/SearchBox';
import ItemList from '../components/ItemList';
import { meals } from '../meals';
import Scroll from '../components/Scroll';
import './App.css'


class App extends Component {
    constructor(){
      super();
      this.state = {
        meals: [],
        searchfield: ''
    }
  }

  componentDidMount(){
    this.setState({meals: meals})
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value });
  }

  render(){
    const {meals, searchfield} = this.state;
    const filteredeMeals = meals.filter(meal => {
      return meal.metadata.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !meals.length ?
    <h1> Loading </h1> :
    (
      <div>
      <div className = 'tc'>
        <h1 className = 'f-subheadline s-8'> VAL-U BOX </h1>
        <SearchBox searchChange={this.onSearchChange}/>
      </div>
      <Scroll>
      <ItemList meals={filteredeMeals}/>
      </Scroll>
      </div>
    );
  }
}

export default App;
