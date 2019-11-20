import React from 'react';

export class UserNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          User Name ({this.props.playerLabel}):
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
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