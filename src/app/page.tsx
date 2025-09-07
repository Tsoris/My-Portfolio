import Hero from './components/homepage/Hero';
import Projects from './components/homepage/Projects';
import Blogs from './components/homepage/Blogs';
import NewsLetter from './components/homepage/NewsLetter';
import { Footer } from './components/homepage/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Blogs />
      <NewsLetter />
    </>
  );
}
