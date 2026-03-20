# AGENTS NOTES

# EVALS

<details>
<summary>Click to expand / collapse</summary>


## WHY WE NEED EVALS?

- Agents are non-deterministic - The same input can produce different outputs, making traditional testing insufficient

- Quality regression - Model updates, prompt changes, or tool modifications can silently degrade performance

- Confidence in deployment - You need quantifiable metrics before shipping changes

- Debugging - When something goes wrong, you need to understand why the agent made certain decisions

Without evals, you're flying blind.
You might think your agent is working great based on a few manual tests, but in production it could be failing in ways you never anticipated.
 
## Single-Turn Evals

<details open>

  <summary>Click to expand/collapse</summary> <br />

Single-turn evals test ONE interaction - a user message and the agent's immediate response.

They're perfect for testing:

- Tool selection - Did the agent pick the right tool(s)?
- Parameter extraction - Did it extract the correct ARGUMENTS?
- Refusal behavior - Did it correctly NOT use tools when inappropriate?

Single-turn evals are fast, cheap, and give you high signal on whether your agent understands when to use which tools.

</details>

## Eval Categories

We use three categories to organize test cases:

1. Golden - Must select EXACTLY the expected tools. No ambiguity.

2. Secondary - LIKELY selects certain tools, but there's flexibility. Scored on precision/recall.

3. Negative - Must NOT select forbidden tools. Tests that the agent DOESN'T over-reach.

## Scorers (Evaluators) 

Scorers are functions that take the agent's output and the expected target, returning a score (usually 0-1):

toolsSelected - Binary: did it select ALL expected tools?
toolsAvoided - Binary: did it avoid ALL forbidden tools?
toolSelectionScore - F1 score (precision/recall balance) for partial credit


## Where You Get Data for Evals 

Synthetic data - Write examples yourself based on expected use cases (what we're doing)

Production logs - Sample real user interactions (best for online evals)

Edge case mining - Find failure cases in production and add to test suite

Red teaming - Intentionally try to break the agent and capture those cases

LLM-generated - Use another LLM to generate test cases (be careful of bias)

## Hill Climbing with Evals 

Evals enable hill climbing - iteratively improving your agent:

Run evals, get baseline scores
Make a change (prompt, model, tools, etc.)
Run evals again
If scores improved, keep the change. If not, revert.
Repeat
This is how you systematically improve agents without relying on vibes. Every change is justified by data.

</details>
