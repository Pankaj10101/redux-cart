import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const dummyProducts = [
  { id: "p1", price: 50, title: "Book", description: "My first book" },
  { id: "p2", price: 10, title: "Bag", description: "My first Bag" },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyProducts.map((prod) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            description={prod.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
