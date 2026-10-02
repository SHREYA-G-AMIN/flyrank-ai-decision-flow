"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DecisionNode from "@/components/DecisionNode";

const nodeTypes = {
  decision: DecisionNode,
};

const nodes = [
  {
    id: "decision",
    type: "decision",
    position: { x: 300, y: 100 },
    data: {
      prompt: "Is this a support request?",
    },
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
    sourceHandle: "yes",
    target: "support",
    label: "YES",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "no",
    source: "decision",
    sourceHandle: "no",
    target: "sales",
    label: "NO",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

export default function Page() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}