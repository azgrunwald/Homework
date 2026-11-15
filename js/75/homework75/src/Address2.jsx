export default function Address2({address, city , state , zip}) {

  return (
    <>
      <div>Address 2</div>
      <h3>{address}</h3>
      <h4>{city}, { state}</h4>
      <h5>{zip }</h5>
    </>
  );
}
