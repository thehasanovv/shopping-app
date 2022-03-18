import { popularProducts } from "../Datas/data";
import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (cat) {
      const category = popularProducts.filter(
        (product) => product.category === cat
      );
      setProducts(category);
    } else {
      setProducts(popularProducts);
    }
  }, [cat, setProducts]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            if (filters[key] === "All") {
              // console.log("all filters");
              return filters[key];
            } else {
              // console.log(key, value);
              return item[key].includes(value);
            }
          })
        )
      );
  }, [products, filters, sort]);
  // item[key].includes(value) && item.length === products.length
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "acs") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);

  // console.log(cat, filters, sort);
  // console.log(filteredProducts);
  // console.log(products);
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : popularProducts.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
