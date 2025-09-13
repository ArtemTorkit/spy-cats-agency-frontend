import React from "react";
import { Button } from "components";
import {
  assignCat,
  completeTarget,
  updateTargetNotes,
  deleteMission,
} from "services/missions";

const MissionCard = ({ mission, onUpdate, unassignedCats }) => {
  const handleAssignCat = (catId) => {
    assignCat(mission.id, catId)
      .then(() => onUpdate?.())
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const handleCompleteTarget = (targetId) => {
    completeTarget(mission.id, targetId)
      .then(() => onUpdate?.())
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const handleUpdateNotes = (targetId, notes) => {
    updateTargetNotes(mission.id, targetId, notes)
      .then(() => onUpdate?.())
      .catch((err) => console.error(err.response?.data || err.message));
  };

  const handleRemoveMission = () => {
    if (mission.assigned_cat) {
      alert("Cannot remove a mission that is assigned to a cat!");
      return;
    }

    deleteMission(mission.id)
      .then(() => onUpdate?.())
      .catch((err) => console.error(err.response?.data || err.message));
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-md transition">
      <h3 className="font-bold text-lg">{mission.title}</h3>
      <p>Assigned Cat: {mission.assigned_cat || "Unassigned"}</p>
      <p>Status: {mission.completed ? "Completed" : "In Progress"}</p>

      <div className="mt-2">
        <h4 className="font-semibold">Targets:</h4>
        <ul className="list-disc list-inside flex flex-col gap-4">
          {mission.targets.map((target) => (
            <li
              key={target.id}
              className="flex flex-col items-center border-t-1 gap-2"
            >
              {target.name} ({target.country}) -{" "}
              {target.completed ? "Done" : "Pending"}
              {!target.completed && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCompleteTarget(target.id)}
                >
                  Complete
                </Button>
              )}
              <div className="flex flex-col w-full gap-2">
                <span>Note:</span>

                {!target.completed && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Update notes"
                      defaultValue={target.notes}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="flex-1 border p-1 rounded text-sm"
                    />
                    <Button
                      onClick={() => handleUpdateNotes(target.id, noteInput)}
                      variant="secondary"
                    >
                      Update
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {mission.assigned_cat === null && unassignedCats.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {unassignedCats.map((cat) => (
            <Button
              key={cat.id}
              variant="primary"
              onClick={() => handleAssignCat(cat.id)}
            >
              Assign {cat.name}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Button
          variant="danger"
          onClick={handleRemoveMission}
          disabled={!!mission.assigned_cat}
        >
          Remove Mission
        </Button>
      </div>
    </div>
  );
};

export default MissionCard;
