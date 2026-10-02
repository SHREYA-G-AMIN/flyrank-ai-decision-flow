"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DecisionNode from "@/components/DecisionNode";

const nodeTypes = {
  decision: DecisionNode,
};

type FlowNodeData = {
  prompt?: string;
  label?: string;
  onChange?: (value: string) => void;
};

type FlowNode = Node<FlowNodeData>;

export default function Page() {
  const [nodes, setNodes] = useState<FlowNode[]>([
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
  ]);

  const updatePrompt = useCallback((value: string) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === "decision"
          ? {
              ...node,
              data: {
                ...node.data,
                prompt: value,
              },
            }
          : node
      )
    );
  }, []);

  const nodesWithHandlers = nodes.map((node) =>
    node.id === "decision"
      ? {
          ...node,
          data: {
            ...node.data,
            onChange: updatePrompt,
          },
        }
      : node
  );

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

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodesWithHandlers}
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