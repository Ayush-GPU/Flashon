import { useState } from "react";

/**
 * Flashcard Component
 * Props:
 *  - question (string)
 *  - answer (string)
 *  - difficulty ("Easy" | "Medium" | "Hard")
 */
export default function Flashcard({
  question,
  answer,
  difficulty = "Medium",
}) {
  const [flipped, setFlipped] = useState(false);

  function toggle() {
    setFlipped((prev) => !prev);
  }

  function difficultyColor(level) {
    switch (level) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => e.key === "Enter" && toggle()}
      className="
        relative
        bg-white
        border
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        select-none
        touch-manipulation
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      {/* Difficulty badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor(
            difficulty
          )}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="min-h-[96px] flex items-center">
        <p className="text-lg leading-relaxed text-gray-900">
          {flipped ? answer : question}
        </p>
      </div>

      {/* Hint */}
      <div className="mt-6 text-sm text-gray-400">
        {flipped ? "Tap to view question" : "Tap to reveal answer"}
      </div>
    </div>
  );
}
