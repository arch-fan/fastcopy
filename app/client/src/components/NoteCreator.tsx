import { api } from "@/utils/api";
import { useState } from "react";

const NoteCreator: React.FC = () => {
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData.get("note"));

    const res = await api.note.index.post({
      content: formData.get("note") as string,
      path: formData.get("path") as string,
      ttl: Number(formData.get("ttl")) * 60,
    });

    if (res.status === 201) {
      window.location.href = `/note?path=${formData.get("path")}`;
    } else if (res.status === 409) {
      setError(res.error?.value?.message || "Unknown Error");
      setTimeout(() => setError(undefined), 2000);
    }
  };
  return (
    <form className="flex flex-col h-full relative" onSubmit={handleSubmit}>
      {error && (
        <p className="bg-red-400 p-2 rounded text-white absolute top-0 right-0 text-xl z-10">
          {error}
        </p>
      )}
      <label htmlFor="path">path</label>
      <input type="text" className="border rounded-sm p-1" name="path" />
      <label htmlFor="ttl">TTL (in minutes)</label>
      <input type="number" className="border rounded-sm p-1" name="ttl" />
      <label htmlFor="note">note</label>
      <textarea
        className="flex-1 font-mono p-1 border rounded-sm"
        name="note"
      />
      <button
        type="submit"
        className="w-full text-white text-xl p-2 mt-2 bg-blue-500 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default NoteCreator;
