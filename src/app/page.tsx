import Image from "next/image";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import NewsLetter from "./components/NewsLetter";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero/>
      <Projects/>
      <Blogs/>
      <NewsLetter/>
      <Footer/>
    </>
  );
}
