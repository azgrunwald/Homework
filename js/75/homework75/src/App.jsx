import Address from "./Address";
import Address2 from "./Address2";

function App() {
  const name = "AZ";
  const age = 23;

  return (
    <>
      <h1>Hi, my name is {name}</h1>
      <h2>I am {age} years old</h2>
      <div>
        <p>I live at</p>
        <Address />
        <Address2
          address="1234 Stardust Canyon Road"
          city="Sedona"
          state="AZ"
          zip="86336"
        />
      </div>
    </>
  );
}

export default App;
