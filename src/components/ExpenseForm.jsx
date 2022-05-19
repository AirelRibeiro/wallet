import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionSaveExpense } from '../actions';
import apiRequest from '../apiRequest';

class ExpenseForm extends React.Component {
  state = {
    value: '',
    currency: '',
    method: '',
    tag: '',
    description: '',
  }

  saveInput = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  save = async (moeda) => {
    const expense = this.state;
    const { expenses, saveExpense, sumFunction } = this.props;
    const quoteData = await apiRequest();
    const data = Object.entries(quoteData);
    const cotacao = data.find((coin) => coin[0] === moeda);
    const amount = { ...expense, cotacao: cotacao[1].ask };
    const id = expenses.length;
    saveExpense({ id, ...expense, exchangeRates: quoteData });
    sumFunction([amount]);
    this.setState({ value: '' });
  }

  render() {
    const { coins } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            type="text"
            id="value"
            data-testid="value-input"
            onChange={ this.saveInput }
            value={ value }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          {' '}
          <select id="currency" onChange={ this.saveInput } value={ currency }>
            {coins.map((coin) => <option key={ coin } value={ coin }>{coin}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          Metodo de pagamento:
          {' '}
          <select
            id="method"
            data-testid="method-input"
            onChange={ this.saveInput }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          {' '}
          <select
            id="tag"
            data-testid="tag-input"
            onChange={ this.saveInput }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            type="text"
            id="description"
            data-testid="description-input"
            onChange={ this.saveInput }
            value={ description }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.save(currency) }
        >
          Adicionar despesa

        </button>
      </form>

    );
  }
}

ExpenseForm.propTypes = {
  coins: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(),
  saveExpense: propTypes.func.isRequired,
  sumFunction: propTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(actionSaveExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
