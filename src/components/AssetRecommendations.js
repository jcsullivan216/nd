import React from 'react';
import AssetCard from './AssetCard';
import { motion } from 'framer-motion';

const mockAssets = [
  {
    name: 'Scout Drone',
    mobility: 'Rotor',
    sensors: 'EO/IR Camera',
    duration: '45 min',
    comms: 'Mesh Link',
    printTime: '4.5 hrs',
    resources: '2.1kg filament, 250W',
  },
  {
    name: 'UGV Rover',
    mobility: 'Wheeled',
    sensors: 'Lidar + Camera',
    duration: '3 hr',
    comms: 'Secure Radio',
    printTime: '6 hrs',
    resources: '3kg filament, 400W',
  },
];

export default function AssetRecommendations({ onQueue }) {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockAssets.map((asset) => (
        <motion.div key={asset.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <AssetCard asset={asset} onQueue={onQueue} />
        </motion.div>
      ))}
    </div>
  );
}
