export default function Pricing({ onUpgrade }) {
  return (
    <div className="border rounded-xl p-6 bg-white space-y-4">
      <h3 className="text-xl font-semibold">Upgrade to Premium</h3>

      <ul className="text-sm text-gray-600 space-y-2">
        <li>✅ Unlimited flashcards</li>
        <li>✅ Unlimited decks</li>
        <li>✅ Export (PDF / CSV)</li>
      </ul>

      <div className="text-2xl font-bold">₹199</div>

      <button
        onClick={onUpgrade}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Upgrade Now
      </button>
    </div>
  );
}
