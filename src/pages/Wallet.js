import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, actionDeleteExpense } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import '../style/Wallet.css';
import coins from '../images/coins.png';

class Wallet extends React.Component {
  state = {
    totalField: 0,
  }

  componentDidMount() {
    const { saveCurrencies, expenses } = this.props;
    saveCurrencies();
    this.totalSum(expenses);
  }

  totalSum = (expenses) => {
    const convertedArray = expenses
      .map(({ value, currency, exchangeRates }) => Number(value) * (
        Number(exchangeRates[currency].ask)));
    const sum = convertedArray.length === 0
      ? 0 : convertedArray.reduce((acc, curr) => acc + curr);
    this.setState({ totalField: sum });
  }

  deletExpense = (idToDelete, currency, value) => {
    const { expenses, deleteExpense } = this.props;
    const newArrayOfExpenses = expenses.filter(({ id }) => id !== idToDelete);
    const { ask } = expenses
      .find(({ id }) => id === idToDelete).exchangeRates[currency];
    const total = Number(ask) * Number(value);
    deleteExpense(newArrayOfExpenses);
    const { totalField } = this.state;
    this.setState({ totalField: totalField - total });
  }

  render() {
    const { email } = this.props;
    const { totalField } = this.state;
    return (
      <section className="wallet">
        <header>
          <div className="left">
            <img src={ coins } alt="wallet" />
            <h2 data-testid="total-field">{ totalField.toFixed(2) }</h2>
          </div>
          <h1 data-testid="header-currency-field">Moeda - BRL</h1>
          <h1 data-testid="email-field" className="email">{`Usuário - ${email}`}</h1>
        </header>
        <ExpenseForm sumFunction={ this.totalSum } />
        <ExpenseTable deletFunc={ this.deletExpense } />
      </section>

    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencies: () => dispatch(fetchCurrencies()),
  deleteExpense: (expenses) => dispatch(actionDeleteExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
