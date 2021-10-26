import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Image } from "react-bootstrap";
import axios from "axios";

function App() {
  const [currency, setCurrency] = useState("INR");
  const [rate, setRate] = useState(1);

  const products = [
    {
      id: 1,
      image: "/images/car1.jpeg",
      name: "product1",
      price: 200,
    },
    {
      id: 2,
      image: "images/car2.jpeg",
      name: "product2",

      price: 500,
    },
    {
      id: 3,
      image: "images/lw.jpeg",
      name: "product3",

      price: 800,
    },
  ];
  const getExchangeRate = async () => {
    try {
      const { data } = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHAGE_API_KEY}/latest/INR`
      );
      if (data) {
        // console.log(data?.conversion_rates.USD);
        setRate(data?.conversion_rates.USD);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);
  return (
    <>
      {" "}
      <h1 style={{ textAlign: "center" }}>Exercise </h1>
      <div
        style={{
          border: "1px solid grey",
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          margin: "auto",
          padding: "2% 1%",
          borderRadius: "10px",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <div style={{ width: "25%", height: "30%" }}>
            <Image
              style={{ width: "100%", height: "100px", objectFit: "contain" }}
              src={product.image}
              rounded
              fluid
            />
            <div style={{ textAlign: "center" }}>
              <p> {product.name}</p>
              <p>
                {" "}
                {currency === "INR"
                  ? ` ₹ ${product.price.toFixed(2)} `
                  : `$ ${(rate * product.price).toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
        <Dropdown style={{ width: "20%" }}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Currency :{currency === "INR" ? "INR" : "USD"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setCurrency("INR")}>
              INR
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setCurrency("USD")}>
              USD
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default App;
