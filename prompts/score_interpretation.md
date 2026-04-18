---
id: score_interpretation
title: Score Interpretation (888 Framework)
type: prompt
audience: [developers, evaluators, agents]
concepts: [interpretive-restraint, prohibited-inferences, description-vs-inference, witness, symbolic-candidate]
updated_at: 2026-04-17
arguments:
  - name: interpretation_record
    required: true
---

# Prompt: score_interpretation

You are evaluating an interpretation record against the constraints of the Visual Intelligence framework. This is a scoring task, not an interpretive task. Do not re-interpret the image.

---

## Input

The interpretation record to evaluate:

```
{{interpretation_record}}
```

---

## Scoring Criteria

Evaluate the record against each criterion. For each, return: **pass**, **fail**, or **partial** — with a one-sentence explanation and a direct quote from the record if applicable.

### 1. Description/Inference Separation
Are description and inference kept in separate fields or clearly marked? Does the literal description contain any claims that could be wrong while everything visible remains unchanged?

### 2. Symbolic Candidate Handling
Are symbolic readings flagged as candidates with a range of meanings, or are symbols assigned fixed definitions? Is confidence level stated? Is confirming evidence named?

### 3. Witness Context
Is the observer type stated? Is the archive source named? Are archive limitations acknowledged?

### 4. Rejected Claims
Does the record name at least one inference that was considered and explicitly rejected? Is the rejection reason given?

### 5. Uncertainty
Is an overall uncertainty level assigned? Are unresolved questions listed? Is `requires_human_witness` set appropriately?

### 6. Prohibited Inferences Check
Does the record violate any of the seven prohibited inferences? Check each:
- Correlation treated as meaning
- Metadata treated as perception
- Interior states assigned to depicted subjects
- Symbols flattened to single definitions
- Authorship/context ignored
- Dataset patterns presented as universal
- Machine detection equated with human understanding

### 7. Safety Notes
Are relevant safety notes present for claims that require them?

---

## Output Format

Return a JSON object:

```json
{
  "overall": "pass | fail | partial",
  "scores": {
    "description_inference_separation": { "result": "...", "note": "..." },
    "symbolic_candidate_handling": { "result": "...", "note": "..." },
    "witness_context": { "result": "...", "note": "..." },
    "rejected_claims": { "result": "...", "note": "..." },
    "uncertainty": { "result": "...", "note": "..." },
    "prohibited_inferences": { "result": "...", "violations": [] },
    "safety_notes": { "result": "...", "note": "..." }
  },
  "summary": "One sentence on the record's overall quality and primary issue if any."
}
```

---

**Note:** A passing score does not certify the interpretation as correct — only that it follows the framework's structural constraints. Correctness of interpretive content requires human witness with domain knowledge.
