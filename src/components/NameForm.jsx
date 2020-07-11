import React  from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core'

class NameForm extends React.Component {

    state = {
        playerOne: '',
        playerTwo: ''
    };

    handlePlayerOneChange = (e) => {
        e.preventDefault();
        this.setState({ playerOne: e.target.value });
    }   
    
    handlePlayerTwoChange = (e) => {
        e.preventDefault();
        this.setState({ playerTwo: e.target.value });
    }   

    handleSubmit = (event) => {
        alert('A name was submitted: \n player 1 : ' + this.state.playerOne + " \n player 2: " + this.state.playerTwo);
        event.preventDefault();
        this.props.handleGamerNames(this.state.playerOne, this.state.playerTwo);
    }

    render() {
        //const [classes] = useStyles();
        return (
            <form>
                <Paper elevation={4} style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs = {12}>
                            <TextField id="standard-basic" label="Player 1" value={this.state.playerOne} onChange={this.handlePlayerOneChange} />
                        </Grid>
                        <Grid item xs = {12}>
                            <TextField id="standard-basic" label="Player 2" value={this.state.playerTwo} onChange={this.handlePlayerTwoChange} />
                        </Grid>
                        <Button variant="contained" color="primary" value="Submit" onClick={this.handleSubmit}>Submit</Button>
                    </Grid>
                </Paper>
                {/* <input type="submit" value="Submit" /> */}
            </form>
        );
    }
}



export default NameForm;