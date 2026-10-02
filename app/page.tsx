"use client";

import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 250, y: 150 },
    data: { label: "Is this a support request?" },
  },
];

export default function Home() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes}>
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}