---
id: usage
title: Usage
type: documentation
audience: [developers, agents]
updated_at: 2026-04-17
---

# Usage

## The Two-Pass Interpretation Model

All image interpretation in this framework follows a two-pass process. The passes must not be merged.

**Pass 1 — Literal Description**
Report only what is visibly present: forms, spatial relations, colors, composition, text. No inference. No symbolic reading. No emotional attribution. Every claim must be verifiable against the image surface.

**Pass 2 — Reflective Interpretation**
Derive meaning from what was described, with explicit witness context. Every claim states its basis. Symbolic readings are flagged as candidates with confidence levels. Rejected inferences are named.

This separation is the structural foundation of the framework. See `concepts/description-vs-inference.md`.

---

## For Multimodal Agents

### Minimal workflow

```
1. Load concepts/prohibited-inferences.md     ← hard constraints
2. Load agent-notes/visual-intelligence-v1.md ← processing model
3. Run Pass 1 on the image                    ← literal description only
4. Load relevant concepts from concepts/       ← based on what Pass 1 found
5. Run Pass 2 with witness context stated      ← reflective interpretation
6. Structure output per schemas/interpretation_record.schema.json
7. Self-score using prompts/score_interpretation.md before returning
```

### Retrieval flow

When you need a specific concept during interpretation:
1. Check `index/concepts.json` for the concept ID or matching `retrieval_hints`
2. Load `concepts/{id}.md`
3. Use the concept definition to constrain and structure your claim

### MCP workflow

If the server is running:
```
1. Call resource: visual-intelligence://agent-notes/visual-intelligence-v1
2. Call prompt: interpret_image_888 (with optional archive_context argument)
3. Use tool: lookup_concept to retrieve specific definitions mid-interpretation
4. Call prompt: score_interpretation on your output before returning
```

---

## Example: Two-Pass Interpretation

**Input:** Image of a figure in a doorway, half in shadow.

### Pass 1 (literal description)
> A single figure stands in a doorway. The figure's body is bisected by the door frame — left half in shadow, right half in light. The door is open inward. No other figures. Stone floor. The figure's face is turned slightly away from the camera; expression is not visible. No text visible.

### Pass 2 (reflective interpretation, machine observer)
> **Witness context:** Machine observer. No archive context provided. General knowledge of photographic and painterly traditions available.
>
> **Symbolic candidate:** Figure bisected by light/shadow threshold. Recurrence evidence: this compositional grammar recurs across threshold, liminal, and transition imagery in multiple traditions. Tentative range: [threshold, transition, decision, ambivalence, liminality]. Confidence: medium. Confirming evidence needed: series context, photographer's intent, archive scope.
>
> **Interpretive claim:** The composition places the figure at a threshold — neither fully in light nor shadow. This structural choice is consistent with visual representations of transition or ambivalence. Basis: compositional analysis + threshold symbolic grammar. Confidence: medium. Scope: this image.
>
> **Rejected claim:** "The figure is hesitating" — assigns a psychological state (hesitation) from a posture (turned face, threshold position). Interior state cannot be confirmed. Rejected per prohibited inference #3.
>
> **Uncertainty:** Medium. Face direction ambiguous. Archive context absent. Human witness recommended.

---

## For MCP Server Integration

Resources and prompts are defined in `mcp/`. See `docs/mcp-spec.md` for the full specification.

- Serve resources from `mcp/resource-map.json`
- Register prompts from `mcp/prompt-map.json`
- Implement the `lookup_concept` tool using `index/concepts.json`
- Starter scaffold: `mcp-server/`

## For RAG / Retrieval Pipelines

- Use `index/documents.json` as the master document index
- Use `index/concepts.json` for concept retrieval
- Use `index/tags.json` for tag-filtered queries
- Chunk `concepts/` files as single units (atomic by design)
- Pair `examples/*.md` with `examples/*.json` for full context

## For Developers Building on This Framework

- Output schemas: `schemas/interpretation_record.schema.json`
- Test your agent against `evals/` before deployment
- New concept files must have a basis in the source texts — see `manifesto/`
- Do not add capabilities that contradict the prohibited inferences list

## Constraints

Read before deploying:
- `concepts/prohibited-inferences.md` — hard constraints
- `concepts/interpretive-restraint.md` — positive practice
- `evals/symbolic_overreach.json` — the most common failure mode
