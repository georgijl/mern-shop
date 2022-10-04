import React from "react";
import "./HomeScreen.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

// Actions
import { getProducts as listProducts } from "../../redux/actions/productActions";

// Components
import Product from "../../components/product/Product";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, error, loading } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const itemIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Lastest Products</h2>
      <animated.div style={itemIn} className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2> {error} </h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              productId={product._id}
              name={product.name}
              price={`$${product.price}`}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))
        )}
      </animated.div>
    </div>
  );
};

export default HomeScreen;
