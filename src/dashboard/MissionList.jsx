import { useEffect, useState } from "react";
import api from "services";
import { MissionForm, MissionCard } from "dashboard";
import { Button, Modal } from "components";

const MissionList = ({ unassignedCats, onUpdate }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMissions = () => {
    setLoading(true);
    api
      .get("missions/")
      .then((res) => {
        setMissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch missions");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  if (loading) return <div>Loading missions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Create Mission
        </Button>
      </div>

      {missions.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          There are no missions yet 🗺️✨
        </p>
      ) : (
        missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            unassignedCats={unassignedCats}
            onUpdate={() => {
              fetchMissions();
              onUpdate();
            }}
          />
        ))
      )}

      {isModalOpen && (
        <Modal title="Create Mission" onClose={() => setIsModalOpen(false)}>
          <MissionForm
            onSuccess={() => {
              fetchMissions();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default MissionList;
