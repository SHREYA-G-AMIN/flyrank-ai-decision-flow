"use client";

import { Handle, Position, NodeProps, Node } from "@xyflow/react";

type DecisionNodeData = {
  prompt?: string;
  onChange?: (value: string) => void;
};

export default function DecisionNode({ data }: NodeProps<Node<DecisionNodeData>>) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #555",
        borderRadius: "12px",
        background: "#fff",
        minWidth: "220px",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
        AI Decision
      </div>

      <input
        value={data.prompt as string}
        onChange={(e) => data.onChange?.(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: "30%" }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: "70%" }}
      />
    </div>
  );
}