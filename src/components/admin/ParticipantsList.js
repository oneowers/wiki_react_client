import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { getAllParticipants } from "../../http/participantApi.js";

// Utility function to format text to terminal-style uppercase
const toTerminalCase = (text) => {
  return text ? text.toUpperCase() : "N/A";
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
  const limit = 10;

  useEffect(() => {
    getAllParticipants(page, limit).then((data) => {
      setParticipants(data.items);
      setTotalPages(data.totalPages);
    });
  }, [page]);

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="my-8 font-mono bg-black text-white p-1">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white animate-pulse" />
          <h1 className="text-sm font-black uppercase tracking-[0.2em]">
            Node_Registry / Participants_Log
          </h1>
        </div>
        <span className="text-[10px] text-white/40 tracking-widest">
          TOTAL_PAGES: {totalPages}
        </span>
      </div>

      <div className="border border-white/20 overflow-x-auto relative">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-white text-black text-[10px] font-bold uppercase tracking-widest">
              <th className="py-2 px-4 text-left border-r border-black/10">Node_ID</th>
              <th className="py-2 px-4 text-left border-r border-black/10">Origin</th>
              <th className="py-2 px-4 text-left border-r border-black/10">User_Alias</th>
              <th className="py-2 px-4 text-left border-r border-black/10">Uplink</th>
              <th className="py-2 px-4 text-left border-r border-black/10">Secure_Mail</th>
              <th className="py-2 px-4 text-left">Entity</th>
            </tr>
          </thead>
          <tbody className="text-[11px] divide-y divide-white/10">
            {participants.map((participant) => (
              <tr 
                key={participant.id} 
                className="group hover:bg-white hover:text-black transition-colors duration-150 cursor-crosshair"
              >
                <td className="py-3 px-4 border-r border-white/10 opacity-50 font-bold">
                  #{participant.id.toString().padStart(4, '0')}
                </td>
                <td className="py-3 px-4 border-r border-white/10">
                  <span className="grayscale group-hover:grayscale-0 transition-all">
                    {stateFlags.find((flag) => flag.id === participant.state)?.common || '??'}
                  </span>
                  <span className="ml-2 opacity-40 group-hover:opacity-100">{participant.state?.toUpperCase()}</span>
                </td>
                <td className="py-3 px-4 border-r border-white/10 font-bold uppercase tracking-tighter">
                  {toTerminalCase(participant.full_name)}
                </td>
                <td className="py-3 px-4 border-r border-white/10 text-white/60 group-hover:text-black">
                  {participant.phone_number}
                </td>
                <td className="py-3 px-4 border-r border-white/10 italic">
                  {participant.email || 'NO_COMMS'}
                </td>
                <td className="py-3 px-4 truncate max-w-[150px]">
                  {participant.company ? `[ ${participant.company.toUpperCase()} ]` : 'UNASSIGNED'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TERMINAL PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="group flex items-center gap-2 border border-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
        >
          <span>{"<"}</span> PREVIOUS_SEGMENT
        </button>

        <div className="flex items-center gap-4 text-[10px] tracking-widest font-bold">
          <span className="text-white/30">CURRENT_BLOCK:</span>
          <span className="bg-white text-black px-2 py-1">{page.toString().padStart(2, '0')}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">{totalPages.toString().padStart(2, '0')}</span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="group flex items-center gap-2 border border-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
        >
          NEXT_SEGMENT <span>{">"}</span>
        </button>
      </div>

      {/* Decorative Metadata Footer */}
      <div className="mt-4 opacity-10 flex justify-between text-[7px] uppercase tracking-[0.5em]">
          <span>Database_Encrypted: YES</span>
          <span>Access_Point: Edge_01</span>
          <span>Sync_Status: Verified</span>
      </div>
    </div>
  );
});

export default ParticipantsList;