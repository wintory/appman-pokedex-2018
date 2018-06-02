import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Card from './Card'

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: 800,
    height: 600,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



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
      searchbox: '',
      modalIsOpen: false
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.getFromSearch(this.state.searchPokemon)
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
    this.getFromSearch(this.state.searchPokemon)
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
    if (this.state.searchPokemon === '') {
      this.setState({ pokemonResult: this.state.allPokemon })
    } else {
      // this.state.allPokemon.filter((data) => { if (data.name.equal(val) === true) { this.setState({ searchPokemon: data }) } })
    }

  }

  render() {
    console.log(this.state.pokemonResult);


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
        <footer className='footer col-12'>
          <button type="button" className="col-2 offset-5 btnadd" onClick={this.openModal}>
            +
</button>
        </footer>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <input type='text' placeholder='pokemon name' className='col-12 element' onChange={(e) => this.searchbox(e.target.value)} />
          {this.state.pokemonResult.map((data, i) => {
            if (this.state.pokeid.indexOf(data.id) === -1) {
              return (
                <div className='col-12'>
                  <br />
                  <Card img={data.imageUrl} status='false' weakness={data.weaknesses} attacks={data.attacks} addCard={this.addCard} id={data.id} hp={data.hp} Pokename={data.name} key={i + data.id} />
                </div>
              )
            }
          })}
        </Modal>

      </div >
    )
  }
}

export default App
