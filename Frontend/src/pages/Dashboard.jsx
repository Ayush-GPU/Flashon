export default function Dashboard({ decks, openDeck }) {
  if (!decks.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          No decks yet
        </h2>
        <p className="text-gray-500 mt-2">
          Create your first flashcard deck to start studying.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Your decks
      </h2>

      <div className="grid gap-4">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="bg-white border rounded-xl p-5 flex justify-between items-center hover:shadow-sm transition"
          >
            <div>
              <h3 className="font-medium">
                {deck.title}
              </h3>
              <p className="text-sm text-gray-500">
                {deck.count} cards
              </p>
            </div>

            <button
              onClick={() => openDeck(deck.id)}
              className="text-blue-600 hover:underline"
            >
              Study →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
