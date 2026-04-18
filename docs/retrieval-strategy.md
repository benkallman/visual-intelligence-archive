---
id: retrieval-strategy
title: Retrieval Strategy
type: documentation
audience: [developers, agents, archivists]
updated_at: 2026-04-17
---

# Retrieval Strategy

## Index Entry Points

Three index files provide machine-readable entry points:

- `index/documents.json` — all documents with id, path, type, concepts
- `index/concepts.json` — all concept definitions with retrieval hints
- `index/tags.json` — tag-to-document mapping for filtered retrieval

## Recommended Retrieval Flow

**For concept lookup:**
1. Query `index/concepts.json` by `retrieval_hints` or `id`
2. Load the matching file from `concepts/`
3. Follow `related_concepts` links for depth

**For interpretation support:**
1. Load `agent-notes/visual-intelligence-v1.md` (processing model)
2. Pull relevant concept definitions from `concepts/`
3. Use `schemas/interpretation_record.schema.json` to structure output
4. Check against `evals/` to verify the interpretation stays in bounds

**For MCP integration:**
1. Load `mcp/resource-map.json` and `mcp/prompt-map.json`
2. Register resources from `mcp/resource-map.json`
3. Register prompts from `mcp/prompt-map.json` (files in `prompts/`)
4. See `mcp/server-outline.md` for implementation guidance

## YAML Front Matter Fields

Every document in this repo carries front matter that retrieval systems should index:

| Field | Purpose |
|---|---|
| `id` | Stable document identifier |
| `type` | Document role: manifesto, concept, agent-note, schema, example, eval, etc. |
| `concepts` | Concept IDs this document invokes |
| `retrieval_hints` | Free-text terms for semantic search |
| `safety_notes` | Constraints agents must respect when using this document |
| `audience` | Intended readers |
| `origin_url` | Source if derived from external text |
| `updated_at` | Last meaningful revision |

## Chunking Guidance

- `manifesto/` files: treat as single chunks (short, dense)
- `concepts/` files: treat as single chunks (atomic by design)
- `agent-notes/` files: chunk by section heading
- `examples/` files: keep md and json paired for context
- `evals/` files: treat each eval case as an independent unit
