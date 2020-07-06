import React from 'react';
import Board from './Board';
import NameForm from './NameForm';

const FIRST_STEP = 0;
const LAST_STEP = 9;

function calculateWinner(squares) {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xPlayerMove: true,
            stepNumber: FIRST_STEP,
            playerOne: '',
            playerTwo: '',
        }
    }

    handleClick(i) {
        if (this.state.playerOne === '' && this.state.playerTwo === '') {
            alert("Enter Gamers Name to continue...");
            return;
        }

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xPlayerMove ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xPlayerMove: !this.state.xPlayerMove,
            stepNumber: history.length,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xPlayerMove: (step % 2) === 0,
        })
    }

    setGamerName(p1, p2) {
        console.log("Player One: " + p1);
        console.log("Player Two : " + p2);
        this.setState({
            playerOne: p1,
            playerTwo: p2,
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (

                <div class="container">
                    <div class="row" key={move}>
                        <div class="col-3" >
                            {move === 0 ? '' : (move % 2 === 0 ? this.state.playerTwo : this.state.playerOne)}
                        </div>
                        <div class="col-3">
                            <button onClick={() => this.jumpTo(move)}>{desc}</button>
                        </div>
                    </div>
                </div>
            )
        })

        let status;
        if (winner) {
            let winnerName = (winner === 'X' ? this.state.playerOne : this.state.playerTwo)
            status = "Winner is " + winnerName.toUpperCase();
        }
        else if (this.state.stepNumber == LAST_STEP)
            status = "Match Tie...";
        else
            status = "Next Player: " + (this.state.xPlayerMove ? this.state.playerOne : this.state.playerTwo);

        return (
            <div className="game">
                <div className="playerForm">
                    <NameForm handleGamerNames={(p1, p2) => this.setGamerName(p1, p2)} />
                </div>
                <div className="game-board">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game;