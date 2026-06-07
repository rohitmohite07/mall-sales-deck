import Hero from "./components/Hero";
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
    </>
  );
}

export default App;
