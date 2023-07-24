import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
      marginRight: 11,
      marginBottom: 0
    }
  },
  resetButton: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
      marginLeft: 11
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
      initialInvestment,
      interestRate,
      wholeWheatFlour,
      calculationPeriod,
      calculationPeriodType,
      salt,
      hydration,
      starter,
      scale,
      resultData
    } = data || {
      breadFlour: 80,
      doughWeight: 835,
      initialInvestment: '',
      interestRate: '',
      wholeWheatFlour: 20,
      calculationPeriod: '',
      calculationPeriodType: 1,
      salt: 2,
      hydration: 65,
      starter: 20,
      scale: 1,
      resultData: [
        { name: 'Initial Investment', value: 0 },
        { name: 'Interest Earned', value: 0 },
        { name: 'Total', value: 0 },
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
      initialInvestment,
      interestRate,
      wholeWheatFlour,
      calculationPeriod,
      calculationPeriodType,
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
        initialInvestment,
        interestRate,
        calculationPeriodType,
        breadFlour,
        wholeWheatFlour,
        salt,
        hydration,
        resultData
      } = this.state;

      let { calculationPeriod } = this.state;
      calculationPeriod = calculationPeriod / calculationPeriodType / 1;

      //let { totalPercentage } = this.state;
      let totalPercentage = breadFlour + wholeWheatFlour + salt + hydration;
      
      const { P, I, A } = calculateDough(
        initialInvestment,
        interestRate,
        calculationPeriod
      );

      resultData[0].value = P;
      resultData[1].value = I;
      resultData[2].value = A;
      resultData[3].value = breadFlour;
      resultData[4].value = wholeWheatFlour;
      resultData[5].value = 0;
      resultData[6].value = 0;
      resultData[7].value = totalPercentage;

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
        initialInvestment: 835,
        interestRate: '',
        wholeWheatFlour: 20,
        calculationPeriod: '',
        calculationPeriodType: 1,
        isCalculating: false,
        isResetting: false,
        salt: 2,
        hydration: 65,
        starter: 20,
        scale: 1,
        totalPercentage: 0,
        resultData: [
          { name: 'Initial Investment', value: 0 },
          { name: 'Interest Earned', value: 0 },
          { name: 'Total', value: 0 },
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
      initialInvestment,
      interestRate,
      wholeWheatFlour,
      calculationPeriod,
      calculationPeriodType,
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
        initialInvestment,
        interestRate,
        wholeWheatFlour,
        calculationPeriod,
        calculationPeriodType,
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
            
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="calculation-period"
                name="calculationPeriod"
                label="Calculation Period"
                variant="outlined"
                type="number"
                value={calculationPeriod}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="calculation-period-type"
                name="calculationPeriodType"
                variant="outlined"
                select
                value={calculationPeriodType}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              >
                <MenuItem value={365}>Days</MenuItem>
                <MenuItem value={12}>Months</MenuItem>
                <MenuItem value={1}>Years</MenuItem>
              </TextField>
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
