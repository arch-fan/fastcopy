import { api, type Note } from "@/utils/api";
import { useEffect, useState } from "react";
import Copy from "./Copy";

const NoteViewer: React.FC<{ path: string }> = ({ path }) => {
  const [note, setNote] = useState<Note>();

  useEffect(() => {
    api
      .note({ path })
      .get()
      .then((res) => {
        if (res.data) {
          setNote({ path, content: res.data.note, ttl: res.data.ttl });
        }
      });
  }, []);

  if (!note) {
    return <p className="text-xl">Loading...</p>;
  }

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex gap-4">
        {note && note.ttl && <p>TTL: {Math.ceil(note.ttl / 60)}min</p>}
        <a href={`/api/note/raw/${path}`}>RAW</a>
      </div>
      <div className="text-xl font-sans w-full flex-1 relative bg-neutral-200 p-1 rounded">
        <pre>{note.content}</pre>
        <Copy
          className="absolute top-2 right-2 h-8 w-8 z-50"
          text={note.content}
        />
      </div>
    </div>
  );
};

const NoteViewerWrapper: React.FC = () => {
  const path = new URLSearchParams(location.search).get("path");

  if (!path) {
    return <p className="text-xl">Need path param!</p>;
  }

  return <NoteViewer path={path} />;
};

export default NoteViewerWrapper;
