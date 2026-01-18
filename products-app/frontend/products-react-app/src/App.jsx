import ProductForm from "../components/ProductForm/ProductForm";
import ProductList from "../components/ProductList/ProductList";
import "./App.css";

function App() {
  return (
    <div className="app_main_container">
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;
