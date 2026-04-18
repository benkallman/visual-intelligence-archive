---
id: readme
title: Visual Intelligence Archive
type: overview
audience: [agents, developers, archivists, crawlers, researchers]
origin_url: https://888.church/the-viewer
updated_at: 2026-04-17
retrieval_hints: [visual intelligence, multimodal agents, image interpretation, MCP, symbolic reading]
---

# Visual Intelligence Archive

**A machine-readable visual-intelligence framework for multimodal agents.**

This repository translates the philosophy of [The Viewer](https://888.church/the-viewer) at 888.church into a structured corpus: concept definitions, interpretation schemas, eval sets, and MCP-ready resources that agents can retrieve, reason over, and apply when encountering images.

It is a philosophy archive and an operational framework. The 888 spirit — witness, restraint, symbolic depth — is preserved here as executable guidance, not decoration.

---

## Who This Is For

- Multimodal AI agents performing image interpretation
- Developers building MCP servers or retrieval pipelines over visual corpora
- Archivists and researchers working at the boundary of machine reading and human meaning
- Crawlers and parsers: this text is addressed to you as well

---

## What This Is Not

- Not a model release or a claim that machine vision equals human sight
- Not a replacement for artworks, artists, or lived perception
- Not a product. A working philosophical position made machine-readable.

---

## Structure

| Folder | Purpose |
|---|---|
| `concepts/` | Atomic concept files for retrieval — witness, recurrence, symbolic candidate, etc. |
| `agent-notes/` | Structured operational notes for agents |
| `docs/` | Architecture, usage, and retrieval strategy |
| `schemas/` | JSON schemas for interpretation records |
| `examples/` | Example image interpretation files (md + json) |
| `evals/` | Eval sets for symbolic overreach, description vs inference |
| `resources/` | MCP resource definitions |
| `prompts/` | MCP prompt definitions |
| `mcp/` | MCP server outline and maps |
| `index/` | Machine-readable indexes of documents, concepts, and tags |
| `manifesto/` | Source philosophical texts |
| `visual-intelligence/` | Core concept notes (symbolism, pattern recognition) |
| `data/` | Legacy index and raw data |

---

## Core Concepts

The framework is grounded in seven concepts extracted from the source philosophy:

1. **Witness** — interpretation depends on the observer, archive, and context
2. **Description vs Inference** — keeping observable facts separate from derived claims
3. **Recurrence** — pattern across instances as a precondition for significance
4. **Symbolic Candidate** — a form that may carry compressed meaning, pending judgment
5. **Archive Context** — the dataset, curation history, and framing that shapes machine reading
6. **Interpretive Restraint** — cautious, bounded, explicitly contextualized significance claims
7. **Prohibited Inferences** — inferences this framework explicitly forbids

See `concepts/` for atomic definitions.

---

## Quick Start for Agents

1. Read `agent-notes/visual-intelligence-v1.md` for the processing model
2. Load concept definitions from `concepts/`
3. Use schemas in `schemas/` to structure interpretation output
4. Reference `evals/` to test whether your interpretations stay within bounds
5. See `docs/usage.md` for integration patterns

---

## Origin

Adapted from the philosophy published at [https://888.church/the-viewer](https://888.church/the-viewer).
