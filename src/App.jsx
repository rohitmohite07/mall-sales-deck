import Hero from "./components/Hero";
import Luxury from "./components/Luxury";
import Retail from "./components/Retail";
import WhyThisMall from "./components/Whythismall";

function App() {
  return (
    <>
      <section id="overview">
        <Hero />
        <WhyThisMall />
      </section>
      <Retail />
      <Luxury />
    </>
  );
}

export default App;
