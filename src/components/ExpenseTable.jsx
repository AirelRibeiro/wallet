import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {expenses
          .map(({ id, description, tag, method, currency, value, exchangeRates }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ (Number(exchangeRates[currency].ask).toFixed(2))}</td>
              <td>
                { (Number(exchangeRates[currency].ask) * Number(value))
                  .toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
      </table>

    );
  }
}

ExpenseTable.propTypes = {
  expenses: propTypes.arrayOf(),
};

ExpenseTable.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);
