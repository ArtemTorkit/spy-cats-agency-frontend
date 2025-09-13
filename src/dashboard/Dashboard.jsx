import { CatList, MissionList } from "dashboard";
import { useEffect, useState } from "react";
import api from "services";

const Dashboard = () => {
  const [cats, setCats] = useState([]);
  const [unassignedCats, setUnassignedCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCats = () => {
    setLoading(true);
    api
      .get("cats/")
      .then((res) => {
        setCats(res.data);
        const unassigned = res.data.filter((cat) => !cat.current_mission);
        setUnassignedCats(unassigned);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch cats");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  if (loading) return <div>Loading cats...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <div className="flex gap-4">
        <CatList cats={cats} onUpdate={fetchCats} />
        <MissionList unassignedCats={unassignedCats} onUpdate={fetchCats} />
      </div>
    </main>
  );
};

export default Dashboard;
