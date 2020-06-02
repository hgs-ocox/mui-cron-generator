import React, { Component } from 'react';
import Cron from './lib';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        value:['0','0','0/11','1/1','*','?','*']
      };
  }

  render() {
    return (<div>
      <Cron
        style={{width:'50vw'}}
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        />
    </div>)
  }
}

export default App;
