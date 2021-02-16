import React, { useEffect } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import {productDetails} from "../actions/productActions";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };

  //   fetchData();
  // }, []);

 // const product = products.find((x) => x._id === Number(props.match.params.id));
  const productInfo = useSelector((state) => state.productInfo);
  console.log(productInfo);
  const { loading, error, product } = productInfo;

  useEffect(() => {
    dispatch(productDetails(productId));
  }, [dispatch, productId]);
 

  return (
    <div>
      {
        loading
          ? (<LoadingBox></LoadingBox>)
          : error
          ? (<MessageBox variant="danger">{error}</MessageBox>)
          : (
            <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
              <div className="col-2">
                <img className="large" src={product.image} alt={product.name}></img>
              </div>
              <div className="col-1 info">
                <ul>
                  <li><h2>{product.name}</h2></li>
                  <li>
                    <Rating
                      rating = {product.rating}
                      reviews = {product.reviews}
                    ></Rating>
                  </li>
                  <li>Price: ${product.price}</li>
                  <li>Description: <p>{product.description}</p></li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {
                            product.countInStock > 0
                            ? (<span className="success">In Stock</span>)
                            : (<span className="danger">Unavailable</span>)
                          }
                        </div>
                      </div>
                    </li>
                    <li>
                      <button className="primary block">Add to Cart</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )
      }
    </div>
  );
};
