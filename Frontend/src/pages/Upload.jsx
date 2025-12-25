import { useState } from "react";
import { generateDeck } from "../api";

export default function Upload({ setDeck }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!title || !text) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const res = await generateDeck(title, text);
    setLoading(false);

    setDeck(res.deck_id);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Create a flashcard deck
        </h2>
        <p className="text-gray-500 mt-1">
          Paste your notes and FlashOn will turn them into
          exam-ready flashcards.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Deck title
        </label>
        <input
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Biology — Cell Structure"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Notes
        </label>
        <textarea
          className="w-full border rounded-lg p-3 h-44 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Cell is the basic structural and functional unit of life..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        onClick={submit}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Generating…" : "Generate flashcards"}
      </button>
    </div>
  );
}
