import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Card from './Card'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allPokemon: [],
      pokemonResult: [],
      pokedex: [],
      pokeid: [],
      searchPokemon: '',
      pokemonName: '',
      searchbox: ''
    }
  }

  componentDidMount() {
    this.getAllPokemon()
  }

  setData = (data) => {
    this.setState({
      allPokemon: data
    })
  }

  addCard = (id) => {

    this.state.allPokemon.filter((pokemon) => {
      if (pokemon.id === id) {
        return this.setState({ pokedex: [...this.state.pokedex, pokemon], pokeid: [...this.state.pokeid, id] })
      }
    })

    console.log(this.state.pokedex);

  }

  deleteCard = (id) => {
    this.setState({
      pokedex: this.state.pokedex.filter((data) => { if (data.id !== id) { return data } }),
      pokeid: this.state.pokeid.filter((data) => { if (data !== id) { return data } }),
    })
  }

  searchbox = (message) => {
    this.setState({
      searchPokemon: message
    })
  }

  getAllPokemon = () => {
    axios.get('http://localhost:3030/api/cards')
      .then(function (response) {
        if (response.status === 200) {
          return response.data.cards
        }
      }).then((data) => this.setState({ allPokemon: data }))
      .catch(function (error) {
        console.log(error);
      });
  }

  getFromSearch = (val) => {
    axios.get('http://localhost:3030/api/cards')
      .then(function (response) {
        if (response.data.cards) {
          return response.data.cards.filter((data) => { })
        }
      }).then((data) => this.setState({ allPokemon: data }))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {


    return (
      <div className="App">
        <div className='container'>
          <div className='row'>
            <nav className='header'>
              <p className='textheader'>My Pokedex</p>
            </nav>
            <div className='col-12'>
            </div>
            {this.state.pokedex.map((data, i) => {
              return (
                <div className='col-6'>
                  <Card img={data.imageUrl} status='true' weakness={data.weaknesses} attacks={data.attacks} deleteCard={this.deleteCard} id={data.id} hp={data.hp} Pokename={data.name} key={i} />
                </div>
              )
            })}
          </div>
        </div>
        <footer className='footer'>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            +
</button>
        </footer>
        <input type='text' placeholder='pokemon name' onChange={(e) => this.searchbox(e.target.value)} />
        {this.state.allPokemon.map((data, i) => {
          if (this.state.pokeid.indexOf(data.id) === -1) {
            return (
              <div className='col-6'>
                <Card img={data.imageUrl} status='false' weakness={data.weaknesses} attacks={data.attacks} addCard={this.addCard} id={data.id} hp={data.hp} Pokename={data.name} key={i + data.id} />
              </div>
            )
          }
        })}

      </div>
    )
  }
}

export default App
