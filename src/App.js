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
      modalVisible: false,
    }
  }

  openModal = () => {
    this.getFromSearch('')
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
    this.setState({ pokemonResult: this.state.allPokemon })
    if (val === '') {
      this.setState({ pokemonResult: this.state.allPokemon })
    } else {
      this.setState({
        pokemonResult: this.state.allPokemon.filter(re => {
          let name = re.name.toLowerCase()
          if (name.indexOf(val.toLowerCase()) !== -1) {
            return re
          }
        })
      })
    }

  }

  render() {
    console.log(this.state.pokemonResult);

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
                  <Card img={data.imageUrl} status='delete' showButton={'delete'} weakness={data.weaknesses} attacks={data.attacks} deleteCard={this.deleteCard} id={data.id} hp={data.hp} Pokename={data.name} key={i} />
                </div>
              )
            })}
          </div>
        </div>
        <br />
        <br />
        <footer className='footer col-12'>
          <button type="button" className="col-2 offset-5 btnadd" onClick={this.openModal}>
            +
</button>
        </footer>

        <Modal
          visible={this.state.modalVisible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width={800}
          height={600}
          footer={[
            null, null,
          ]}
        >
          <input type='text' placeholder='pokemon name' className='col-11 element' onChange={(e) => this.getFromSearch(e.target.value)} />
          {this.state.pokemonResult.map((data, i) => {
            if (this.state.pokeid.indexOf(data.id) === -1) {
              return (
                <div className='col-12' key={i}>
                  <br />
                  <Card button={this.state.showButton} img={data.imageUrl} weakness={data.weaknesses} status='add' attacks={data.attacks} addCard={(id) => this.addCard(id)} id={data.id} hp={data.hp} Pokename={data.name} />
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
