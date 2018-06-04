import React, { Component } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import axios from 'axios'
import Card from './Card'
import { Modal, Button } from 'antd'



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
      modalVisible: false,
      showButton: false
    }
  }

  showButton = () => {
    this.setState = ({ showButton: true })
  }

  openModal = () => {
    this.getFromSearch()
    this.setState({ modalVisible: true })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
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
    this.state.allPokemon.map((pokemon) => {
      if (pokemon.id === id) {
        console.log(this);
        this.setState({ pokedex: [...this.state.pokedex, pokemon], pokeid: [...this.state.pokeid, id] })
      }
      return id
    })
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
    axios.get('http://localhost:3030/api/cards?limit=100')
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
      this.state.allPokemon.filter((data) => { if (data.name.equal(val) === true) { this.setState({ searchPokemon: data }) } })
    }

  }

  render() {

    return (
      <div className="App body">
        <div className='container'>
          <div className='row'>
            <nav className='header'>
              <p className='textheader'>My Pokedex</p>
            </nav>
            <div className='col-12'>
            </div>
            {this.state.pokedex.map((data, i) => {
              return (
                <div className='col-6' key={i}>
                  <Card img={data.imageUrl} status='true' showButton={this.showButton} weakness={data.weaknesses} attacks={data.attacks} deleteCard={this.deleteCard} id={data.id} hp={data.hp} Pokename={data.name} key={i} />
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
          title="Add Pokemon"
          visible={this.state.modalVisible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width={800}
          height={600}
        >
          <input type='text' placeholder='pokemon name' className='col-12 element' onChange={(e) => this.searchbox(e.target.value)} />
          {this.state.pokemonResult.map((data, i) => {
            if (this.state.pokeid.indexOf(data.id) === -1) {
              return (
                <div className='col-12' key={i}>
                  <br />
                  <Card showButton={this.showButton} button={this.state.showButton} img={data.imageUrl} status='false' weakness={data.weaknesses} attacks={data.attacks} addCard={this.addCard} id={data.id} hp={data.hp} Pokename={data.name} />
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
