import React, { Component } from 'react'

export default class Card extends Component {

    render() {


        return (
            <div className='card'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <img alt={this.props.id} className='cardimg' src={this.props.img} style={{ width: 100 }} />
                        </div>
                        <div className='col-6'>
                            <span>name : {this.props.Pokename}</span>
                            <br />
                            <span>hp : {this.props.hp >= 100 ? 100 : 0}</span>
                            <br />
                            <span>str : </span>
                            <br />
                            <span>weak : </span>
                            <br />
                            <span>damage : </span>
                            <br />
                            {/* <span>weak : {this.props.weakness}</span> */}
                        </div>
                        {this.props.status === 'false' ? <button className='col-2' onClick={() => this.props.addCard(this.props.id)}>
                            add
                        </button> : <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.deleteCard(this.props.id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>}
                    </div>
                </div>
            </div >
        )
    }
}