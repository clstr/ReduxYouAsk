import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../store/Counter'
import { Button, ButtonGroup, Fade } from 'reactstrap';

const Counter = (props) => (
  <Fade>
    <h1>Counter</h1>

    <p>This is a simple example of a React component.</p>

    <p>Current count: <strong>{props.count}</strong></p>
    <ButtonGroup size="lg">
      <Button onClick={props.increment}><span role={"img"} aria-label={"up arrow"}>⬆️</span>Increment</Button>
      <Button onClick={props.decrement}><span role={"img"} aria-label={"down arrow"}>⬇️</span> Decrement</Button>
    </ButtonGroup>
  </Fade>
);

export default connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter)
