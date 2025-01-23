import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import { useState } from "react"
import LoginPopUp from "./components/LoginPopUp/LoginPopUp"
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify"
import Verify from "./pages/verify/Verify"

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="h-screen">
      <ToastContainer />
      {login && <LoginPopUp setLogin={setLogin} />}
      <header>
        <Navbar setLogin={setLogin} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </main>
      <footer >
        <Footer />
      </footer>
    </div>
  );
}

export default App
