import React, { Component } from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateDough } from '../../utils';
import Result from '../Result';

const styles = theme => ({
  root: {
    padding: 16
  },
  input: {
    width: '100%'
  },
  calcButton: {
    width: '100%',
    marginBottom: 16,
    [theme.breakpoints.up('sm')]: {
      width: '48%',
      marginRight: 10,
      marginBottom: 0
    }
  },
  resetButton: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
      marginLeft: 10
    }
  },
  buttonProgress: {
    position: 'absolute',
    marginTop: 8,
    marginLeft: -150
  }
});

class Dough extends Component {
  constructor(props) {
    super(props);

    const data = JSON.parse(localStorage.getItem('Dough'));

    const {
      breadFlour,
      doughWeight,
      wholeWheatFlour,
      salt,
      hydration,
      starter,
      scale,
      resultData
    } = data || {
      breadFlour: 80,
      doughWeight: 835,
      wholeWheatFlour: 20,
      salt: 2,
      hydration: 65,
      starter: 20,
      scale: 1,
      resultData: [
        { name: 'Bread Flour (g)', value: 0 },
        { name: 'Whole Wheat Flour (g)', value: 0 },
        { name: 'Water (g)', value: 0 },
        { name: 'Salt (g)', value: 0 },
        { name: 'Starter (g)', value: 0 }
      ]
    };

    this.state = {
      breadFlour,
      doughWeight,
      wholeWheatFlour,
      isCalculating: false,
      isResetting: false,
      salt,
      hydration,
      starter,
      scale,
      resultData
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isCalculating: true });

    setTimeout(() => {
      const {
        breadFlour,
        doughWeight,
        wholeWheatFlour,
        salt,
        hydration,
        starter,
        scale,
        resultData
      } = this.state;

      let totalPercentage = breadFlour + wholeWheatFlour + salt + hydration;
      
      const { BF, WWF, W, S, starterWeight } = calculateDough(
        totalPercentage,
        scale,
        breadFlour,
        doughWeight,
        wholeWheatFlour,
        hydration,
        salt,
        starter
      );

      resultData[0].value = BF;
      resultData[1].value = WWF;
      resultData[2].value = W;
      resultData[3].value = S;
      resultData[4].value = starterWeight;

      this.setState({ isCalculating: false, resultData });

      this.props.scrollBottom();
    }, 2000);
  };

  handleReset = e => {
    this.setState({ isResetting: true });

    setTimeout(() => {
      this.setState({
        breadFlour: 80,
        doughWeight: 835,
        wholeWheatFlour: 20,
        isCalculating: false,
        isResetting: false,
        salt: 2,
        hydration: 65,
        starter: 20,
        scale: 1,
        resultData: [
          { name: 'Bread Flour (g)', value: 0 },
          { name: 'Whole Wheat Flour (g)', value: 0 },
          { name: 'Water (g)', value: 0 },
          { name: 'Salt (g)', value: 0 },
          { name: 'Starter (g)', value: 0 }
        ]
      });

      this.props.scrollTop();
    }, 2000);
  };

  render() {
    const {
      breadFlour,
      doughWeight,
      wholeWheatFlour,
      isCalculating,
      isResetting,
      salt,
      hydration,
      starter,
      scale,
      resultData
    } = this.state;

    const { classes } = this.props;
    let isFormFilled = false;

    if (breadFlour && doughWeight && wholeWheatFlour && salt && hydration && starter && scale) {
      isFormFilled = true;
    }

    localStorage.setItem(
      'Dough',
      JSON.stringify({
        doughWeight,
        wholeWheatFlour,
        salt,
        hydration,
        starter,
        scale,
        resultData
      })
    );

    return (
      <main role="main">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="dough-weight"
                name="doughWeight"
                label="Dough Weight (g)"
                variant="outlined"
                type="number"
                value={doughWeight}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="scale"
                name="scale"
                label="Scale"
                variant="outlined"
                type="number"
                value={scale}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="bread-flour"
                name="breadFlour"
                label="Bread Flour (%)"
                variant="outlined"
                type="number"
                value={breadFlour}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="whole-wheat-flour"
                name="wholeWheatFlour"
                label="Whole Wheat Flour (%)"
                variant="outlined"
                type="number"
                value={wholeWheatFlour}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="hydration"
                name="hydration"
                label="Hydration (%)"
                variant="outlined"
                type="number"
                value={hydration}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="salt"
                name="salt"
                label="Salt (%)"
                variant="outlined"
                type="number"
                value={salt}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                id="starter"
                name="starter"
                label="Starter (%)"
                variant="outlined"
                type="number"
                value={starter}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.calcButton}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isFormFilled || isCalculating}
              >
                Calculate
              </Button>
              {isCalculating && (
                <CircularProgress
                  className={classes.buttonProgress}
                  thickness={4}
                  size={28}
                />
              )}
              <Button
                className={classes.resetButton}
                type="reset"
                variant="contained"
                color="secondary"
                size="large"
                disabled={!isFormFilled || isResetting}
              >
                Reset
              </Button>
              {isResetting && (
                <CircularProgress
                  className={classes.buttonProgress}
                  thickness={4}
                  size={28}
                />
              )}
            </Grid>
          </Grid>
        </form>
        <Result resultData={resultData} />
      </main>
    );
  }
}

export default withStyles(styles)(Dough);
