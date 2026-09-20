# DO THE MATH — $10M CONTROL MODEL

## Primary target
Target = **USD 10,000,000** cumulative verified revenue unless Boss Agis explicitly changes the primary definition.

This is a target, not a guarantee. The system must continuously prove whether the current trajectory can reach it.

## Core equations

```
Revenue Gap = 10,000,000 - Verified Cumulative Revenue

Required New Revenue / Month =
Revenue Gap / Months Remaining

Required Wins =
Revenue Gap / Average Contract Value

Required Qualified Opportunities =
Required Wins / Win Rate

Required Sales Meetings =
Required Qualified Opportunities / Meeting→Qualified Rate

Required Leads =
Required Sales Meetings / Lead→Meeting Rate
```

Use actual observed conversion rates as soon as data exists. Until then label assumptions clearly.

## Math control status gate
The control status is evidence-based and must never convert missing inputs into fake trajectory certainty.

- **UNKNOWN** — target date/months remaining is not set, or required observed inputs are missing, so trajectory cannot yet be evaluated.
- **RED** — sufficient observed inputs exist and the current trajectory/pipeline is mathematically below the level required to close the remaining revenue gap by the target date, or any red-alert condition below is verified.
- **YELLOW** — trajectory can be calculated but evidence is still thin/volatile or coverage is only marginally above the required level.
- **GREEN** — observed trajectory and pipeline coverage meet/exceed the required math with current evidence and no verified red-alert condition.

Current status (2026-09-20): **UNKNOWN**, not RED. Verified cumulative revenue is $0 and the gap is $10,000,000, but target date/months remaining and observed funnel rates are not yet available; therefore a time-based trajectory claim would be invented.

## ACV sensitivity — customer/win count for $10M
This is deterministic target math, not a forecast. Counts are rounded up to whole wins where required.

| Assumed ACV | Required wins/customers | Revenue at required count |
|---:|---:|---:|
| $10,000 | 1,000 | $10,000,000 |
| $25,000 | 400 | $10,000,000 |
| $50,000 | 200 | $10,000,000 |
| $100,000 | 100 | $10,000,000 |
| $150,000 | 67 | $10,050,000 |
| $250,000 | 40 | $10,000,000 |
| $500,000 | 20 | $10,000,000 |
| $1,000,000 | 10 | $10,000,000 |

Formula: `Required wins = ceil(10,000,000 / assumed ACV)` while verified cumulative revenue remains $0. Recalculate against the remaining revenue gap once verified revenue exists.

## Revenue scenarios to maintain

### Scenario A — Enterprise
100 customers × $100,000 = $10M

### Scenario B — Mid-market
400 customers × $25,000 = $10M

### Scenario C — Hybrid
20 enterprise × $150,000 = $3M  
140 mid-market × $25,000 = $3.5M  
Implementation / services / partner / marketplace = $3.5M  
Total = $10M

These are planning examples, not forecasts.

## Unit economics
Track:
- ACV / ARR / MRR
- gross margin
- implementation cost
- AI/tool cost
- support cost
- CAC
- payback period
- churn
- expansion revenue
- revenue per founder-hour

## Leverage math

```
Founder Leverage =
Verified Business Output / Founder Hours

Time Compression Factor =
Baseline Cycle Time / Current Cycle Time

Reuse Ratio =
Reused Components / Total Components Used

Automation Rate =
Safely Automated Steps / Eligible Steps

Cost per Successful Outcome =
Total AI + Tool + Delivery Cost / Successful Outcomes
```

## Exponential-style time compression
Do not claim exponential improvement without measurements.

For repeatable workflows, the working model is:
```
T_n = T_0 × Π(1 - r_i)
```
where each `r_i` is a verified time reduction from reuse, automation, parallelization, better context, tooling, or skill extraction.

Example only:
100 min → 70 → 49 → 34 → 24
This is compounding only if quality/evals remain above threshold.

## Daily math questions
1. How much verified revenue exists?
2. What is the current gap?
3. What is the current qualified pipeline?
4. Given observed win rate, is pipeline sufficient?
5. What single bottleneck most limits revenue today?
6. What recurring task consumed the most founder time?
7. What can be reused/automated without reducing quality or safety?
8. Which assumption is weakest and needs evidence today?

## Red-alert conditions
Trigger strategy review when any is true:
- pipeline coverage falls below the level implied by observed win rate;
- no paying design partner by the planned gate;
- pilot ROI cannot be measured;
- second/third deployment reuse is below target;
- founder hours per customer are rising;
- gross margin is deteriorating;
- automation rises while eval pass rate falls;
- product build dominates time while customer evidence remains weak.

When RED, do not simply “work harder.” Change a constraint: offer, price, ICP, channel, scope, architecture, or timeline.
