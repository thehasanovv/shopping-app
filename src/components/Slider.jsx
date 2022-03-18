import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../Datas/data";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 847px) {
    display: none;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff7f7;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  @media screen and (max-width: 1400px) {
    width: 60%;
  }
`;
const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  @media screen and (max-width: 1400px) {
    width: 30%;
  }
`;

const Title = styled.h1`
  font-size: 70px;
  @media screen and (max-width: 1400px) {
    font-size: 35px;
  }
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  @media screen and (max-width: 1400px) {
    font-size: 16px;
  }
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    font-size: 16px;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [slideIndex]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    }
    if (direction === "right") {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => {
          handleClick("left");
        }}
      >
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((slide) => (
          <Slide bg={slide.bg} key={slide.id}>
            <ImgContainer>
              <Image src={slide.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{slide.title}</Title>
              <Desc>{slide.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow
        direction="right"
        onClick={() => {
          handleClick("right");
        }}
      >
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
