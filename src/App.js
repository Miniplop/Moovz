import React, { Component } from 'react';
import request from 'superagent';
import { values } from 'lodash';
import './App.css';

const styles = {
  fullWidth: {
    width: '100%',
    maxWidth: 500,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {listItem: []};
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    return request.get('https://cropchat-50ff7.firebaseio.com/cat.json')
      .then(data => {
        this.setState({ listItem: values(data.body) });
      });
  }

  renderList = () => (
    this.state.listItem.map((item, index) => (
        <div style={styles.fullWidth} key={index}>
          <img style={styles.fullWidth} src={item.url} alt="hello"/>
          <div>{item.comment}</div>
        </div>
      )
    )
  );

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          {this.state.listItem.length > 0 && this.renderList()}
        </div>
      </div>
    );
  }
}

export default App;
