const serviceData = {
  bookkeeping: [
    {
      id: 'b1',
      name: "Starter",
      monthly: 24999,
      discounted: 22499,
      subtitle: "Suitable for businesses with turnover up to 1–2 crore annually.",
      features: [
        "Up to 100 transactions per month",
        "Monthly bookkeeping & ledger maintenance",
        "1 Bank reconciliation",
        "Monthly Profit & Loss statement",
        "Expense & income categorization",
        "Basic financial summary report"
      ],
      extra: [
        "Income Tax Filing (Separate retainer)",
        "Sales Tax Filing (PKR 10k–25k/month additional)",
        "Company Registration",
        "CFO Advisory (PKR 75k–150k/month)"
      ]
    },
    {
      id: 'b2',
      name: "Standard",
      monthly: 49999,
      discounted: 39999,
      subtitle: "Suitable for turnover between 2–10 crore annually.",
      features: [
        "Up to 300 transactions per month",
        "Accounts Payable & Receivable management",
        "Up to 3 bank reconciliations",
        "Monthly P&L + Balance Sheet",
        "Cash Flow statement",
        "Sales tax reconciliation (FBR ready)",
        "Monthly management reporting",
        "WhatsApp & priority support"
      ],
      extra: [
        "Income Tax Filing (Separate retainer)",
        "Sales Tax Filing (PKR 10k–25k/month additional)",
        "Company Registration",
        "CFO Advisory (PKR 75k–150k/month)"
      ]
    },
    {
      id: 'b3',
      name: "Premium",
      monthly: 109999,
      discounted: 76999,
      subtitle: "Suitable for turnover 10+ crore annually.",
      features: [
        "500+ transactions per month",
        "Full AP/AR management",
        "Multi-bank reconciliation",
        "Inventory tracking",
        "Payroll processing (up to 20 employees)",
        "Complete financial statements",
        "Tax-ready books (Income Tax + Sales Tax support)",
        "Audit & FBR documentation support",
        "Dedicated Account Manager",
        "Weekly performance reporting"
      ],
      extra: [
        "Income Tax Filing (Separate retainer)",
        "Sales Tax Filing (PKR 10k–25k/month additional)",
        "Company Registration",
        "CFO Advisory (PKR 75k–150k/month)",
        "Extra Support Not Charged: Premium customers gain significant added benefits"
      ]
    }
  ],
 software: [
  {
    id: 's1',
    name: "Digital Invoice Package",
    setup: 60000,
    monthly: 12000,
    subtitle: "Best for: Sales-focused businesses needing FBR digital invoicing.",
    features: [
      "FBR Digital Invoice Integration",
      "Customer Management",
      "Item/Product Management",
      "Sales Reporting",
      "Item-wise Sales Analysis",
      "Sales Summary Reports",
      "1 Company Access",
      "5 Users"
    ],
    featureCategory: [
      "FBR Digital Invoice Integration with software"
    ],
    clientBenefit: [
      "FBR integration with FBR Protal online"
    ]
  },
  {
    id: 's2',
    name: "Digital Invoice + Purchase, Inventory & Finance",
    setup: 60000,
    monthly: 18000,
    subtitle: "Best for: Traders, SMEs, eCommerce, distributors.",
    features: [
      "FBR Digital Invoice Integration",
      "Customer Management",
      "Item/Product Management",
      "Sales Reporting",
      "Item-wise Sales Analysis",
      "Sales Summary Reports",
      "1 Company Access",
      "5 Users",
      "Purchase Management",
      "Inventory Control & Stock Tracking",
      "Financial Accounting (General Ledger + Reports)",
      "Basic Bookkeeping Support by TaxFilerz Team"
    ],
    featureCategory: [
      "Financial Accounting",
      "Sales & POS",
      "Purchase & Inventory"
    ],
    clientBenefit: [
      "Full ledger, journals, P&L, balance sheet",
      "Billing, POS operations, customer transactions",
      "Buy, stock control, supplier tracking"
    ]
  },
  {
    id: 's3',
    name: "Digital Invoice + Purchase + Inventory + Production + Finance",
    setup: 120000,
    monthly: 24000,
    subtitle: "Best for: Manufacturing & Production Units.",
    features: [
      "FBR Digital Invoice Integration",
      "Customer Management",
      "Item/Product Management",
      "Sales Reporting",
      "Item-wise Sales Analysis",
      "Sales Summary Reports",
      "1 Company Access",
      "5 Users",
      "Purchase Management",
      "Inventory Control & Stock Tracking",
      "Financial Accounting (General Ledger + Reports)",
      "Basic Bookkeeping Support by TaxFilerz Team",
      "Production Module (BOM)",
      "Assembly & Production Tracking",
      "ERP-Level Reporting",
      "Dedicated Implementation Support",
      "Full ledger, journals, P&L, balance sheet",
      "Billing, POS operations, customer transactions",
      "Buy, stock control, supplier tracking",
      "Manufacturing route, BOM & output tracking",
      "Drillable reports for profits, aging, item & party analysis",
      "Multi-user access and company controls"
    ],
    featureCategory: [
      "Financial Accounting",
      "Sales & POS",
      "Purchase & Inventory",
      "Production & Assembly",
      "Reporting & Analysis",
      "Access & Control"
    ],
    clientBenefit: [
      "Full ledger, journals, P&L, balance sheet",
      "Billing, POS operations, customer transactions",
      "Buy, stock control, supplier tracking",
      "Manufacturing route, BOM & output tracking",
      "Drillable reports for profits, aging, item & party analysis",
      "Multi-user access and company controls"
    ]
  }
],bundles: [
  {
    id: 'bn1',
    name: "Starter Business Bundle",
    setup: 60000,
    monthly: 34499,
    subtitle: "Digital Invoice + Bookkeeping Pkg",
    features: [
      "Software – TaxFilerz Digital Invoice",
      "Digital invoice & FBR integration",
      "Sales reporting & analysis",
      "Customer & item management",
      "Basic financial dashboard",
      "Bookkeeping Services: Up to 100 transactions per month",
      "Monthly bank reconciliation (1 bank)",
      "Monthly Profit & Loss statement",
      "Expense & income tracking",
      "Cloud support & basic queries"
    ],
    featureCategory: [
      "FBR Digital Invoice Integration with software"
    ],
    clientBenefit: [
      "FBR integration with FBR Protal online"
    ],
    financialServices: [
      "Income Tax Filing (Separate retainer)",
      "Sales Tax Filing (PKR 10k–25k/month additional)",
      "Company Registration",
      "CFO Advisory (PKR 75k–150k/month)"
    ]
  },
  {
    id: 'bn2',
    name: "Growing Business Bundle",
    setup: 60000,
    monthly: 57999,
    subtitle: "Digital Invoice + Purchase, Inventory & Finance + Bookkeeping Pkg",
    features: [
      "Software – TaxFilerz Business Accounting",
      "Digital + Purchase + Inventory",
      "Full accounting ledgers",
      "Financial reporting dashboards",
      "FBR invoices & tax summaries",
      "Bookkeeping Services: Up to 300 transactions per month",
      "AP/AR management",
      "Bank reconciliation (Up to 3 banks)",
      "Monthly P&L + Balance Sheet",
      "Cash flow & sales tax breakdown",
      "Monthly management report",
      "WhatsApp support"
    ],
    featureCategory: [
      "Financial Accounting",
      "Sales & POS",
      "Purchase & Inventory"
    ],
    clientBenefit: [
      "Full ledger, journals, P&L, balance sheet",
      "Billing, POS operations, customer transactions",
      "Buy, stock control, supplier tracking"
    ],
    financialServices: [
      "Income Tax Filing (Separate retainer)",
      "Sales Tax Filing (PKR 10k–25k/month additional)",
      "Company Registration",
      "CFO Advisory (PKR 75k–150k/month)"
    ]
  },
  {
    id: 'bn3',
    name: "Complete Enterprise Bundle",
    setup: 120000,
    monthly: 100999,
    subtitle: "Digital Invoice + Purchase + Inventory + Production + Finance + Bookkeeping Pkg",
    features: [
      "Software – TaxFilerz Complete ERP",
      "All software features + production module",
      "Inventory + supplier + stock reports",
      "ERP level financial reports",
      "Comprehensive compliance reports",
      "Bookkeeping Services: 500+ transactions per month",
      "Full AP/AR & payroll",
      "Multi-bank reconciliation",
      "Complete financial statements",
      "Sales tax & income tax ready books",
      "Audit support & CFO inputs",
      "Weekly performance call",
      "Dedicated account manager",
      "Extra Support Not Charged: Premium customers gain significant added benefits"
    ],
    featureCategory: [
      "Financial Accounting",
      "Sales & POS",
      "Purchase & Inventory",
      "Production & Assembly",
      "Reporting & Analysis",
      "Access & Control"
    ],
    clientBenefit: [
      "Full ledger, journals, P&L, balance sheet",
      "Billing, POS operations, customer transactions",
      "Buy, stock control, supplier tracking",
      "Manufacturing route, BOM & output tracking",
      "Drillable reports for profits, aging, item & party analysis",
      "Multi-user access and company controls"
    ],
    financialServices: [
      // Highlight that these are NOT charged for premium / enterprise
      "Extra Support Not Charged: Income Tax Filing (Separate retainer)",
      "Extra Support Not Charged: Sales Tax Filing (PKR 10k–25k/month additional)",
      "Extra Support Not Charged: Company Registration",
      "Extra Support Not Charged: CFO Advisory (PKR 75k–150k/month)"
    ]
  }
],
    taxComplianceServices: [
  {
    id: 'tcs1',
    name: "Basic Compliance Support",
    price: 5000,
    subtitle: "Small businesses, startups, freelancers, and professionals",
    features: [
      "NTN / Tax Registration Support",
      "Income Tax Return Filing",
      "Sales Tax Nill Filing Services"
    ]
  },
  {
    id: 'tcs2',
    name: "Standard Compliance & Advisory",
    price: 25000,
    subtitle: "SMEs, growing companies, traders, and GST registrants",
    features: [
      "NTN / Tax Registration Support",
      "Income Tax Return Filing",
      "Sales Tax Filing Services",
      "WHT (Withholding Tax)",
      "Quarterly Planning",
      "Input/Output Tax Reconciliation",
      "Compliance Notices Support"
    ]
  },
  {
    id: 'tcs3',
    name: "Advanced Compliance & Risk Protection",
    price: 49999,
    discountedPrice: 34999,
    subtitle: "Large businesses, manufacturers, exporters, multi-entity operations",
    features: [
      "NTN / Tax Registration Support",
      "Income Tax Return Filing",
      "Sales Tax Filing Services",
      "WHT (Withholding Tax)",
      "Quarterly Planning",
      "Input/Output Tax Reconciliation",
      "Compliance Notices Support",
      "Audit & Tax Law Response",
      "Dedicated Compliance Manager",
      "Advance Tax Strategy"
    ]
  }
],
  taxlegalConsultancy: [
  {
    id: 'tl1',
    name: "Basic Compliance Support",
    price: 5000,
    subtitle: "Small businesses, startups, freelancers, and professionals",
    features: [
      "Contract Drafting"
    ]
  },
  {
    id: 'tl2',
    name: "Standard Compliance & Advisory",
    price: 25000,
    subtitle: "SMEs, growing companies, traders, and GST registrants",
    features: [
      "Contract Drafting",
      "Employment Agreements",
      "Regulatory Advisory"
    ]
  },
  {
    id: 'tl3',
    name: "Advanced Compliance & Risk Protection",
    price: 49999,
    discountedPrice: 34999,
    subtitle: "Large businesses, manufacturers, exporters, multi-entity operations",
    features: [
      "Contract Drafting",
      "Employment Agreements",
      "Regulatory Advisory",
      "Litigation Coordination",
      "Dedicated Legal Advisor",
      "Legal Risk Assessment"
    ]
  }
]
};

export { serviceData };