import Contact from "./components/Contact";
import Dining from "./components/Dining";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Luxury from "./components/Luxury";
import Navbar from "./components/Navbar";
import Retail from "./components/Retail";
import WhyThisMall from "./components/Whythismall";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section id="overview">
          <Hero />
          <WhyThisMall />
        </section>
        <Retail />
        <Luxury />
        <Dining />
        <Events />
        <Contact />
      </main>
    </>
  );
}

export default App;
