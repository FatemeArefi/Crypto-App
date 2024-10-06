import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "./Table.module.css";

const TableRow = ({ coin, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    current_price,
    price_change_percentage_24h: price_change,
    currency,
  } = coin;

  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };
  const formatPrice = (amount, currency) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    } else if (currency === "JPY") {
      return `¥${amount.toLocaleString()}`;
    } else if (currency === "EUR") {
      return `€${amount.toLocaleString()}`;
    }
    return amount;
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="Coin-image" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{formatPrice(current_price, currency)}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};

function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;
