import fares from "../data/fares.json";
import FareCard from "./FareCard";

const MainComponent = () => {
  return (
    <div>
      {fares.fares.map((fare) => (
        <div className="mb-4" key={fare.id}>
          <FareCard
            name={fare.name}
            price={fare.price}
            trips={fare.trips}
            validityMinutes={fare.validityMinutes}
          />
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
