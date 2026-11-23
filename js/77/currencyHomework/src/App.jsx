import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";

function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v1/currencies",
        );
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const currencyList = await response.json();
        setCurrencies(currencyList);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        if (!from || !to) return;
        setRate(null);
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
        );
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const results = await response.json();
        const toRate = Object.values(results.rates)[0];
        setRate(toRate);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRates();
  }, [from, to]);



  return (
    <main className="card">
      <Header />

      <label className="field">
        <span>Amount</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <div className="row">
        <label className="field">
          <span>From</span>
          <select
            name="fromSelect"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select a currency</option>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </label>

        <span className="arrow">→</span>

        <label className="field">
          <span>To</span>
          <select
            name="toSelect"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select a currency</option>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="result">
        <p className="converted">
          {rate !== null ? `${(amount * rate).toFixed(2)} ${to}` : "—"}
        </p>
        <p className="rate">
          {rate !== null ? `1 ${from} = ${rate} ${to}` : "Pick two currencies"}
        </p>
      </div>
    </main>
  );
}

export default App;
