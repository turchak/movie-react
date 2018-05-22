import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  progress: {
    margin: 'auto',
  },
  container: {
    display: 'flex',
  },
});

const Loader = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <CircularProgress
        classes={{
          root: classes.progress,
        }}
        style={{ color: green[500] }}
        thickness={7}
      />
    </div>
  );
};

export default withStyles(styles)(Loader);
