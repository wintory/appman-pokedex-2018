import React, { Component } from 'react'
import happyimg from './cute.png'

export default class Card extends Component {

    getDamage = () => {
        let dm = 0
        if (this.props.attacks !== undefined) {
            this.props.attacks.map(att => {
                if (att.damage.indexOf('+') === -1 && att.damage.indexOf('×') === -1 && att.damage !== '') {
                    dm += Number.parseInt(att.damage)
                }
            })
        }
        return dm
    }

    getHappy = (hp, str, weak, damage) => {
        let hpp = Math.ceil(((hp / 10) + (damage / 10) + 10 - (weak / 10)) / 5)
        let result = []
        for (let i = 0; i <= hpp; i++) {
            result.push('img')
        }
        return result
    }

    render() {

        const hp = this.props.hp === undefined || this.props.hp === '' || this.props.hp === 'None' ? 0 : this.props.hp >= 100 ? 100 : this.props.hp
        const str = this.props.attacks === undefined ? 0 : Object.keys(this.props.attacks).length * 50
        const weak = this.props.weakness === undefined ? 0 : 100
        const damage = this.getDamage()
        const happy = this.getHappy(hp, str, weak, damage)

        return (
            <div className='card' >
                <div className='row body'>
                    <div className='col-4'>
                        <img alt={this.props.id} className='cardimg' src={this.props.img} style={{ width: '100%' }} />
                    </div>
                    <div className='col-6'>
                        <div className='form-inline'>
                            <div className='col-8 pokemonName'>
                                {this.props.Pokename}
                            </div>
                        </div>
                        <br />
                        <div className='form-inline'>
                            <p className='col-4'>HP </p>
                            <div className='col-8'>
                                <div className="w3-border" style={{ backgroundColor: '#e4e4e4', borderRadius: 100 }}>
                                    <div className="w3-grey " style={{ height: '20px', width: hp + '%', backgroundColor: '#f3701a', borderRadius: 100 }}></div>
                                </div>
                            </div>
                        </div>
                        <div className='form-inline'>
                            <p className='col-4'>STR </p>
                            <div className='col-8'>
                                <div className="w3-border" style={{ backgroundColor: '#e4e4e4', borderRadius: 100 }}>
                                    <div className="w3-grey " style={{ height: '20px', width: str + '%', backgroundColor: '#f3701a', borderRadius: 100 }}></div>
                                </div>
                            </div>
                        </div>
                        <div className='form-inline'>
                            <p className='col-4'>WEAK </p>
                            <div className='col-8'>
                                <div className="w3-border" style={{ backgroundColor: '#e4e4e4', borderRadius: 100 }}>
                                    <div className="w3-grey " style={{ height: '20px', width: weak + '%', backgroundColor: '#f3701a', borderRadius: 100 }}></div>
                                </div>
                            </div>
                        </div>
                        {Object.keys(happy).map(i => <img key={i} src={happyimg} style={{ width: '15%', marginLeft: '3%' }} />)}
                        <br />
                    </div>
                    {this.props.button}
                    <div className='col-2 '>
                        {this.props.status === 'add' ? <button className=' addbutton' onClick={() => this.props.addCard(this.props.id)}>
                            Add
                        </button> : <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.deleteCard(this.props.id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>}
                    </div>
                </div>

            </div >
        )
    }
}