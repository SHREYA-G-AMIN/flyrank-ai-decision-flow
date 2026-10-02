"use client";

import { useCallback, useEffect, useState } from "react";
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

type WorkflowNode = Node<{
  prompt?: string;
  label?: string;
  onChange?: (value: string) => void;
}>;

const initialNodes: WorkflowNode[] = [
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
    data: {
      label: "Support",
    },
  },
  {
    id: "sales",
    position: { x: 500, y: 300 },
    data: {
      label: "Sales",
    },
  },
];

export default function Page() {
  // Load saved workflow when the app starts
  const [nodes, setNodes] = useState<WorkflowNode[]>(() => {
    if (typeof window === "undefined") {
      return initialNodes;
    }

    const savedNodes = localStorage.getItem("be09-workflow");

    return savedNodes ? JSON.parse(savedNodes) : initialNodes;
  });

  // Save workflow whenever nodes change
  useEffect(() => {
    localStorage.setItem("be09-workflow", JSON.stringify(nodes));
  }, [nodes]);

  // Update the decision prompt
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

  // Give the decision node access to updatePrompt
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

  // YES and NO connections
  const edges = [
    {
      id: "yes",
      source: "decision",
      sourceHandle: "yes",
      target: "support",
      label: "YES",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: "no",
      source: "decision",
      sourceHandle: "no",
      target: "sales",
      label: "NO",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
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