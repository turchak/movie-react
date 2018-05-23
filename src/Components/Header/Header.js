import './Header.css';
import React, { Component } from 'react';
// import Logo from '../../img/movie-logo.png';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  logo: {
    display: 'flex',
    fontFamily: 'Pacifico, cursive',
    textDecoration: 'none',
    fontSize: 50,
    color: green[200],
    alignItems: 'center',
    margin: '15px 0px',
    width: 100,
    height: 50,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1280,
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  button: {
    color: theme.palette.getContrastText(green[600]),
    marginLeft: 15,
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  input: {
    '&:hover': {
      borderBottomColor: green[200],
      '&::before': {
        borderBottomColor: green[200],
      },
    },
    '&::after': {
      borderBottomColor: green[200],
    },
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.header}>
        <div className={classes.container}>
          <a href="/#" className={classes.logo}>
            Movie
          </a>
          {/* <img src={Logo} alt="Logo" className={classes.logo} /> */}
          <FormControl className={classes.form}>
            <Input
              classes={{
                root: classes.input,
              }}
              placeholder="Name"
              autoComplete="false"
              // margin="normal"
              label="Name"
            />
            <Button variant="raised" className={classes.button}>
              Search
            </Button>
          </FormControl>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(Header);
