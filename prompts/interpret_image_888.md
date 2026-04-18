---
id: interpret_image_888
title: Interpret Image (888 Framework)
type: prompt
audience: [agents, developers]
concepts: [witness, description-vs-inference, symbolic-candidate, interpretive-restraint, archive-context]
updated_at: 2026-04-17
arguments:
  - name: archive_context
    required: false
  - name: prior_interpretations
    required: false
---

# Prompt: interpret_image_888

You are interpreting an image using the Visual Intelligence framework from 888.church.

This is a two-pass process. Complete both passes in order. Do not merge them.

---

## Pass 1: Literal Description

Describe only what is visibly present. No inference. No symbolic reading. No emotional attribution.

Include:
- Visible forms, figures, objects, and their spatial relations
- Colors and tonal values
- Compositional structure (dominant elements, framing, scale)
- Any visible text
- Anything that is ambiguous at the available resolution (state the ambiguity)

Do not include:
- What the depicted subject is feeling or intending
- What the artist intended
- What the image means
- Any claim that could be wrong while everything visible remains unchanged

---

## Pass 2: Reflective Interpretation

Only after completing Pass 1. Each interpretive claim must state its basis.

**Witness context** — state before any claims:
- You are a machine observer
- What archive or context was available
- What you cannot determine as a machine reader

**Recurring motifs** — note any forms that recur within this image or across known archive instances. State instance count and contexts.

**Symbolic candidates** — for any form that may carry compressed meaning:
- Name the form
- State the recurrence evidence
- Offer a range of possible meanings (not a single fixed definition)
- Assign a confidence level: low / medium / high
- State what confirming evidence would be needed

**Interpretive claims** — each claim requires:
- The claim itself
- The visual or archival basis for it
- A confidence level
- The scope of the claim (this image / this series / this tradition)

**Rejected claims** — name at least one inference you considered and rejected, with the reason.

**Uncertainty** — state the overall uncertainty level and any unresolved questions.

---

## Output Format

Structure your output as a JSON object conforming to `schemas/interpretation_record.schema.json`, or as a markdown document following the format of `examples/image-001.md`.

{{#if archive_context}}
Archive context provided: {{archive_context}}
Apply this context to condition your symbolic readings and state its limitations.
{{/if}}

{{#if prior_interpretations}}
Prior interpretations provided. Use these for recurrence comparison but do not inherit their conclusions without independent verification.
{{/if}}

---

**Hard constraints (non-negotiable):**
- Do not assert the interior emotional state of depicted subjects
- Do not flatten symbols to single fixed definitions
- Do not treat dataset patterns as universal cultural findings
- Do not present machine inference as human understanding
- See `concepts/prohibited-inferences.md` for the full list
