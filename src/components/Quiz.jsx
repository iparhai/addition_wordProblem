import React from "react";
import AnswerModal from "./AnswerModal";
import { MathHelper } from "../utils";
import paperBag from "../assets/paperBag.png"
import grapes from "../assets/grapes.png"
import './Quiz.css'
import './Bubble.css'
import sessionData from "../utils/sessionData.js"
import Drop from "./drag.jsx";
import ReactTypingEffect from 'react-typing-effect';
import typingSound from '../assets/sounds/typing.mp3';



class Quiz extends React.Component {
  _isMounted = false;
  _secondsIntervalRef;

  state = {
    problem: "",
    wordProblem: "",
    firstNumber: 0,
    secondNumber: 0,
    symbol: "",
    answer: 0,
    modal: "",
    modalShowing: false,
    streaks: 0,
    problemTemplates: [],
    randomImage: "",
    typingClick: new Audio(typingSound)

  };

  earnLife = () => {
    this.props.onEarnLife();
    this.showModal("success", "STREAK!! You won a life ♥");
    this.setState({
      streaks: 0
    });
  };

  correctAnswer = () => {
    if (this.state.streaks > 2) {
      this.earnLife();
    } else {
      this.showModal("success");
    }

    this._isMounted && this.props.onCorretAnswer();
    this.setState(state => {
      return {
        streaks: state.streaks + 1
      };
    });

    this.nextProblem();
  };

  componentDidMount() {
    this._isMounted = true;
    this.getProblem();

    // this.answerInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.lifes < 1) {
      this.props.onEndGame(this.state.points);
      return false;
    }
    return nextProps.lifes > -1;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  wrongAnswer = () => {
    this._isMounted && this.props.onWrongAnswer();
    this.setState({
      streaks: 0
    });
    this.showModal("error", MathHelper.solve(this.state.problem).toString());
    this.nextProblem();
  };

  nextProblem = () => {
    setTimeout(() => {
      this.getProblem();
      this._isMounted &&
        this.setState({
          modalShowing: false,
          answer: 0
        });
      if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
    }, 2500);
  };

  evaluateProblem = () => {
    const answer = MathHelper.solve(this.state.problem);
    const attemptedAnswer = this.state.answer
    sessionData.setData(this.state.firstNumber + "!" + this.state.secondNumber, this.state.wordProblem, attemptedAnswer, answer)

    if (MathHelper.compare(this.state.problem, this.state.answer)) {
      return this.correctAnswer();
    }
    return this.wrongAnswer();
  };

  keyingUp = ev => {
    if (ev.key === "Enter") {
      this.evaluateProblem();
    }
    const val = ev.target.value;

    this.setState({
      answer: Number(val.match(/((-?)\d+)/g)) // accept just numbers and the minus symbol
    });

  };

  showModal = (type, text) => {
    this.setState({
      modal: <AnswerModal type={type} text={text} />,
      modalShowing: true
    });
  };

  getProblem = () => {
    const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    //const newProblemSet = MathHelper.generateSubtractionProblem(this.props.points);
    this._isMounted &&
      this.setState({
        problem: newProblemSet.problem,
        firstNumber: newProblemSet.firstNumber,
        secondNumber: newProblemSet.secondNumber,
        symbol: newProblemSet.symbol,
        problemTemplates: [{
          pt: "Ali went to the shopping mart. He bought  " + newProblemSet.firstNumber + " bananas and " + newProblemSet.secondNumber + " mangoes. How many items did he buy altogether?",
          ptImage: paperBag
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        },
        {
          pt: "Anya eats " + newProblemSet.firstNumber + " grapes while Zamia Eats  " + newProblemSet.secondNumber + " grapes. How many grapes did Zamia and Anya eat altogether?",
          ptImage: grapes
        }
        ]
      }, () => {
        const randomTemplate = this.getRandomProblemTemplate()
        this.setState({
          wordProblem: randomTemplate.pt,
          randomImage: randomTemplate.ptImage
        });
      });
  };
  getRandomProblemTemplate = () => {
    return this.state.problemTemplates[MathHelper.getRandomInt(0, this.state.problemTemplates.length - 1)]
  }


  render() {
    return (
      <section className="show-up">

        <div>
          {this.state.modalShowing ? (
            this.state.modal
          ) : (

            <div >
              {/* <Hints currentProblem={this.state.wordProblem}/> */}
              <div class="thought " style={{ color: "white", width: "85%", marginLeft: "-18%" }} ref={this.wrapperRef} >
                <ReactTypingEffect
                  text={this.state.wordProblem}
                  // cursorRenderer={cursor => <h1>{cursor}</h1>}
                  speed={70}
                  eraseSpeed={70}
                  eraseDelay={10000000}
                  displayTextRenderer={(text, i) => {
                    return (
                      <h3>

                        {text.split('').map((char, i) => {
                          const key = `${i}`;
                          if (i == 0) this.state.typingClick.play()
                          if (char == '?') this.state.typingClick.pause()
                          return (
                            <span
                              key={key}

                            >{char}</span>
                          );
                        })
                        }
                      </h3>
                    );
                  }}
                />
                {/* <h4>{this.state.wordProblem}</h4> */}
              </div>
              {/* <div class="container">
                <img src={bubble} style={{width : "100%"}} alt="" />
                <div class="centered">{this.state.wordProblem}</div>
              </div> */}
              {/* <div className="box">
                //<div >{this.state.wordProblem}</div>
                <img src={bubble} alt="" style={{maxWidth: "100%", maxHeight: "100%"}}/>
                <div class="text">
                  <h1>{this.state.wordProblem}</h1>
                </div>
              </div> */}

              {/* <ReactTypingEffect
                        text={["Today we will be solving some fun Math Problems!!!"]}
                        cursorRenderer={cursor => <h1>{cursor}</h1>}
                        speed={70}
                        eraseSpeed={70}
                        eraseDelay={200}
                        displayTextRenderer={(text, i) => {
                            return (
                                <h3>
                                    {text.split('').map((char, i) => {
                                        const key = `${i}`;
                                        return (
                                            <span
                                                key={key}
                                                style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                            >{char}</span>
                                        );
                                    })}
                                </h3>
                            );
                        }}
                    /> */}

              {/* <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br /> */}
              <div >
                <Drop incCount={() => { this.setState({ answer: this.state.answer + 1 }) }} decCount={() => { this.setState({ answer: this.state.answer - 1 }) }} count={this.state.answer} img={this.state.randomImage} evaluateProblem={this.evaluateProblem} />
              </div>
              <button className="btn fourth answerButton" onClick={this.evaluateProblem}> {this.state.answer} </button>

            </div>
          )}
        </div>
      </section>

    );
  }
}

export default Quiz;
