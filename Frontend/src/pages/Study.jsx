import Flashcard from "../components/Flashcard";

export default function Study({ cards }) {
  if (!cards.length) {
    return (
      <div className="text-center text-gray-500">
        No flashcards found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Study
        </h2>
        <span className="text-sm text-gray-500">
          {cards.length} cards
        </span>
      </div>

      <div className="grid gap-5">
        {cards.map((c) => (
          <Flashcard
            key={c.id}
            question={c.question}
            answer={c.answer}
            difficulty={c.difficulty}
          />
        ))}
      </div>
    </div>
  );
}
