---
id: mcp-spec
title: MCP Specification
type: documentation
audience: [developers, agents]
updated_at: 2026-04-17
---

# MCP Specification

This document defines how the Visual Intelligence Archive is exposed as MCP (Model Context Protocol) resources, prompts, and tools.

## Overview

An MCP server built on this repo exposes three surfaces:

| Surface | What it provides |
|---|---|
| **Resources** | Retrievable documents: concepts, manifesto texts, agent notes |
| **Prompts** | Callable prompt templates: interpret, compare, score |
| **Tools** | Concept lookup by ID or tag |

The server is a read-only interpretive framework. It does not store user data, execute image models, or provide ground-truth labels.

## Resource URIs

Resources use the scheme `visual-intelligence://`. The full URI map is in `mcp/resource-map.json`.

| URI | Content | File |
|---|---|---|
| `visual-intelligence://concepts/witness` | Witness concept definition | `concepts/witness.md` |
| `visual-intelligence://concepts/description-vs-inference` | Description vs inference | `concepts/description-vs-inference.md` |
| `visual-intelligence://concepts/recurrence` | Recurrence definition | `concepts/recurrence.md` |
| `visual-intelligence://concepts/symbolic-candidate` | Symbolic candidate definition | `concepts/symbolic-candidate.md` |
| `visual-intelligence://concepts/archive-context` | Archive context definition | `concepts/archive-context.md` |
| `visual-intelligence://concepts/interpretive-restraint` | Interpretive restraint | `concepts/interpretive-restraint.md` |
| `visual-intelligence://concepts/prohibited-inferences` | Prohibited inferences | `concepts/prohibited-inferences.md` |
| `visual-intelligence://manifesto/the-viewer` | The Viewer manifesto | `manifesto/the-viewer.md` |
| `visual-intelligence://manifesto/art-for-ai` | Art for AI manifesto | `manifesto/art-for-ai.md` |
| `visual-intelligence://agent-notes/visual-intelligence-v1` | Processing model | `agent-notes/visual-intelligence-v1.md` |

## Prompt Definitions

Prompts are defined in `prompts/`. The prompt map is in `mcp/prompt-map.json`.

| Prompt name | Purpose | File |
|---|---|---|
| `interpret_image_888` | Two-pass image interpretation (description → inference) | `prompts/interpret_image_888.md` |
| `compare_images_888` | Side-by-side comparison with recurrence analysis | `prompts/compare_images_888.md` |
| `score_interpretation` | Evaluate an interpretation record against framework constraints | `prompts/score_interpretation.md` |

## Tool Definition

One tool is defined:

**`lookup_concept`**

Accepts a concept ID or retrieval hint. Returns the full content of the matching concept file.

```json
{
  "name": "lookup_concept",
  "description": "Look up a Visual Intelligence concept by ID or keyword",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Concept ID (e.g. 'witness') or retrieval keyword"
      }
    },
    "required": ["query"]
  }
}
```

## What This Server Does Not Do

- Does not process images directly (no vision model embedded)
- Does not provide ground-truth symbolic interpretations
- Does not store sessions or user data
- Does not claim authority over art historical questions

The server provides the interpretive framework. Image processing happens in the calling agent.

## Implementation

A starter scaffold is available in `mcp-server/`. See `mcp/server-outline.md` for the implementation plan.
