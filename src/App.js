import "./App.css";
import { Drawer, Link } from "@mui/material";
import { useEffect, useState } from "react";

const data = [
  ["Plain Dosa", "VegLogo.png", "veg", 20.0, "plainDosa.jpg"],
  ["Poori", "VegLogo.png", "veg", 30, "poori.jpg"],
  ["Masala Dosa", "VegLogo.png", "veg", 30, "masalaDosa.jpg"],
  ["Manglore Bajji", "VegLogo.png", "veg", 30, "bajji.jpg"],
  ["Andhra Veg Meals", "VegLogo.png", "veg", 300, "vegMeals.jpg"],
  ["Andhra Non Veg Meals", "nonvegLogo.png", "Non-veg", 350, "nonvegMeals.jpg"],
  ["Andhra Egg Meals", "nonvegLogo.png", "Non-veg", 150, "eggMeals.jpg"],
];

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [drawer, setDrawer] = useState(false);

  const add_cart = (e) => {
    if (cart.indexOf(data[e.target.value]) === -1) {
      setCart([...cart, data[e.target.value]]);
      setTotal(total + data[e.target.value][3]);
    }
  };

  useEffect(() => {
    let t = 0;
    cart.map((item) => (t += item[3]));
    setTotal(t);
  });

  return (
    <div className="App">
      <div id="navbar">
        <Link to="/">Break Your Fast</Link>
        <Link to="/">Time for Lunch</Link>
        <Link to="/">Can I Have Snaks</Link>
        <Link to="/">Dinner</Link>
        <Link to="/">Burgers and Beverages</Link>
        <Link to="/">More...</Link>
      </div>

      <div id="products">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="content">
              <h3>{item[0]}</h3>
              <p id="show">
                <img style={{ height: "3vw" }} src={item[1]} alt="" />{" "}
                <span>{item[2]}</span>
              </p>
              <p>₹{item[3]}.00</p>
              <p>
                <button value={index} onClick={add_cart}>
                  Add to cart
                </button>
              </p>
            </div>
            <div>
              <img className="img" src={item[4]} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div id="footer">
        <p>
          <button onClick={() => setDrawer(true)}>
            <i className="fa-solid fa-angles-up"></i>
          </button>
        </p>
        <p>Your Orders({cart.length})</p>
        <p>Subtotal ₹{total}</p>
        <p>
          <button onClick={() => setDrawer(true)}>Continue</button>
        </p>
      </div>
      <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
        <h1>
          <i
            onClick={() => setDrawer(false)}
            className="fa-solid fa-xmark xxl"
            style={{ cursor: "pointer" }}
          ></i>
        </h1>
        <table id="draw">
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item[4]} alt="" />
                </td>
                <td>{item[0]}</td>
                <td>₹{item[3]}.00</td>
                <td
                  style={{ color: "red" }}
                  onClick={() => {
                    let temp = [...cart];
                    temp.splice(index, 1);
                    setCart(temp);
                  }}
                >
                  <i
                    className="fa-solid fa-trash-can"
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  color: "green",
                  fontWeight: "600",
                }}
              >
                Total amount = ₹{total}.00
              </td>
            </tr>
          </tbody>
        </table>
      </Drawer>
    </div>
  );
}

export default App;
