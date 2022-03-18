import { useState, useEffect } from "react";

import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../Responsive";
import { useParams } from "react-router-dom";
import { popularProducts } from "../Datas/data";

const ProductList = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const colorsArr = [];
    const sizesArr = [];
    // Colors
    const category = popularProducts.filter(
      (product) => product.category === id
    );
    category.map((array) => array.color.map((item) => colorsArr.push(item)));
    const uniqueColors = [...new Set(colorsArr)];
    setColors(uniqueColors);
    // Sizes
    category.map((array) => array.size.map((item) => sizesArr.push(item)));
    const uniqueSizes = [...new Set(sizesArr)];
    setSizes(uniqueSizes);
  }, [id]);

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{id}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>All</Option>
            {colors.map((color) => (
              <Option key={color}>{color}</Option>
            ))}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>All</Option>
            {sizes.map((size) => (
              <Option key={size}>{size}</Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={id} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-transform: capitalize;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
