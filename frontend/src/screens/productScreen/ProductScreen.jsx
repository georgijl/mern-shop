import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { isMobile } from "react-device-detect";
import "./ProductScreen.scss";

// Actions
import { getProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { getProducts as listProducts } from "../../redux/actions/productActions";

// Components
import Product from "../../components/product/Product";

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Carousel logic
  const [move, setMove] = useState(0);
  const [counter, setCounter] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);

  const clickRight = useRef(null);
  const gridWrapper = useRef(null);

  const transitionHandler = () => {
    if (isMobile) {
      const getWidthAll = gridWrapper.current.offsetWidth;
      const currentElement = clickRight.current.offsetWidth * 1;
      const currentCounter = currentElement * counter;
      const lastSumWidth = clickRight.current.offsetWidth * 1 + currentCounter;
      if (lastSumWidth < getWidthAll) {
        setCounter(counter + 1);
        setMove(lastSumWidth);
      } else {
        setCounter(0);
        const startView = 0;
        setMove(startView);
      }
    } else {
      const getWidthAll = gridWrapper.current.offsetWidth;
      const currentElement = clickRight.current.offsetWidth * 3;
      const currentCounter = currentElement * counter;
      const lastSumWidth = clickRight.current.offsetWidth * 3 + currentCounter;
      if (lastSumWidth < getWidthAll) {
        setCounter(counter + 1);
        setMove(lastSumWidth);
      } else {
        setCounter(0);
        const startView = 0;
        setMove(startView);
      }
    }
  };

  const transitionHandlerLeft = () => {
    if (isMobile) {
      const getWidthAll = gridWrapper.current.offsetWidth;
      const currentElement = move;
      const lastSumWidth = currentElement - clickRight.current.offsetWidth;
      if (lastSumWidth > -1) {
        setMove(lastSumWidth);
      } else {
        setCounter(0);
        const startView = getWidthAll - clickRight.current.offsetWidth;
        setMove(startView);
      }
    } else {
      const getWidthAll = gridWrapper.current.offsetWidth;
      const currentElement = move;
      const lastSumWidth = currentElement - clickRight.current.offsetWidth * 3;
      if (lastSumWidth > -1) {
        setMove(lastSumWidth);
      } else {
        setCounter(0);
        const startView = getWidthAll - clickRight.current.offsetWidth;
        setMove(startView);
      }
    }
  };

  const contentProps = useSpring({
    transform: `translate(-${move}px,0)`,
    config: { duration: 1000 },
  });
  const productImage = ["product-screen__left"];
  if (imageOpen) productImage.push("opened-image");
  const setImageOpenHandler = () => {
    productImage.pop("opened-image");
    setTimeout(() => {
      setImageOpen((v) => !v);
    }, 1);
  };

  return (
    <>
      {imageOpen ? (
        <div className="background-image" onClick={setImageOpenHandler}></div>
      ) : (
        ""
      )}
      <div className="product-screen">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2> {error} </h2>
        ) : (
          <>
            <div
              onClick={() => {
                setImageOpen((v) => !v);
              }}
              key={product._id}
              className={productImage.join(" ")}
            >
              {imageOpen ? (
                <>
                  <img src={product.imageUrl} alt={product.name} />
                  <img
                    className="left-opened"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </>
              ) : (
                <img src={product.imageUrl} alt={product.name} />
              )}
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
            <div className="product-screen__right">
              <div className="right__info">
                <p>
                  Price: <span>${product.price}</span>
                </p>
                <p>
                  Status:
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  Qty
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={Math.random() * 2} value={x + 1}>
                        {" "}
                        {x + 1}{" "}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <button type="button" onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="carousel-products">
        <div className="carousel-products__left">
          <i
            className="fas fa-chevron-left"
            onClick={() => {
              transitionHandlerLeft();
              setCounter(counter - 1);
            }}
          ></i>
        </div>
        <div
          className="carousel-products__right"
          onClick={() => {
            transitionHandler();
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="carousel-products__wrapper">
          <animated.div
            className="carousel-products__grid"
            ref={gridWrapper}
            style={contentProps}
          >
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2> {error} </h2>
            ) : (
              products.map((product) => (
                <div key={Math.random() * 2} ref={clickRight}>
                  <Product
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={`$${product.price}`}
                    description={product.description}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))
            )}
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default ProductScreen;
