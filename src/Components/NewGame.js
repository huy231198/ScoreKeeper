import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import { ROOT_API } from '../Statics';

export default class NewGame extends Component {
    state = {
        player1: '',
        player2: '',
        player3: '',
        player4: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { toggleLoading } = this.props;
        toggleLoading(true);
        console.log(this.state);
        const newGame = {
            players: Object.keys(this.state).map(key => this.state[key]),
            scores: [[], [], [], []]
        }
        axios({
            url: `${ROOT_API}/api/game`,
            method: "POST",
            data: newGame
        }).then(response => {
            if (response.data.success) {
                window.location.href = `/game/${response.data.game._id}`
            }
        }).catch(error => {
            toggleLoading(false);
            console.log(error)
        })
    }

    handleInputChange = (event) => {
        // console.log(event.target);
        // console.log(event.target.name);
        // console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input name="player1" placeholder="Player 1 name" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player2" placeholder="Player 2 name" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player3" placeholder="Player 3 name" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Input name="player4" placeholder="Player 4 name" onChange={this.handleInputChange} />
                </FormGroup>
                <Button>Create new game</Button>
            </Form>
        )
    }
}
