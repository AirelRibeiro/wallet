import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class ExpenseForm extends React.Component {
  render() {
    const { coins } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          {' '}
          <input
            type="text"
            id="valor"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          {' '}
          <select id="moeda">
            {coins.map((coin) => <option key={ coin } value={ coin }>coin</option>)}
          </select>
        </label>
        <label htmlFor="metodo">
          Metodo de pagamento:
          {' '}
          <select id="metodo" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          {' '}
          <select id="categoria" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          {' '}
          <input
            type="text"
            id="descricao"
            data-testid="description-input"
          />
        </label>
      </form>

    );
  }
}

ExpenseForm.propTypes = {
  coins: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
