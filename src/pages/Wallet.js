import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  state = {
    totalField: 0,
  }

  componentDidMount() {
    const { saveCurrencies } = this.props;
    saveCurrencies();
  }

  totalSum = (expenses) => {
    const convertedArray = expenses
      .map(({ value, cotacao }) => Number(value) * Number(cotacao));
    const sum = convertedArray.reduce((acc, curr) => acc + curr);
    const { totalField } = this.state;
    this.setState({ totalField: totalField + sum });
  }

  render() {
    const { email } = this.props;
    const { totalField } = this.state;
    return (
      <section>
        <header>
          <h1 data-testid="email-field">{ email }</h1>
          <h3 data-testid="header-currency-field">BRL</h3>
          <h2 data-testid="total-field">{ totalField.toFixed(2) }</h2>
        </header>
        <ExpenseForm sumFunction={ this.totalSum } />
        <ExpenseTable />
      </section>

    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
