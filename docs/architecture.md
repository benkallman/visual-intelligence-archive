---
id: architecture
title: Architecture
type: documentation
audience: [developers, agents]
updated_at: 2026-04-17
---

# Architecture

## Overview

The Visual Intelligence Archive is organized into layers that move from raw philosophy to machine-operational resources.

```
manifesto/          ← source philosophical texts (human-readable origin)
visual-intelligence/ ← core concept essays (extended form)
concepts/           ← atomic concept definitions (retrieval units)
agent-notes/        ← processing instructions for agents
schemas/            ← JSON schemas for structured output
examples/           ← worked interpretation instances
evals/              ← test cases for interpretation correctness
resources/          ← MCP resource definitions
prompts/            ← MCP prompt definitions
mcp/                ← MCP server outline and maps
docs/               ← this folder: usage, architecture, retrieval
index/              ← machine-readable document and concept indexes
data/               ← legacy index
```

## Design Principles

**1. Philosophy grounded, machine-readable.** Every concept traces back to the 888.church source texts. Nothing is invented for API convenience.

**2. Separation of layers.** The manifesto texts are narrative. Concept files are atomic definitions. Schemas define output structure. Evals test boundary conditions. These are not interchangeable.

**3. Retrieval-first structure.** Each file carries YAML front matter with `id`, `type`, `concepts`, and `retrieval_hints` so retrieval systems can index without reading full content.

**4. Explicit limits.** The framework names what agents should not infer, not only what they should do. See `concepts/prohibited-inferences.md` and `concepts/interpretive-restraint.md`.

## Key Boundaries

| Allowed | Not Allowed |
|---|---|
| Describe visible forms | Assert emotional interior of depicted subjects |
| Note recurrence | Assign fixed symbolic meaning without context |
| Identify symbolic candidates | Claim pattern equals meaning |
| State archive context | Treat dataset bias as neutral |
| Assign provisional significance with stated basis | Equate machine detection with human understanding |
