import React, { useContext } from "react";
import Banner from "../components/Banner/Banner";
import CardCarousel from "../components/Card/Card";
import HeroSection from "../components/Hero/Hero";
import ProductCarousel from "../components/Products/Products";
import Floatingicon from "../components/Floatingicon/Floatingicon";
import CategoryGrid from "../components/CategoriesGrid/CategoriesGrid";
import ProductShowcase from "../components/ProductShowcase/ProductShowcase";
import ValueOffers from "../components/ValueOffers/ValueOffers";
import LatestModels from "../components/LatestModelBanner/LatestModal";
import Testinominal from "../components/Testinominal/Testinominal";
import SecondBanner from "../components/secondBanner/SecondBanner";
import SliderCards from "../components/SlidingCards/SlidingCards";
import BrandsSection from "../components/BrandSection/BrandSection";
import RefurbishedLaptopsSection from "../components/RefurnishedLaptopSection/RefurnishedLaptopSection";

const Home = () => {
  return (
    <>
      <CategoryGrid />
      <Banner />
       <CardCarousel />
      <HeroSection />
      <ProductShowcase />
      <ValueOffers />
      <LatestModels />
      <Testinominal />
      <SecondBanner />
      <SliderCards />
      <RefurbishedLaptopsSection />
      <BrandsSection /> 
       {/* <ProductCarousel /> */}
      {/* <ProductShowcase /> */}
    </>
  );
};

export default Home;
