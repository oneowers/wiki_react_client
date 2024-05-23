import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { getAllParticipants } from "../../http/participantApi.js";

// Utility function to format text to camel case
const toCamelCase = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Array mapping state IDs to their corresponding flag emojis
const stateFlags = [
  { common: "🇺🇿", id: "uz" },
  { common: "🇷🇺", id: "ru" },
  { common: "🇺🇸", id: "us" },
  { common: "🇮🇹", id: "it" },
  { common: "🇨🇳", id: "cn" },
  { common: "🇮🇷", id: "ir" },
  { common: "🇧🇾", id: "by" },
  { common: "🇩🇪", id: "de" },
];

const ParticipantsList = observer(() => {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of participants per page

  useEffect(() => {
    getAllParticipants(page, limit).then((data) => {
      setParticipants(data.items);
      setTotalPages(data.totalPages);
    });
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Participants List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">State</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Phone Number</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Company</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {participants.map((participant) => (
              <tr key={participant.id} className="hover:bg-gray-100">
                <td className="w-1/6 py-3 px-4">{participant.id}</td>
                <td className="w-1/6 py-3 px-4">
                  {stateFlags.find((flag) => flag.id === participant.state)?.common || 'Unknown'}
                </td>
                <td className="w-1/6 py-3 px-4">{toCamelCase(participant.full_name)}</td>
                <td className="w-1/6 py-3 px-4">{participant.phone_number}</td>
                <td className="w-1/6 py-3 px-4">
                  {participant.email ? participant.email : 'none email'}
                </td>
                <td className="w-1/6 py-3 px-4">
                  {participant.company ? participant.company : 'No company'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default ParticipantsList;
