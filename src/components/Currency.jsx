import "../css/currency.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_Bv7REyJND2OmM5rXX5sdav1SelERhwmlqJCLrBN7";

function Currency() {
  const [amount, setAmount] = useState(1); //giren değer
  const [fromCurrency, setFromCurrency] = useState("USD"); // giriş para birimi
  const [toCurrency, setToCurrency] = useState("TRY"); //çıkan para birimi
  const [result, setResult] = useState(0); // çıkış değeri

  const exchange = async () => {
    //bana giriş değerine göre tüm birimlerdeki değerleri getir.
    //https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Bv7REyJND2OmM5rXX5sdav1SelERhwmlqJCLrBN7&base_currency=EUR
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
    );
    //giriş değerine göre gelen birim değerlerinden çıkacak para biriminin değerini bul
    const result = (response.data.data[toCurrency] * amount).toFixed(2);
    setResult(result);
  };

  return (
    <div className="currency-div">
      <div
        style={{
          fontFamily: "ariel",
          color: "white",
          backgroundColor: "rgb(60, 97, 4)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h3>DÖVİZ KURU UYGULAMASI</h3>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="amount"
        />

        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from-currency-option"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>TRY</option>
        </select>

        <FaRegArrowAltCircleRight
          style={{
            fontSize: "25px",
            color: "green",
            marginRight: "10px",
          }}
        />
        <select
          onChange={(e) => setToCurrency(e.target.value)}
          className="to-currency-option"
        >
          <option>TRY</option>
          <option>EUR</option>
          <option>USD</option>
        </select>
        <input
          value={result}
          onChange={(e) => setResult(e.target.value)}
          type="number"
          className="result"
        />
      </div>
      <div>
        <button onClick={exchange} className="exchange-button">
          Çevir
        </button>
      </div>
    </div>
  );
}

export default Currency;
