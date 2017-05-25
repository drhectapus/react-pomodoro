import React, { Component } from 'react';

import BreakLength from './break_length';
import WorkLength from './work_length';
import Timer from './timer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: 25,
      breaktime: 5,
      secs: '00',
      started: false,
      switchToBreak: false
    };
    this.minusBreak = this.minusBreak.bind(this);
    this.addBreak = this.addBreak.bind(this);
    this.minusWork = this.minusWork.bind(this);
    this.addWork = this.addWork.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
    this.reset = this.reset.bind(this);
    this.timer;
    this.initialWork;
    this.initialBreaktime;
  }

  minusBreak() {
    const currentBreak = this.state.breaktime;
    if (currentBreak > 0) {
      this.setState({ breaktime: currentBreak - 1 });
    }
  }

  addBreak() {
    const currentBreak = this.state.breaktime;
    this.setState({ breaktime: currentBreak + 1 });
  }

  minusWork() {
    const currentWork = this.state.work;
    if (currentWork > 0) {
      this.setState({ work: currentWork - 1 });
    }
  }

  addWork() {
    const currentWork = this.state.work;
    this.setState({ work: currentWork + 1 });
  }

  countdown() {
    const currentSecs = this.state.secs;
    const currentWork = this.state.work;
    const currentBreak = this.state.breaktime;
    const { switchToBreak } = this.state;

    if (currentSecs > 10) {
      this.setState({ secs: currentSecs - 1});
    }
    else if (currentSecs <= 10 && currentSecs > 0) {
      this.setState({ secs: ('0' + (currentSecs - 1)) });
    }
    else if (currentSecs == 0) {
      if (!switchToBreak) {
        if (currentWork > 0) {
          this.setState({
            secs: 59,
            work: currentWork - 1
          });
        }
        else if (currentWork == 0) {
          this.setState({
            secs: 59,
            work: this.initialWork,
            breaktime: currentBreak - 1,
            switchToBreak: true
          });
        }
      }
      else if (switchToBreak) {
        if (currentBreak > 0) {
          this.setState({
            secs: 59,
            breaktime: currentBreak - 1
          });
        }
        else if (currentBreak == 0) {
          this.setState({
            secs: 59,
            work: currentWork - 1,
            breaktime: this.initialBreaktime,
            switchToBreak: false
          });
        }
      }

    }
  }

  startTimer() {
    const { started } = this.state;

    if (!started) {
      this.timer = setInterval(this.countdown, 1000);
      this.setState({ started: true });
      document.getElementById('reset').style.visibility = 'hidden';
      this.initialWork = this.state.work;
      this.initialBreaktime = this.state.breaktime;
    }
    else {
      clearInterval(this.timer);
      this.setState({ started: false });
      document.getElementById('reset').style.visibility = 'visible';
    }
  }

  reset() {
    this.setState({
      work: this.initialWork,
      breaktime: this.initialBreaktime,
      secs: '00',
      started: false,
      switchToBreak: false
    });
  }

  render() {
    console.log('initial work:', this.initialWork);
    return(
      <div className='container'>
        <h1>Pomodoro Clock</h1>
        <div className='incrementers'>
          <BreakLength
            breaktime={this.state.breaktime}
            minusBreak={this.minusBreak}
            addBreak={this.addBreak}
          />
          <WorkLength
            work={this.state.work}
            minusWork={this.minusWork}
            addWork={this.addWork}
          />
        </div>
        <Timer
          breaktime={this.state.breaktime}
          work={this.state.work}
          secs={this.state.secs}
          startTimer={this.startTimer}
          switchToBreak={this.state.switchToBreak}
        />
        <button
          className='btn btn-danger'
          id='reset'
          onClick={this.reset}
        >
          Reset
        </button>
        <div className='footer'>
          Source code on <a href='https://github.com/drhectapus/react-pomodoro'>Github</a>
        </div>
      </div>
    )
  }
}
