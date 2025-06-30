import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ForgeQueueTable({ assets }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(assets.map(a => ({ ...a, time: a.printTime, stage: 'Queued' })));
  }, [assets]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((rs) => rs.map(r => {
        if (r.stage === 'Queued') return { ...r, stage: 'In Progress' };
        if (r.stage === 'In Progress') return { ...r, stage: 'Cooling' };
        if (r.stage === 'Cooling') return { ...r, stage: 'Ready' };
        return r;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl mb-2">Forge Queue</h2>
      <table className="w-full text-sm bg-primary rounded-md overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 text-left">Asset Name</th>
            <th className="p-2">Time Left</th>
            <th className="p-2">Stage</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <motion.tr key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-gray-700">
              <td className="p-2">{r.name}</td>
              <td className="p-2 text-center">{r.time}</td>
              <td className="p-2 text-center">
                {r.stage === 'In Progress' && <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">🔄</motion.span>}
                {r.stage}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
