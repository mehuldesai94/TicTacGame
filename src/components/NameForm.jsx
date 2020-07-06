import React from 'react';


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOne: '',
            playerTwo: ''
        };
        this.handlePlayerOneChange = this.handlePlayerOneChange.bind(this);
        this.handlePlayerTwoChange = this.handlePlayerTwoChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePlayerOneChange(event) { this.setState({ playerOne: event.target.value }); }
    handlePlayerTwoChange(event) { this.setState({ playerTwo: event.target.value }); }
    handleSubmit(event) {
        alert('A name was submitted: \n player 1 : ' + this.state.playerOne + " \n player 2: " + this.state.playerTwo);
        event.preventDefault();
        this.props.handleGamerNames(this.state.playerOne, this.state.playerTwo);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Player 1:
                    <input type="text" value={this.state.playerOne} onChange={this.handlePlayerOneChange} />
                </label>
                <br/><br/>
                <label>
                    Player 2:
                    <input type="text" value={this.state.playerTwo} onChange={this.handlePlayerTwoChange} />
                </label>
                <br/><br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


export default NameForm;