import { DemoData } from './types';

export const demoData: DemoData = {
  queries: [
    {
      id: 'q1',
      suggestedText: "What were the top three urgent issues concluded from the last VP-level meeting? Any one that's slacking and delaying without my knowledge?",
      text: "What were the top three urgent issues concluded from the last VP-level meeting? Any one that's slacking and delaying without my knowledge?"
    },
    {
      id: 'q2',
      suggestedText: "We are about to finalize Q2 earnings report. Is our Q2 ARR target on track? Are there any hidden risks that require my immediate attention?",
      text: "We are about to finalize Q2 earnings report. Is our Q2 ARR target on track? Are there any hidden risks that require my immediate attention?"
    },
    {
      id: 'q3',
      suggestedText: "We currently have 5 business lines and I am considering cutting 1 or 2. Make me an in-depth analysis to suggest which ones we should double down on, which ones to limit.",
      text: "We currently have 5 business lines and I am considering cutting 1 or 2. Make me an in-depth analysis to suggest which ones we should double down on, which ones to limit."
    }
  ],
  ontologyObjects: [
    { id: 'Meeting', label: 'Meeting', category: 'Execution', x: 550, y: 100 },
    { id: 'Issue', label: 'Issue', category: 'Execution', x: 550, y: 400 },
    { id: 'Owner', label: 'Owner', category: 'Execution', x: 1050, y: 250 },
    { id: 'Commitment', label: 'Commitment', category: 'Execution', x: 1000, y: 550 },
    { id: 'ActionItem', label: 'Action Item', category: 'Execution', x: 100, y: 250 },
    { id: 'Progress', label: 'Progress', category: 'Execution', x: 550, y: 700 },
    { id: 'ComputedJudgment', label: 'Computed Judgment', category: 'Strategic', x: 200, y: 900 },
    
    { id: 'Revenue', label: 'Revenue', category: 'Business', x: 500, y: 350 },
    { id: 'Contract', label: 'Contract', category: 'Business', x: 800, y: 200 },
    { id: 'Payment', label: 'Payment', category: 'Business', x: 900, y: 500 },
    { id: 'Project', label: 'Project', category: 'Business', x: 600, y: 650 },
    { id: 'Risk', label: 'Risk', category: 'Strategic', x: 250, y: 400 },
    { id: 'ManagementView', label: 'Management View', category: 'Organization', x: 100, y: 200 },
    { id: 'Judgment', label: 'Judgment', category: 'Strategic', x: 200, y: 650 },

    { id: 'BusinessUnit', label: 'Business Unit', category: 'Business', x: 500, y: 300 },
    { id: 'Customer', label: 'Customer', category: 'Business', x: 800, y: 150 },
    { id: 'Organization', label: 'Organization', category: 'Organization', x: 200, y: 200 },
    { id: 'Product', label: 'Product', category: 'Business', x: 900, y: 450 },
    { id: 'GrowthJudgment', label: 'Growth Judgment', category: 'Strategic', x: 600, y: 600 },

    { id: 'Evidence', label: 'Evidence', category: 'Evidence', x: 1000, y: 800 }
  ],
  relationships: [
    { id: 'e1', source: 'Meeting', target: 'Issue', label: 'raises' },
    { id: 'e2', source: 'Issue', target: 'Commitment', label: 'creates' },
    { id: 'e3', source: 'Issue', target: 'ActionItem', label: 'requires' },
    { id: 'e4', source: 'Issue', target: 'Owner', label: 'assigned_to' },
    { id: 'e5', source: 'Issue', target: 'Progress', label: 'tracked_by' },
    { id: 'e6', source: 'Commitment', target: 'Progress', label: 'tracked_by' },
    { id: 'e7', source: 'ActionItem', target: 'Progress', label: 'has_status' },
    { id: 'e8', source: 'Progress', target: 'ComputedJudgment', label: 'supports' },
    { id: 'e9', source: 'Commitment', target: 'Evidence', label: 'evidenced_by' },

    { id: 'e10', source: 'Revenue', target: 'Commitment', label: 'committed_by' },
    { id: 'e11', source: 'Revenue', target: 'Contract', label: 'supported_by' },
    { id: 'e12', source: 'Revenue', target: 'Payment', label: 'supported_by' },
    { id: 'e13', source: 'Revenue', target: 'Project', label: 'linked_to' },
    { id: 'e14', source: 'Revenue', target: 'Risk', label: 'impacted_by' },
    { id: 'e15', source: 'Risk', target: 'ManagementView', label: 'surfaced_in' },
    { id: 'e16', source: 'Risk', target: 'Judgment', label: 'supports' },
    { id: 'e17', source: 'Risk', target: 'Evidence', label: 'supports' },

    { id: 'e18', source: 'BusinessUnit', target: 'Revenue', label: 'generates' },
    { id: 'e19', source: 'BusinessUnit', target: 'Customer', label: 'serves' },
    { id: 'e20', source: 'BusinessUnit', target: 'Organization', label: 'consumes' },
    { id: 'e21', source: 'BusinessUnit', target: 'Product', label: 'delivers' },
    { id: 'e22', source: 'BusinessUnit', target: 'GrowthJudgment', label: 'evaluated_by' },
    { id: 'e23', source: 'GrowthJudgment', target: 'Evidence', label: 'computed_from' }
  ],
  subgraphPresets: {
    q1: {
      nodes: ['Meeting', 'Issue', 'ActionItem', 'Commitment', 'Progress', 'Owner', 'Evidence', 'ComputedJudgment'],
      edges: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'],
      reasoningSteps: [
        { nodeId: 'Meeting', name: 'Meeting', tasks: ['Locate the last Chief of Staff Meeting.'] },
        { nodeId: 'Issue', name: 'Issues', tasks: ['Extract the three highest-priority issues raised by the CEO.'] },
        { nodeId: 'Commitment', name: 'Commitments', tasks: ['Identify related action items and commitments.'] },
        { nodeId: 'Progress', name: 'Progress', tasks: ['Compare commitments with actual progress after the meeting.'] },
        { nodeId: 'ComputedJudgment', name: 'Judgments', tasks: ['Compute: Commitment Decay, Intent Drift, Hidden Resistance, Escalation Need.'] }
      ]
    },
    q2: {
      nodes: ['Revenue', 'Commitment', 'Contract', 'Payment', 'Project', 'Risk', 'Evidence', 'ManagementView', 'Judgment'],
      edges: ['e10', 'e11', 'e12', 'e13', 'e14', 'e15', 'e16', 'e17'],
      reasoningSteps: [
        { nodeId: 'Revenue', name: 'Revenue', tasks: ['Identify A Project Revenue in Q2 ARR forecast.'] },
        { nodeId: 'Commitment', name: 'Commitment', tasks: ['Verify underlying revenue commitments.'] },
        { nodeId: 'Contract', name: 'Contract / Payment', tasks: ['Check if related contract is archived.', 'Check payment status and customer approval.'] },
        { nodeId: 'Risk', name: 'Risk', tasks: ['Assess hidden reporting risks.'] },
        { nodeId: 'Judgment', name: 'Judgment', tasks: ['Compute ARR impact and CEO-level risks.'] }
      ]
    },
    q3: {
      nodes: ['BusinessUnit', 'Revenue', 'Customer', 'Contract', 'Product', 'Organization', 'GrowthJudgment', 'Evidence'],
      edges: ['e18', 'e19', 'e20', 'e21', 'e22', 'e23'],
      reasoningSteps: [
        { nodeId: 'BusinessUnit', name: 'Business Unit', tasks: ['Analyze all 5 Business Lines.'] },
        { nodeId: 'Revenue', name: 'Revenue', tasks: ['Evaluate recurring revenue and ARR share.'] },
        { nodeId: 'Customer', name: 'Customer', tasks: ['Assess customer usage depth and renewal performance.'] },
        { nodeId: 'Product', name: 'Product / Organization', tasks: ['Determine product reuse and standardization.', 'Measure organizational burden and delivery capacity.'] },
        { nodeId: 'GrowthJudgment', name: 'Growth Judgment', tasks: ['Compute High-Quality Growth Judgment.'] }
      ]
    }
  },
  results: {
    q1: {
      title: 'Commitment Accountability Report',
      judgment: 'Execution decay detected across core meeting commitments.',
      judgmentSubtitle: 'The three issues have not been ignored, but they are showing signs of execution decay.',
      metrics: [
        { label: 'Risk Level', value: 'High', color: 'text-red-500' },
        { label: 'Impact', value: 'Medium', color: 'text-amber-500' },
        { label: 'CEO Attention', value: 'High', color: 'text-red-500' },
        { label: 'Trend', value: 'Worsening', color: 'text-red-500' }
      ],
      markdown: `
Boss AI identified that the CEO raised three priority issues in the last Chief of Staff Meeting:

| Issue | Current Status | AI Judgment |
| :--- | :--- | :--- |
| **Improve key customer renewal-risk management** | Partially progressing | The issue was recorded and discussed, but has not yet become a complete operating mechanism. |
| **Shorten cross-functional decision cycles** | Behind expectations | Several decisions remain in coordination without a single accountable owner. |
| **Make meeting commitments accountable** | Drifted | Meeting notes were generated, but several commitments lack owner, deadline, or evidence of completion. |

**Overall AI Judgment**

The three issues have not been ignored, but they are showing signs of **execution decay**.

The problem is not that nothing happened. The problem is that CEO-level issues were converted into fragmented departmental actions, and some commitments were recorded without becoming accountable execution.

**Recommended CEO Action**

1. **Review these three issues first** in the next Chief of Staff Meeting.
2. **Assign a single accountable owner** for each issue.
3. Put all related commitments into **14-day “Say-to-Do” tracking**.
4. **Automatically escalate** ownerless, overdue, or evidence-missing commitments.
`,
      recommendedActions: [
        'Review these three issues first in the next Chief of Staff Meeting.',
        'Assign a single accountable owner for each issue.',
        'Put all related commitments into 14-day “Say-to-Do” tracking.',
        'Automatically escalate ownerless, overdue, or evidence-missing commitments.'
      ]
    },
    q2: {
      title: 'Hidden Risks Integrity Report',
      judgment: 'One revenue item has high reporting risk and should not be counted as high-confidence ARR yet.',
      judgmentSubtitle: 'Underlying contract archive, payment confirmation, and project acceptance remain unresolved.',
      metrics: [
        { label: 'Risk Level', value: 'High', color: 'text-red-500' },
        { label: 'Impact', value: 'High', color: 'text-red-500' },
        { label: 'CEO Attention', value: 'Immediate', color: 'text-red-500' },
        { label: 'Trend', value: 'Critical', color: 'text-red-500' }
      ],
      markdown: `
Q2 ARR is currently close to target based on the forecast, but Boss AI detected one revenue item that should not be treated as high-confidence ARR yet.

**A Project Revenue** has been committed to be counted in Q2 ARR.

However, the underlying business objects do not fully support this commitment:
- The related contract **has not been archived**.
- Payment **has not been confirmed**.
- The project acceptance status is **still pending**.
- The project owner **has not submitted a final recognition-readiness update**.
- The item is still shown as **“on track”** in the management view.

**AI Judgment**

This is not a normal sales follow-up. It is a **hidden Q2 reporting risk**.

If the contract archive, payment confirmation, or project acceptance cannot be completed before the Q2 report is finalized, this revenue item may need to be adjusted from the Q2 ARR forecast, and the quarterly report narrative may need to be revised.

**Recommended CEO Action**

1. **Require a clear conclusion by 18:00 today**: Can A Project Revenue still be counted in Q2 ARR?
2. If not, what is the **ARR impact**?
3. Force action to **archive the contract** before the reporting deadline.
4. Push to **confirm payment approval** before quarter close.
5. Command the **project acceptance issue** to be closed this week.
6. Verify if this requires **CEO / CFO-level customer communication**.
`,
      recommendedActions: [
        'Require a clear conclusion by 18:00 today: Can A Project Revenue still be counted in Q2 ARR?',
        'Determine the exact ARR impact of removing this item.',
        'Confirm if the contract can be archived before the reporting deadline.',
        'Assess whether payment approval can be secured before quarter close.',
        'Force close the project acceptance issue this week.',
        'Initiate CEO / CFO-level customer communication if required.'
      ]
    },
    q3: {
      title: 'Growth Strategy Portfolio Analysis',
      judgment: 'Concentrate resources on Business Line A & B; limit Line D & E.',
      judgmentSubtitle: 'Growth should not be measured only by current revenue size, but by recurring capability and efficiency.',
      metrics: [
        { label: 'Strategy', value: 'Pivot', color: 'text-amber-500' },
        { label: 'Impact', value: 'High', color: 'text-red-500' },
        { label: 'Timeline', value: '90 Days', color: 'text-amber-500' },
        { label: 'Conviction', value: 'High', color: 'text-green-500' }
      ],
      markdown: `
Boss AI does not recommend allocating resources evenly across all five business lines.

Although all five business lines contribute revenue, they do not contribute the same quality of growth.

The analysis shows that **Business Line A** and **Business Line B** are more likely to generate high-quality growth because they show stronger signals in:
- Recurring ARR
- Renewal and expansion potential
- Reusable product capability
- Healthier contract structure
- Lower organizational burden relative to growth output

Meanwhile, **Business Line D** and **Business Line E** are generating visible activity and some near-term revenue, but they consume disproportionate organizational capacity and produce weaker repeatability.

### Recommended Allocation

| Business Line | Recommendation | AI Judgment |
| :--- | :--- | :--- |
| **Business Line A: Standard Platform Subscription** | **Double Down** | Strong recurring ARR, high renewal, high product reuse, and lower organization burden. |
| **Business Line B: Industry Product Package** | **Double Down / Standardize** | Strong demand and expansion potential, but needs further productization and standardized delivery. |
| **Business Line C: Strategic Enterprise Accounts** | **Watch / Selective Invest** | Valuable for flagship customers, but should only be supported when it creates reusable product capability or expansion path. |
| **Business Line D: Custom Project Delivery** | **Limit** | Generates revenue, but depends heavily on one-off projects, customization, and delivery capacity. |
| **Business Line E: Professional Services** | **Maintain / Defer** | Useful as customer entry or enablement, but weak as a primary growth engine due to high human dependency and limited product reuse. |

**Core Judgment**

Growth should not be measured only by current revenue size. The company should concentrate resources on business lines that improve:
- **Revenue quality**
- **Customer retention and expansion**
- **Product repeatability**
- **Contract health**
- **Organizational leverage**

**Recommended CEO Action**

1. **Concentrate incremental product, engineering, and leadership attention** on Business Line A and B.
2. **Require Business Line B** to standardize its package, pricing, and delivery model within 90 days.
3. **Limit Business Line D’s access** to core product and engineering resources unless the project creates reusable modules.
4. **Keep Business Line C selective**: support only strategic accounts with clear expansion or platform proof value.
5. **Reframe business line reporting**: every business line should report not only revenue, but ARR quality, renewal, expansion, product reuse, and organization burden.
`,
      recommendedActions: [
        'Concentrate incremental product, engineering, and leadership attention on Business Line A and B.',
        'Require Business Line B to standardize its package, pricing, and delivery model within 90 days.',
        'Limit Business Line D’s access to core product and engineering resources.',
        'Keep Business Line C selective based on platform proof value.',
        'Reframe business line reporting to measure ARR quality and complexity metrics.'
      ]
    }
  },
  evidence: {
    q1: [
      {
        title: "Evidence 1 | The three issues were CEO-level priorities, not ordinary meeting notes",
        source: "Transcript",
        facts: [
          "In the meeting, the CEO repeatedly emphasized three issues:",
          "1. Renewal risk should not be treated as a Customer Success-only issue. Sales, Product, Delivery, and CS all need to be accountable.",
          "2. Cross-functional decisions should not stay in repeated coordination. Critical issues need one decision owner and a clear conclusion.",
          "3. Meeting commitments must not disappear after the meeting. Every commitment needs an owner, deadline, and evidence of completion."
        ],
        whyItMatters: "These were not general discussion topics. They were CEO-level operating priorities with expected outcomes. Therefore, Boss AI should judge them by whether they entered execution, not by whether they appeared in the meeting notes."
      },
      {
        title: "Evidence 2 | Several commitments were recorded, but not made accountable",
        source: "Commitment Tracker",
        facts: [
          "After the meeting: 12 commitments were recorded.",
          "5 commitments did not have clear deadlines.",
          "3 commitments are already overdue.",
          "2 commitments have no post-meeting updates.",
          "Several items used vague language such as “jointly follow up,” “coordinate across teams,” or “continue discussion.”"
        ],
        whyItMatters: "This supports the conclusion that some issues were recorded but not truly acted on. A commitment is not executable unless it has a clear owner, due date, expected output, and completion evidence."
      },
      {
        title: "Evidence 3 | Renewal-risk management is moving, but only partially",
        source: "Customer Success",
        facts: [
          "For the renewal-risk issue, Sales submitted a Top Customer list.",
          "Customer Success has not completed renewal-risk classification.",
          "Some key accounts show declining usage or reduced engagement.",
          "Expansion paths are only defined for part of the key accounts.",
          "Renewal risk has not yet been integrated into the CEO operating view."
        ],
        whyItMatters: "This supports the conclusion that renewal-risk management is partially progressing but has not yet become a company-level operating mechanism. The expected outcome was an operating system that connects customer health, renewal risk, expansion path, owner, and next action."
      },
      {
        title: "Evidence 4 | Cross-functional decisions are still being diluted by coordination",
        source: "Project Logs",
        facts: [
          "For the cross-functional decision-cycle issue: Two critical decisions appeared in three consecutive meetings.",
          "Meeting notes repeatedly used phrases like “pending further coordination” and “to be confirmed.”",
          "No single decision owner was assigned.",
          "Product, Delivery, and Finance each provided partial inputs, but no final decision was recorded."
        ],
        whyItMatters: "This supports the conclusion that the issue is behind expectations. The CEO’s original intent was to shorten decision cycles and force closure. The current execution still shows coordination without ownership."
      },
      {
        title: "Evidence 5 | Commitment accountability has drifted from the CEO’s original intent",
        source: "Follow-up Tracker",
        facts: [
          "For commitment accountability, meeting notes were generated successfully.",
          "But several commitments lack owner or deadline.",
          "Some action items show “in progress” without concrete output.",
          "The next Chief of Staff Meeting agenda does not currently prioritize reviewing the three CEO-raised issues first.",
          "Some follow-ups are framed as departmental updates rather than CEO-level commitment closure."
        ],
        whyItMatters: "This supports the conclusion that the issue has drifted from the CEO’s original intent. The CEO did not ask for better meeting notes. The CEO asked for commitments to become traceable, accountable, and closed-loop."
      }
    ],
    q2: [
      {
        title: "Evidence 1 | This revenue item has already been committed into Q2 ARR",
        source: "Revenue Commitment",
        facts: [
          "A Project Revenue has been included in the current Q2 ARR forecast.",
          "The committed amount is X.",
          "The commitment source is the Q2 Forecast Review with High Confidence.",
          "The commitment status is active in management operating reports.",
          "The management report still shows this item as “on track.”"
        ],
        whyItMatters: "This evidence shows that A Project Revenue is already being treated as a reliable Q2 ARR component in the management forecast. If underlying contract, payment, or project conditions are not ready, it directly impacts Q2 ARR targets."
      },
      {
        title: "Evidence 2 | The contract does not yet support high-confidence recognition",
        source: "Contract Archive",
        facts: [
          "A Project’s related contract has been signed.",
          "But the contract archive status is marked as 'not archived'.",
          "Finance review of the recognition terms is still pending.",
          "Key recognition clauses have not been fully confirmed.",
          "No final contract archive confirmation is available."
        ],
        whyItMatters: "This evidence shows a gap between the Q2 revenue commitment and contract readiness. The revenue has been committed into Q2, but the contract object is not complete enough to support high-confidence recognition. This creates a Commitment-Contract Gap."
      },
      {
        title: "Evidence 3 | Payment has not been confirmed",
        source: "Finance System",
        facts: [
          "Payment status remains pending.",
          "Customer payment approval has not been confirmed.",
          "Expected payment date is not locked.",
          "The blocker is listed as waiting for the customer’s internal approval.",
          "Invoice status is not fully cleared for collection."
        ],
        whyItMatters: "This evidence shows that the payment condition does not yet support treating this revenue as secure Q2 ARR. The commitment says this item can be counted in Q2, but the payment object says collection is still uncertain. This creates a Commitment-Payment Gap."
      },
      {
        title: "Evidence 4 | The risk has not been fully surfaced in the management view",
        source: "Risk Log",
        facts: [
          "The revenue item is still shown as “on track” in general views.",
          "The risk note only says “continuous follow-up.”",
          "Contract archive status, payment uncertainty, and project acceptance risk are not highlighted together in the CEO view.",
          "The item has not been escalated as a high-risk Q2 reporting item.",
          "The Q2 forecast has not yet reflected a downside scenario for this revenue item."
        ],
        whyItMatters: "This evidence shows that the underlying risk exists, but it has not been fully surfaced to the CEO-level operating view. The real issue is that the risk is still hidden behind a high-confidence forecast."
      }
    ],
    q3: [
      {
        title: "Evidence 1 | Revenue shows that not all growth is equal",
        source: "Financial Reports",
        facts: [
          "Business Line A has the highest ARR share and the most stable recurring revenue base.",
          "Business Line B has lower current ARR than A, but expansion revenue is growing quickly.",
          "Business Line C contributes large deal revenue, but revenue is concentrated in a few strategic accounts.",
          "Business Line D generates visible short-term revenue, but a high share comes from one-off project income.",
          "Business Line E is mainly service revenue, with lower predictability and weaker recurring structure."
        ],
        whyItMatters: "This shows that current revenue size alone is misleading. Business Line D looks attractive but its revenue quality is weaker. Business Line A and B are far more attractive because they create renewable and expandable revenue."
      },
      {
        title: "Evidence 2 | Customer data shows stronger retention and expansion in A and B",
        source: "Customer CS Dashboard",
        facts: [
          "Business Line A customers show higher usage depth and stronger renewal performance.",
          "Business Line B customers show clear expansion opportunities in repeatable industry scenarios.",
          "Business Line C has high-value customers, but expansion depends heavily on individual account strategy.",
          "Business Line D customers often reduce activity after project delivery is completed.",
          "Business Line E has unstable repeat-purchase behavior."
        ],
        whyItMatters: "High-quality growth depends on whether customers stay, use more, and expand over time. Business Line A and B show stronger customer continuity. Business Line D and E are more transactional and do not consistently produce secure durable relationships."
      },
      {
        title: "Evidence 3 | Contract structure shows which business lines create durable revenue",
        source: "Contracts System",
        facts: [
          "Business Line A contracts are mostly subscription and renewal contracts.",
          "Business Line B contracts increasingly include expansion terms and repeatable package structures.",
          "Business Line C contracts are large, but often account-specific.",
          "Business Line D contracts are mostly one-off project contracts.",
          "Business Line E contracts are service-based and have weaker renewal mechanisms."
        ],
        whyItMatters: "Contract structure reveals whether a business line creates durable revenue or one-time income. Subscription, renewal, and expansion contracts support better long-term growth quality."
      },
      {
        title: "Evidence 4 | Product module data shows where growth can scale",
        source: "Product Roadmap",
        facts: [
          "Business Line A reuses standard modules across multiple customers.",
          "Business Line B has emerging industry templates that can be standardized.",
          "Business Line C produces some reusable capabilities, but many remain account-specific.",
          "Business Line D repeatedly requires customer-specific development.",
          "Business Line E depends more on expert service than reusable product modules."
        ],
        whyItMatters: "A business line can scale only if it does not require rebuilding capabilities for every customer. Business Line A shows strong reuse, while Business Line B template patterns can be standardized; Line D and E consume effort without producing compounding assets."
      },
      {
        title: "Evidence 5 | Organization data shows that some business lines consume too much execution capacity",
        source: "Org Allocation Logs",
        facts: [
          "Business Line D consumes a disproportionate share of product and delivery capacity due to custom work.",
          "Business Line E consumes expert time but creates limited reusable output.",
          "Business Line A requires lower incremental delivery effort after deployment.",
          "Business Line B requires productization effort, but that effort can be reused across multiple customers.",
          "Leadership attention is frequently pulled into large custom projects, even when those projects do not improve recurring revenue quality."
        ],
        whyItMatters: "The question is which business line converts organization capacity into scalable growth. Business Line D and E consume significant capacity, while A and B create stronger leverage from the same organization investment."
      }
    ]
  }
};
