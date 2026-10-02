# FlyRank BE-09 — AI Decision Flow

An AI-powered decision workflow editor built with **Next.js, React Flow, Inngest, and Google Gemini**.

## Overview

This project allows users to visually create and edit an AI decision workflow.

A decision prompt is sent to Gemini, which returns either **YES** or **NO**. Inngest executes the workflow and follows the corresponding branch.

```text
React Flow
    ↓
Decision Node
    ↓
Run Workflow
    ↓
Next.js API
    ↓
Inngest
    ↓
Gemini
    ↓
YES / NO
   ↙     ↘
Support  Sales
```

## Features

- Visual workflow editor using React Flow
- Editable AI decision prompts
- YES / NO decision branches
- Real AI decisions using Google Gemini
- Inngest-powered workflow execution
- Execution status and logs
- Workflow persistence using localStorage
- JSON workflow export
- JSON workflow import
- Basic error handling

## Tech Stack

- **Next.js** — React framework
- **TypeScript** — Type-safe development
- **React Flow** — Visual workflow editor
- **Inngest** — Durable workflow execution
- **Google Gemini** — AI decision engine
- **Tailwind CSS** — Styling

## Project Structure

```text
flyrank-ai-decision-flow/
│
├── app/
│   ├── api/
│   │   ├── decision/
│   │   │   └── route.ts
│   │   ├── inngest/
│   │   │   └── route.ts
│   │   └── workflow/
│   │       └── route.ts
│   │
│   └── page.tsx
│
├── components/
│   └── DecisionNode.tsx
│
├── lib/
│   ├── gemini.ts
│   └── inngest/
│       ├── client.ts
│       └── functions.ts
│
├── public/
├── .env.local
├── package.json
└── README.md
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
INNGEST_DEV=1
```

Keep `.env.local` private and never commit your API key to GitHub.

## Installation

Install the project dependencies:

```bash
npm install
```

## Running the Project

### Start Next.js

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### Start Inngest

Open another terminal and run:

```bash
npx --ignore-scripts=false inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

The Inngest development dashboard will be available at:

```text
http://localhost:8288
```

## Using the Application

1. Open the application at `http://localhost:3000`.
2. Edit the prompt inside the AI Decision node.
3. Click **Run Workflow**.
4. The workflow is sent to Inngest.
5. Inngest executes the AI decision step.
6. Gemini evaluates the prompt.
7. Gemini returns `YES` or `NO`.
8. The workflow follows the corresponding branch.
9. Execution details can be viewed in the Inngest dashboard.

## Example

Decision prompt:

```text
Is this a support request?
```

Gemini may return:

```text
YES
```

The workflow follows:

```text
AI Decision
     ↓
    YES
     ↓
  Support
```

For a decision returning `NO`:

```text
AI Decision
     ↓
     NO
     ↓
   Sales
```

## Workflow Persistence

The current workflow is stored in the browser using `localStorage`.

This means edited prompts remain available after refreshing the page.

Workflows can also be:

- Exported as JSON
- Imported from JSON

## Inngest Workflow

The main Inngest workflow is:

```text
workflow/decision
        ↓
decision-workflow
        ↓
ai-decision
        ↓
Gemini
        ↓
follow-branch
        ↓
Support / Sales
```

## Assignment

**Program:** FlyRank Backend AI Engineering

**Assignment:** BE-09 — Build an AI Decision Flow with React Flow + Inngest

**Phase:** Build+

## Learning Outcomes

This project demonstrates:

- Building a visual workflow editor
- Managing React state
- Persisting frontend state with localStorage
- Creating API routes with Next.js
- Integrating an external LLM
- Using Gemini for structured AI decisions
- Creating event-driven workflows with Inngest
- Implementing conditional workflow branching
- Tracking workflow execution
- Importing and exporting workflow data