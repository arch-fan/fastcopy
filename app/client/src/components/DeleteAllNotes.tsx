import Button from "@/components/ui/Button";
import { api } from "@/utils/api";

const DeleteAllNotes: React.FC = () => {
  const handleDelete = async () => {
    await api.notes.index.delete();
    location.href = "/";
  };

  return (
    <Button
      onClick={handleDelete}
      className="bg-red-400 text-white text-xl hover:bg-red-500 transition-all"
    >
      Delete All Notes
    </Button>
  );
};

export default DeleteAllNotes;
