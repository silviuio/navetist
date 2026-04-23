import { faresData } from "../lib/fares";
import FareCard from "./FareCard";

const MainComponent = () => {
  return (
    <div className="space-y-4">
      {faresData.fares.map((fare) => (
        <FareCard key={fare.id} fare={fare} />
      ))}
    </div>
  );
};

export default MainComponent;
