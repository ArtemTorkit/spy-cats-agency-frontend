import { useState } from "react";
import { Button } from "components";
import { updateCat, deleteCat } from "services/cats";

const CatCard = ({ cat, onUpdate }) => {
  const [salary, setSalary] = useState(cat.salary);
  const [loading, setLoading] = useState(false);

  const handleUpdateSalary = () => {
    updateCat(cat.id, { salary })
      .then(() => {
        if (onUpdate) onUpdate();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  const handleRemoveCat = () => {
    deleteCat(cat.id)
      .then(() => {
        if (onUpdate) onUpdate();
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition relative">
      <h3 className="font-bold text-lg">{cat.name}</h3>
      <p>Breed: {cat.breed}</p>
      <p>Experience: {cat.years_of_experience} years</p>

      <div className="flex items-center gap-2 mt-2">
        <label>Salary: </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-24 p-1 border rounded"
        />
        <Button
          variant="secondary"
          onClick={handleUpdateSalary}
          disabled={loading}
        >
          Update
        </Button>
      </div>

      {cat?.current_mission ? (
        <p className="mt-2">Current mission: {cat.current_mission.title}</p>
      ) : (
        <p className="mt-2">Has no current missions</p>
      )}

      <Button variant="secondary" onClick={handleRemoveCat} disabled={loading}>
        Remove Cat
      </Button>
    </div>
  );
};

export default CatCard;
