type Props = {
  name: string;
  price: number;
  trips: number;
  validityMinutes: number;
};

const FareCard = (props: Props) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h3 className="text-xl">{props.name}</h3>
      <p>{props.price} RON</p>
      <p>Trips: {props.trips}</p>
      <p>Validity: {props.validityMinutes} minutes</p>
    </div>
  );
};

export default FareCard;
