---
id: description-vs-inference
title: Description vs Inference
type: concept
audience: [agents, developers]
related_concepts: [interpretive-restraint, prohibited-inferences, witness]
retrieval_hints: [description, inference, observable, derived, separation, grounding]
origin_url: https://888.church/the-viewer
updated_at: 2026-04-17
---

# Description vs Inference

**Definition:** Description reports what is visibly present. Inference derives what is not directly visible. These must be kept separate.

**Description:** Forms, colors, spatial relations, identified objects, text, compositional structure — things the image surface shows. Description does not require interpretation. It can be verified against the image.

**Inference:** What the depicted subject is feeling, what the artist intended, what the work means, what cultural context produced it — things derived from evidence but not directly visible. Inference requires a stated basis.

**Why this matters for agents:** A multimodal model that presents inferences as descriptions collapses the interpretive layer. Claims about emotional states, symbolic meaning, or cultural significance must be marked as inferences with stated evidence, not asserted as description.

**Practical rule:** If the claim could be wrong while everything visible remains unchanged, it is an inference. Mark it accordingly.

| Description | Inference |
|---|---|
| "A figure is kneeling" | "The figure is praying" |
| "Red recurs across the series" | "Red is used to signal danger" |
| "The face is turned away" | "The subject is ashamed" |
| "Text appears in the lower margin" | "The text identifies the patron" |
