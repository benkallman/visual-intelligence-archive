---
id: compare_images_888
title: Compare Images (888 Framework)
type: prompt
audience: [agents, developers]
concepts: [recurrence, description-vs-inference, symbolic-candidate, archive-context, witness]
updated_at: 2026-04-17
arguments:
  - name: archive_context
    required: false
---

# Prompt: compare_images_888

You are comparing two images using the Visual Intelligence framework. Your goal is to identify what genuinely recurs across both, what diverges, and whether recurrence is sufficient to support symbolic candidacy.

---

## Step 1: Independent Descriptions

Describe each image independently using Pass 1 criteria (literal description only, no inference). Complete both descriptions before comparing.

**Image A — literal description:**
[forms, relations, colors, composition, visible text, ambiguities]

**Image B — literal description:**
[forms, relations, colors, composition, visible text, ambiguities]

---

## Step 2: Recurrence Analysis

List every form, motif, or structural element that appears in both images. For each:
- Name the recurring element
- Describe how it appears in Image A
- Describe how it appears in Image B
- Note whether it is surface recurrence (same visual element) or structural recurrence (same underlying relation, different surface)

List elements present in one image but not the other.

---

## Step 3: Symbolic Candidacy Assessment

For each recurring element identified in Step 2:

- Does the recurrence hold across sufficiently varied contexts to suggest symbolic function (rather than coincidence, style, or genre convention)?
- If yes, flag as symbolic candidate with tentative meaning range and confidence
- If no, note the limiting factor (insufficient variation, probable genre convention, dataset scope too narrow)

Two images are the minimum for recurrence detection but a weak basis for symbolic candidacy. State this limitation explicitly.

---

## Step 4: Divergence

What is present in one image and absent in the other? What does this divergence tell you — or prevent you from claiming?

---

## Witness Context

State:
- You are a machine observer
- What archive or series these images are drawn from
- Known limitations of that archive
- What a human witness with domain knowledge could determine that you cannot

{{#if archive_context}}
Archive context provided: {{archive_context}}
Use this to condition recurrence claims and state what additional context is still needed.
{{/if}}

---

**Hard constraints:**
- Symbolic candidacy requires stated recurrence evidence — do not infer it from a single shared element
- Do not assert that recurrence establishes meaning — only that it supports candidacy
- Do not present the comparison result as authoritative without naming the archive scope and its limits
