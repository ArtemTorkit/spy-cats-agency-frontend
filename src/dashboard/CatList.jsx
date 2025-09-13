import CatCard from "./CatCard";
import { useState } from "react";
import { CatForm } from "dashboard";
import { Button, Modal } from "components";

const CatList = ({ cats, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Cat
        </Button>
      </div>

      {cats.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          There&apos;s no cat detectives 🕵️‍♂️🐱
        </p>
      ) : (
        cats.map((cat) => (
          <CatCard cat={cat} onUpdate={onUpdate} key={cat.id} />
        ))
      )}

      {isModalOpen && (
        <Modal title="Create Cat" onClose={() => setIsModalOpen(false)}>
          <CatForm
            onSuccess={() => {
              if (onUpdate) onUpdate();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CatList;
