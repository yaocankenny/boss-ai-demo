import { DemoData } from './types';

export const demoData: DemoData = {
  queries: [
    {
      id: 'q1',
      suggestedText: "Based on last week’s executive meetings, what are the top three critical items currently off my radar that I need to review?",
      text: "Based on last week’s executive meetings, what are the top three critical items currently off my radar that I need to review?"
    },
    {
      id: 'q2',
      suggestedText: "We are about to finalize Q2 earnings report. Is Business Unit A Q2 ARR target on track? Are there any hidden risks that require my immediate attention?",
      text: "We are about to finalize Q2 earnings report. Is Business Unit A Q2 ARR target on track? Are there any hidden risks that require my immediate attention?"
    },
    {
      id: 'q3',
      suggestedText: "We currently have 5 business lines and I am considering cutting 1 or 2. Make me an in-depth analysis to suggest which ones we should double down on, which ones to limit.",
      text: "We currently have 5 business lines and I am considering cutting 1 or 2. Make me an in-depth analysis to suggest which ones we should double down on, which ones to limit."
    }
  ],
  ontologyObjects: [
    { id: 'Meeting', label: 'Meeting', category: 'Execution', x: 150, y: 120 },
    { id: 'Issue', label: 'Issue', category: 'Execution', x: 550, y: 220 },
    { id: 'Product', label: 'Product', category: 'Business', x: 250, y: 380 },
    { id: 'DeliveryCustomer', label: 'Delivery Customer', category: 'Business', x: 800, y: 150 },
    { id: 'Payment', label: 'Payment', category: 'Business', x: 380, y: 550 },
    { id: 'BusinessLine', label: 'Business Line', category: 'Business', x: 950, y: 400 },
    { id: 'Commitment', label: 'Commitment', category: 'Execution', x: 620, y: 480 },

    // Related inactive ones for Query 1
    { id: 'Transcript', label: 'Meeting Transcript', category: 'Evidence', x: 100, y: 240 },
    { id: 'Attendees', label: 'Attendees', category: 'Organization', x: 320, y: 80 },
    { id: 'Owner', label: 'Owner', category: 'Execution', x: 700, y: 280 },
    { id: 'Risk', label: 'Risk', category: 'Strategic', x: 450, y: 100 },
    { id: 'Feature', label: 'Product Feature', category: 'Business', x: 180, y: 490 },
    { id: 'SLA', label: 'SLA Alignment', category: 'Business', x: 980, y: 100 },
    { id: 'Contract', label: 'Contract Agreement', category: 'Business', x: 850, y: 280 },
    { id: 'Invoice', label: 'Invoice Tracker', category: 'Business', x: 220, y: 620 },
    { id: 'Market', label: 'Market Segment', category: 'Business', x: 1050, y: 520 },
    { id: 'ActionItem', label: 'Action Item', category: 'Execution', x: 740, y: 580 },
    { id: 'Evidence', label: 'Evidence Logs', category: 'Evidence', x: 500, y: 400 },

    // Keep nodes needed for Q2/Q3 compatibility
    { id: 'Revenue', label: 'Revenue', category: 'Business', x: 500, y: 350 },
    { id: 'Project', label: 'Project', category: 'Business', x: 600, y: 650 },
    { id: 'ManagementView', label: 'Management View', category: 'Organization', x: 100, y: 200 },
    { id: 'Judgment', label: 'Judgment', category: 'Strategic', x: 200, y: 650 },
    { id: 'BusinessUnit', label: 'Business Unit', category: 'Business', x: 500, y: 300 },
    { id: 'Customer', label: 'Customer', category: 'Business', x: 800, y: 150 },
    { id: 'Organization', label: 'Organization', category: 'Organization', x: 200, y: 200 },
    { id: 'GrowthJudgment', label: 'Growth Judgment', category: 'Strategic', x: 600, y: 600 }
  ],
  relationships: [
    // Query 1 active edges for the reasoning propagation
    { id: 'q1_e1', source: 'Meeting', target: 'Issue', label: 'raises' },
    { id: 'q1_e2', source: 'Issue', target: 'Product', label: 'affects' },
    { id: 'q1_e3', source: 'Product', target: 'DeliveryCustomer', label: 'delivered_to' },
    { id: 'q1_e4', source: 'DeliveryCustomer', target: 'Payment', label: 'bills' },
    { id: 'q1_e5', source: 'Payment', target: 'BusinessLine', label: 'funds' },
    { id: 'q1_e6', source: 'BusinessLine', target: 'Commitment', label: 'defines' },

    // Related inactive edges for Query 1
    { id: 'q1_ei1', source: 'Meeting', target: 'Transcript', label: 'recorded_in' },
    { id: 'q1_ei2', source: 'Meeting', target: 'Attendees', label: 'attended_by' },
    { id: 'q1_ei3', source: 'Issue', target: 'Owner', label: 'assigned_to' },
    { id: 'q1_ei4', source: 'Issue', target: 'Risk', label: 'induces' },
    { id: 'q1_ei5', source: 'Product', target: 'Feature', label: 'includes' },
    { id: 'q1_ei6', source: 'DeliveryCustomer', target: 'Contract', label: 'subject_to' },
    { id: 'q1_ei7', source: 'DeliveryCustomer', target: 'SLA', label: 'restricted_by' },
    { id: 'q1_ei8', source: 'Payment', target: 'Invoice', label: 'billed_via' },
    { id: 'q1_ei9', source: 'BusinessLine', target: 'Market', label: 'targets' },
    { id: 'q1_ei10', source: 'Commitment', target: 'ActionItem', label: 'requires' },
    { id: 'q1_ei11', source: 'Commitment', target: 'Evidence', label: 'attested_by' },

    { id: 'q1_ei12', source: 'Transcript', target: 'Issue', label: 'mentions' },
    { id: 'q1_ei13', source: 'Transcript', target: 'Evidence', label: 'analyzed_by' },
    { id: 'q1_ei14', source: 'Attendees', target: 'Owner', label: 'managed_by' },
    { id: 'q1_ei15', source: 'Attendees', target: 'Commitment', label: 'makes' },
    { id: 'q1_ei16', source: 'Owner', target: 'Commitment', label: 'handles' },
    { id: 'q1_ei17', source: 'Owner', target: 'BusinessLine', label: 'reports_to' },
    { id: 'q1_ei18', source: 'Risk', target: 'BusinessLine', label: 'threatens' },
    { id: 'q1_ei19', source: 'Risk', target: 'Evidence', label: 'documented_in' },
    { id: 'q1_ei20', source: 'Feature', target: 'SLA', label: 'blocks' },
    { id: 'q1_ei21', source: 'Feature', target: 'DeliveryCustomer', label: 'required_for' },
    { id: 'q1_ei22', source: 'Contract', target: 'Payment', label: 'governs' },
    { id: 'q1_ei23', source: 'Contract', target: 'SLA', label: 'aligned_with' },
    { id: 'q1_ei24', source: 'SLA', target: 'Payment', label: 'impacts' },
    { id: 'q1_ei25', source: 'SLA', target: 'Evidence', label: 'evaluated_in' },
    { id: 'q1_ei26', source: 'Invoice', target: 'DeliveryCustomer', label: 'sent_to' },
    { id: 'q1_ei27', source: 'Invoice', target: 'BusinessLine', label: 'holds_up' },
    { id: 'q1_ei28', source: 'Market', target: 'DeliveryCustomer', label: 'consists_of' },
    { id: 'q1_ei29', source: 'Market', target: 'Feature', label: 'values' },
    { id: 'q1_ei30', source: 'ActionItem', target: 'Owner', label: 'tracked_by' },
    { id: 'q1_ei31', source: 'ActionItem', target: 'Issue', label: 'resolves' },
    { id: 'q1_ei32', source: 'Evidence', target: 'Issue', label: 'backs' },
    { id: 'q1_ei33', source: 'Evidence', target: 'Payment', label: 'impacts' },

    // Standard edges for other queries (q2 / q3)
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
      nodes: [
        'Meeting', 'Issue', 'Product', 'DeliveryCustomer', 'Payment', 'BusinessLine', 'Commitment',
        'Transcript', 'Attendees', 'Owner', 'Risk', 'Feature', 'SLA', 'Contract', 'Invoice', 'Market', 'ActionItem', 'Evidence'
      ],
      edges: [
        'q1_e1', 'q1_e2', 'q1_e3', 'q1_e4', 'q1_e5', 'q1_e6',
        'q1_ei1', 'q1_ei2', 'q1_ei3', 'q1_ei4', 'q1_ei5', 'q1_ei6', 'q1_ei7', 'q1_ei8', 'q1_ei9', 'q1_ei10', 'q1_ei11',
        'q1_ei12', 'q1_ei13', 'q1_ei14', 'q1_ei15', 'q1_ei16', 'q1_ei17', 'q1_ei18', 'q1_ei19', 'q1_ei20', 'q1_ei21',
        'q1_ei22', 'q1_ei23', 'q1_ei24', 'q1_ei25', 'q1_ei26', 'q1_ei27', 'q1_ei28', 'q1_ei29', 'q1_ei30', 'q1_ei31',
        'q1_ei32', 'q1_ei33'
      ],
      reasoningSteps: [
        { nodeId: 'Meeting', name: 'Meetings CEO missed', tasks: ['Identify key executive committee meetings that occurred without leadership representation in the past week.'] },
        { nodeId: 'Issue', name: 'Issues discussed', tasks: ['Locate major product, technical, and commercial issues discussed during those sessions.'] },
        { nodeId: 'Product', name: 'Product affected', tasks: ['Map core product release timelines affected or delayed due to unresolved issues.'] },
        { nodeId: 'DeliveryCustomer', name: 'Delivery customer affected', tasks: ['Determine which strategic client delivery milestones got delayed by product release slips.'] },
        { nodeId: 'Payment', name: 'Payment exposed', tasks: ['Calculate immediate payment milestones blockages and accounts receivable cash flow risks.'] },
        { nodeId: 'BusinessLine', name: 'Business line impacted', tasks: ['Evaluate ARR impacts and strategic development health for corresponding product/business lines.'] },
        { nodeId: 'Commitment', name: 'Top 3 issues CEO should know', tasks: ['Synthesize top 3 off-radar items and formulate executive action plan commitments.'] }
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
      title: 'Executive Blindspot & Delivery Exposure Report',
      judgment: 'Executive alignment decay detected: Missed meetings have cascaded into delivery and payment risk.',
      judgmentSubtitle: '6 missed executive meetings led to delayed product releases, directly exposing $1.2M in near-term payment pipelines for key accounts.',
      metrics: [
        { label: 'Risk Level', value: 'High', color: 'text-[#0F172A]' },
        { label: 'Cash Exposed', value: '$1.2M', color: 'text-red-600' },
        { label: 'CEO Attention', value: 'Critical', color: 'text-red-600' },
        { label: 'Trend', value: 'Worsening', color: 'text-red-600' }
      ],
      markdown: `
Boss AI mapped last week’s executive meeting records against product delivery pipelines and identified three critical items currently completely off your radar:

### Top 3 Critical Blindspots Exposed

| Blindspot / Critical Item | Propagation Path Impact | AI Core Judgment & Commitment Status |
| :--- | :--- | :--- |
| **1. Apex Enterprises Delivery Slip** | Product v2.1 delay → Delivery milestone missed | **Critical Risk**: Delayed release of core platform features has directly slipped the customer's User Acceptance Test. No owner assigned. |
| **2. $1.2M Cash Collection Milestone at Risk** | Customer milestone missed → Payment collection stall | **Financial Exposure**: Q2 accounts receivable milestone under threat; finance is unable to issue the structured invoice. |
| **3. Business Unit A Subscription ARR Growth Stall** | Payment exposed → Business Line ARR impacted | **Strategic Block**: Business Unit A ARR growth shows a 14% growth decay compared to initial Q2 targets due to unresolved blocker. |

---

### Recommended CEO Intervention Path

1. **Conduct an Immediate Intervention on Apex Enterprises**: Force a cross-departmental alignment meeting between Product Engineering and Customer Success by tomorrow noon.
2. **Assign Single Accountable Owners**: Assign VP of Engineering as sole owner of v2.1 release, and VP of CS as owner of Apex satisfaction.
3. **Lock Payment Release Conditions**: Push Apex Executives for a partial milestone payment based on intermediate module completion.
4. **Establish SAY-TO-DO Meeting Tracking**: Ensure all corporate executive meetings are automatically transcribed and traced with 14-day accountability monitoring.
`,
      recommendedActions: [
        'Initiate immediate cross-departmental intervention on Apex Enterprises delivery blockers.',
        'Assign single accountable owners for the v2.1 product release and client milestones.',
        'Authorize discussions with Apex stakeholders regarding partial milestone collection.',
        'Establish automated SAY-TO-DO tracing for all future executive committee meetings.'
      ]
    },
    q2: {
      title: 'Business Unit A Q2 ARR Integrity Report',
      judgment: 'High-confidence Q2 ARR target at risk due to $1.2M Apex Enterprises collection blockage.',
      judgmentSubtitle: 'The standard forecast counts the Apex revenue as "on track", but underlying delivery slips on the v2.1 platform have frozen payment generation.',
      metrics: [
        { label: 'Risk Level', value: 'High', color: 'text-red-500' },
        { label: 'Impact', value: 'High', color: 'text-red-500' },
        { label: 'CEO Attention', value: 'Immediate', color: 'text-red-500' },
        { label: 'Trend', value: 'Critical', color: 'text-red-500' }
      ],
      markdown: `
Boss AI analyzed Business Unit A’s Q2 ARR forecast against operational delivery states and identified a critical, hidden reporting risk linked directly to the executive blindspot uncovered in your meetings:

### The Exposed $1.2M ARR Risk

**Apex Enterprises Subscription Revenue ($1.2M)** has been fully committed to be counted in Business Unit A's Q2 ARR. However, the operational delivery layer does not support this:
- The **v2.1 Cloud Release delay (18 days slip)** has caused Apex to postpone the User Acceptance Test (UAT) sign-off.
- The contract clauses require **verified UAT Acceptance** before invoice payment can be unlocked.
- Consequently, the **$1.2M payment remains blocked** in the finance system, with high risk of slipping past the Q2 reporting deadline.

---

### BU-A Hidden Financial Risks Analysis

| Risk Object / Commitment | Operational Block | Current Status & Financial Exposure |
| :--- | :--- | :--- |
| **Apex Q2 Subscription ARR ($1.2M)** | Product v2.1 delay → Delivery milestone slip | **High Risk**: Still marked as "on track" in corporate management forecasts, but realistically blocked without immediate intervention. |
| **Business Unit A ARR Expansion** | Apex collection stall | **14% Q2 Target Deficit**: Failure to recognize this $1.2M ARR in Q2 will slip Business Unit A's quarterly growth expansion targets of 14%. |

---

### Recommended CEO Intervention Path

1. **Require an executive reconciliation by 18:00 today**: Verify if Apex Enterprises Subscription Revenue of $1.2M can still be legally or operationally accrued for Q2.
2. **Execute the Apex Intervention**: Drive the cross-departmental alignment to unblock the v2.1 Cloud Release (Apex's core blocker).
3. **Initiate CEO/CFO-level stakeholder outreach**: Reach out directly to Apex's CFO to negotiate partial/conditional acceptance and lock in the Q2 ARR recognition.
`,
      recommendedActions: [
        'Require an executive reconciliation by 18:00 today: Can Apex Subscription Revenue still be counted in Q2 ARR?',
        'Coordinate with VP of Engineering to accelerate the v2.1 Cloud Release to unblock Apex delivery.',
        'Negotiate partial/conditional acceptance with Apex CFO to unlock payment sign-off.',
        'Adjust the Q2 ARR forecast for Business Unit A if the delivery slip cannot be resolved this week.'
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
        title: "Evidence 1 | 6 executive meetings missed by leadership",
        source: "Transcript",
        facts: [
          "Leadership was absent from 6 weekly executive syncs due to overlapping strategic travel.",
          "Engineering, Product, and Sales team updates occurred in isolation without CEO/VP oversight.",
          "Core dependencies and blockages on platform v2.1 Cloud Release were labeled 'for info only' instead of 'escalated'."
        ],
        whyItMatters: "Missed alignment created a communication blindspot where cross-departmental blockers were treated as low-priority operational updates rather than launch showstoppers."
      },
      {
        title: "Evidence 2 | Engineering blockers and unresolved team issues",
        source: "Issue Logs",
        facts: [
          "14 cross-team issues were noted in transcripts regarding core API compatibility.",
          "No primary coordinator was assigned for product-to-delivery handoff issues.",
          "Unresolved engineering blockers went un-escalated for more than 11 consecutive working days."
        ],
        whyItMatters: "These unresolved issues directly choked the product release schedule. Unmanaged issues accumulated without a single decision maker to enforce resolution."
      },
      {
        title: "Evidence 3 | Product v2.1 Cloud Release slipped by 3 weeks",
        source: "Product Tracker",
        facts: [
          "Cloud Storage & Security patching deliverables for v2.1 slipped behind target by 18 days.",
          "System documentation for deploying the enterprise-grade API remains incomplete.",
          "Production-ready deployment status has reverted to 'In QA' with no reliable release date."
        ],
        whyItMatters: "Product release delays directly caused downstream delivery teams to miss pre-committed deployment schedules with strategic customer partners."
      },
      {
        title: "Evidence 4 | Delivery milestone missed for Apex Enterprises",
        source: "Customer Success",
        facts: [
          "Apex Enterprises' production launch was strictly dependent on v2.1 release on May 28.",
          "Milestone completion sign-off has been officially postponed due to missing platform features.",
          "Apex representative expressed formal concerns regarding missing SLA commitments."
        ],
        whyItMatters: "Apex Enterprises is our top enterprise client. Slipped product timelines caused a direct breach of delivery commitments, creating high customer churn risk."
      },
      {
        title: "Evidence 5 | $1.2M payment milestone blocked by delivery failure",
        source: "Finance System",
        facts: [
          "An invoice of $1,200,000 was scheduled to be billed upon Apex milestone sign-off.",
          "Finance department has locked invoice generation pending verified Customer Acceptance certificate.",
          "Q2 cash collection projections have been reduced by $1.2M due to invoicing block."
        ],
        whyItMatters: "The delivery block directly translates into immediate financial risk, jeopardizing working capital and causing an executive tracking gap."
      },
      {
        title: "Evidence 6 | Business Unit A ARR growth shows 14% performance decay",
        source: "Business Tracker",
        facts: [
          "Business Unit A subscription ARR growth target for Q2 has dropped off-track.",
          "The billing block on Apex accounts for 14% of the quarterly subscription ARR target expansion.",
          "No mitigation campaign is active for corresponding business line performance."
        ],
        whyItMatters: "A single unmanaged meeting blindspot has successfully propagated from operational friction up to the company's highest strategic level."
      }
    ],
    q2: [
      {
        title: "Evidence 1 | Apex Subscription Revenue has been fully committed into BU-A Q2 ARR",
        source: "Revenue Commitment",
        facts: [
          "Apex Enterprises Subscription Revenue ($1.2M) has been included in the current Q2 active forecast for Business Unit A.",
          "The forecasting team marked this deal as High Confidence during the Q2 Review.",
          "The revenue status is currently classified as 'Active Booking' within internal tracking systems.",
          "The corporate forecast presentation still shows this account as 'on track' to count towards the quarterly report."
        ],
        whyItMatters: "This evidence shows that Apex Enterprises is already being handled as a done deal in BU-A's ARR targets. If underlying delivery conditions slip, it directly creates an unexpected quarterly performance gap."
      },
      {
        title: "Evidence 2 | The Apex Contract Amendment is still awaiting formal finalization",
        source: "Contract Archive",
        facts: [
          "Apex's expansion service agreement has been drafted and initialed.",
          "But the formal contract archive status is marked as 'partially archived' due to pending annexes.",
          "Legal and Compliance teams have noted that the activation date is contingent on absolute milestone verification.",
          "No final executed, fully-auditable contract file has been uploaded into the ERP system."
        ],
        whyItMatters: "This shows a gap between active ARR forecasting and back-office verification. We cannot legally recognize $1.2M with a contract that remains conditionally incomplete."
      },
      {
        title: "Evidence 3 | The $1.2M Payment has been frozen by automated Finance locks",
        source: "Finance System",
        facts: [
          "The invoice generation code prevents billing without a certified UAT Acceptance Document.",
          "The billing cycle for Apex expansion is set to expire by quarter-end.",
          "Finance operations has flagged this transaction as 'At Risk' because the UAT is contingent on the delayed v2.1 Cloud Release.",
          "Expected collection dates have been pushed past the formal financial close unless an executive override is issued."
        ],
        whyItMatters: "This highlights the immediate threat to BU-A's quarterly cash projections. The forecast assumes secure ARR, but payment and cash delivery remain frozen because of product delivery failure."
      },
      {
        title: "Evidence 4 | Delivery risk remains hidden from the standard BU-A management reports",
        source: "Risk Log",
        facts: [
          "The standard Business Unit A dashboard reports Apex Enterprises status as 'Healthy'.",
          "There is no cross-referencing between the product engineering delay log and the finance billing schedule.",
          "The operational risk log lists the issue simply as 'ongoing customer coordination' rather than an ARR showstopper.",
          "Corporate planners have not run a downside/alternative simulation of missing this $1.2M target."
        ],
        whyItMatters: "This evidence shows that the core risk is siloed between departmental databases. The CEO was not alerted because engineering and finance systems do not automatically flag cross-boundary blockages."
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
