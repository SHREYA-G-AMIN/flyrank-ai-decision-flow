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
  const [nodes, setNodes] = useState<WorkflowNode[]>(() => {
    if (typeof window === "undefined") {
      return initialNodes;
    }

    const savedNodes = localStorage.getItem("be09-workflow");

    return savedNodes ? JSON.parse(savedNodes) : initialNodes;
  });

  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [decision, setDecision] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("be09-workflow", JSON.stringify(nodes));
  }, [nodes]);

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

  const runWorkflow = async () => {
    const prompt =
      nodes.find((node) => node.id === "decision")?.data.prompt;

    if (!prompt) return;

    setRunning(true);
    setDecision(null);
    setStatus("Running...");
    setLogs([`Started workflow with prompt: "${prompt}"`]);

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Workflow failed");
      }

      setStatus("Workflow triggered");
      setLogs((current) => [
        ...current,
        "Workflow sent to Inngest.",
        "Gemini will evaluate the decision.",
        "Check Inngest Runs for the final YES/NO branch.",
      ]);
    } catch (error) {
      console.error(error);

      setStatus("Failed");
      setLogs((current) => [
        ...current,
        "Error: Failed to trigger workflow.",
      ]);
    } finally {
      setRunning(false);
    }
  };

  const nodesWithHandlers = nodes.map((node) =>
    node.id === "decision"
      ? {
          ...node,
          style:
            decision === "YES" && node.id === "decision"
              ? { border: "3px solid green" }
              : decision === "NO" && node.id === "decision"
                ? { border: "3px solid red" }
                : undefined,
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
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      animated: decision === "YES",
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
      animated: decision === "NO",
    },
  ];

  return (
    <main style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          left: 20,
          background: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          minWidth: "300px",
        }}
      >
        <h1 style={{ fontWeight: "bold", marginBottom: "10px" }}>
          AI Decision Flow
        </h1>

        <button
          onClick={runWorkflow}
          disabled={running}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            background: running ? "#999" : "#111",
            color: "white",
            cursor: running ? "not-allowed" : "pointer",
            marginBottom: "10px",
          }}
        >
          {running ? "Running..." : "Run Workflow"}
        </button>

        <div style={{ fontSize: "14px" }}>
          <strong>Status:</strong> {status}
        </div>

        {decision && (
          <div style={{ marginTop: "8px" }}>
            <strong>AI Decision:</strong> {decision}
          </div>
        )}

        {logs.length > 0 && (
          <div style={{ marginTop: "12px" }}>
            <strong>Execution Log</strong>

            {logs.map((log, index) => (
              <div
                key={index}
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "#555",
                }}
              >
                • {log}
              </div>
            ))}
          </div>
        )}
      </div>

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