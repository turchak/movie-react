import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  logo: {
    display: 'flex',
    fontFamily: 'Pacifico, cursive',
    textDecoration: 'none',
    fontSize: 50,
    color: green[600],
    alignItems: 'center',
    margin: '15px 0px',
    height: 50,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 15px',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },
    '&>div:hover::before': {
      borderBottom: '2px solid #a5d6a7!important',
    },
  },
  button: {
    color: theme.palette.getContrastText(green[600]),
    marginLeft: 15,
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[400],
    },
  },
  input: {
    '&:hover': {
      borderBottomColor: green[600],
      '&::before': {
        borderBottomColor: green[600],
      },
      '&::after': {
        borderBottomColor: green[600],
      },
    },
    '&::before': {
      borderBottomColor: green[200],
    },
    '&::after': {
      borderBottomColor: green[200],
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    console.log(window.location);
    window.location.hash = `/search/${this.state.name}`;
  }

  handleChange(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.container}>
          <a href="#/" className={classes.logo}>
            Movie
          </a>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Input
              classes={{
                root: classes.input,
              }}
              placeholder="Name"
              autoComplete="false"
              label="Name"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              variant="raised"
              className={classes.button}
              onClick={this.handleClick}
            >
              Search
            </Button>
          </form>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
