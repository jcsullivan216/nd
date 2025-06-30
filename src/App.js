import React, { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import AssetRecommendations from './components/AssetRecommendations';
import ForgeQueueTable from './components/ForgeQueueTable';
import { AnimatePresence, motion } from 'framer-motion';

const phases = {
  CHAT: 'chat',
  ASSETS: 'assets',
  QUEUE: 'queue',
};

export default function App() {
  const [phase, setPhase] = useState(phases.CHAT);
  const [queuedAssets, setQueuedAssets] = useState([]);

  const handleQueue = (asset) => {
    setQueuedAssets([...queuedAssets, { ...asset, stage: 'Queued' }]);
    setPhase(phases.QUEUE);
  };

  return (
    <div className="min-h-screen p-4">
      <AnimatePresence mode="wait">
        {phase === phases.CHAT && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ChatPanel onComplete={() => setPhase(phases.ASSETS)} />
          </motion.div>
        )}
        {phase === phases.ASSETS && (
          <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AssetRecommendations onQueue={handleQueue} />
          </motion.div>
        )}
        {phase === phases.QUEUE && (
          <motion.div key="queue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ForgeQueueTable assets={queuedAssets} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
