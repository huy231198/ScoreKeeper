import React, { Component } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
import logo from './logo.svg';
import Message from './Message';
import Button from './Button';
import NewGame from './Components/NewGame';
import Header from './Components/Header';
import './App.css';
import PlayGame from './Components/PlayGame';
import Loading from './Components/Loading';
import { ROOT_API } from './Statics';

class App extends Component {
  state = {
    showImg: true,
    message: "Hello World",
    num: 0,
    game: null,
    loading: true
  }

  componentWillMount() {
    console.log("Will mount");
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ showImg: false, message: "Hahahaha" });
    // }, 2000)
    if (window.location.pathname) {
      const pathParams = window.location.pathname.slice(1).split("/");
      if (pathParams[1] && pathParams[0] === "game") {
        const questionId = pathParams[1];
        axios({
          url: `${ROOT_API}/api/game/${questionId}`,
          method: "GET"
        }).then(response => {
          console.log(response.data);
          if (response.data.success) {
            setTimeout(() => {
              this.setState({ game: response.data.game, loading: false })
            }, 2000)
          }
        }).catch(error => {
          this.setState({ game: null, loading: false });
          console.log(error)
        });
      } else {
        this.setState({ loading: false, game: null });
      }
    }
  }
  addNewRow = () => {
    const { game } = this.state;
    game.scores = game.scores.map(score => [...score, 0]);
    this.setState({ loading: true });
    axios({
      method: "PUT",
      url: `${ROOT_API}/api/game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      console.log(response);
      this.setState({ loading: false, game });
    }).catch(err => {
      console.log(err);
      this.setState({ loading: false, game });
    })
  }
  updateScore = (score, playerIndex, rowIndex) => {
    const { game } = this.state;
    game.scores[playerIndex][rowIndex] = score;
    // this.setState({ loading: true });
    axios({
      method: "PUT",
      url: `${ROOT_API}/api.game`,
      data: {
        gameId: game._id,
        scores: game.scores
      }
    }).then(response => {
      console.log(response);
      this.setState({ game });
    }).catch(err => {
      console.log(err);
      // this.setState({ loading: false, game });
    });
    this.setState({ game });

  }

  render() {
    const { game, loading } = this.state;
    return (
      <Container className="App">
        <Header />
        {loading ? (
          <div className="text-center">
            <Loading />
          </div>) : (game ?
            <PlayGame game={game} addNewRow={this.addNewRow} updateScore={this.updateScore} /> :
            <NewGame toggleLoading={(loading) => { this.setState({ loading }) }} />
          )
        }
      </Container>
    );
  }
}

export default App;