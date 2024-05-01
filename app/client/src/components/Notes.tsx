import { api, type Note } from "@/utils/api";
import { useEffect, useState } from "react";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    api.notes.index.get().then((res) => setNotes(res.data));
  }, []);

  if (!notes) {
    return <p className="text-xl">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-5">
      {notes.map((note) => (
        <div key={note.path} className="p-1 h-48 flex flex-col">
          <div className="overflow-hidden flex-1 border rounded border-neutral-500 p-1">
            <pre className="blur-[2px] p-1">{note.content}</pre>
          </div>
          <a href={`/note?path=${note.path}`} className="text-center text-xl">
            {note.path}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Notes;
