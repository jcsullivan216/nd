import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';

function Box() {
  return (
    <mesh rotation={[45,45,0]}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="#4ade80"/>
    </mesh>
  );
}

export default function AssetCard({ asset, onQueue }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-primary rounded-md p-4 shadow-md flex flex-col">
      <div className="h-40 w-full">
        <Canvas camera={{ position: [2,2,2] }}>
          <ambientLight />
          <pointLight position={[10,10,10]} />
          <Box />
        </Canvas>
      </div>
      <h3 className="text-lg font-semibold mt-2">{asset.name}</h3>
      <ul className="text-sm flex-1 mt-2 space-y-1">
        <li>Mobility: {asset.mobility}</li>
        <li>Sensors: {asset.sensors}</li>
        <li>Duration: {asset.duration}</li>
        <li>Comms: {asset.comms}</li>
        <li>Time to Print: {asset.printTime}</li>
        <li>Forge Draw: {asset.resources}</li>
      </ul>
      <button onClick={() => onQueue(asset)} className="bg-accent text-black mt-4 py-1 rounded">Queue to Print</button>
    </motion.div>
  );
}
