"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodes = [
  {
    id: "decision",
    position: { x: 300, y: 100 },
    data: { label: "Is this a support request?" },
  },
  {
    id: "support",
    position: { x: 100, y: 300 },
    data: { label: "Support" },
  },
  {
    id: "sales",
    position: { x: 500, y: 300 },
    data: { label: "Sales" },
  },
];

const edges = [
  {
    id: "yes",
    source: "decision",
    target: "support",
    label: "YES",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "no",
    source: "decision",
    target: "sales",
    label: "NO",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export default function Page() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}