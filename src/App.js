import React, { Component } from 'react';
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from './redux/index'
import Start from './containers/Start';
import MathQuiz from './containers/MathQuiz';
import './App.css';
import backgroundGIF from './assets/gif/background.gif'
import backgroundGIF2 from './assets/gif/background2.gif'
import grocery from './assets/gif/grocery.gif'
import on from './assets/sound.png'
import off from './assets/mute.png'
import { Player, ControlBar } from 'video-react';
import TempDrop from './components/tempDrag';

import Footer from './components/Footer';
import sessionData from './utils/sessionData';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
  // notPlayAudioWithVideo =
  //   <video autoPlay muted={true} loop id="bg" >
  //     <source src={grocery} type="video/mp4" />
  //   </video>

  // PlayAudioWithVideo =
  //   <video autoPlay muted={false} loop id="bg" >
  //     <source src={grocery} type="video/mp4" />
  //   </video>
  state = {
    // sound: false,
    // curr: this.notPlayAudioWithVideo
    isAuth: false
  }
  componentDidMount() {
    if (sessionData.authenticate()) {
      this.setState({ isAuth: true })
    }

  }

  gameStart = () => {
    this.props.onStartGame();
  }


  handleURL() {
    // const query = new URLSearchParams(this.props.location.search);
    // const token = query.get('id')
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get('id');

    // alert(id)
  }
  render() {
    return (
      <div className="App">

        <header className="App-header">
          {/* {this.state.curr} */}


          {this.state.isAuth ?
            <div>
              {sessionData.dif == "b" ? <img src={grocery} id="bg" alt="" /> : <img src={grocery} id="bg" alt="" />}
             
              {
                !this.props.isStarted ? (
                  <Start startPressed={this.gameStart} />
                ) : (
                  <MathQuiz {...this.props} gameStart={this.gameStart} />
                )
              }
              {/* <TempDrop /> */}
            </div>
            :
            <h1 style={{ color: "black" }}> Error 404 : URL not found!!! </h1>
          }

        </header>

        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
