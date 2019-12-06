import React from 'react';

import classes from './username-form.module.css';

export class UserNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ''
    };
  }

  changeHandler = (event) => {
    this.setState({value: event.target.value});
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <form
        className={classes.form}
        onSubmit={this.submitHandler}
      >
        <label>
          {this.props.children}
          <input
            type='text'
            value={this.state.value}
            onChange={this.changeHandler}
          />
        </label>
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}