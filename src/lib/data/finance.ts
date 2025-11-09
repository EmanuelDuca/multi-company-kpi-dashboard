// Full year 2025 monthly data (12 months)
export const monthlyFinancialData2025 = [
  {
    month: "January",
    revenue: 450000,
    cogs: 180000,
    operatingExpenses: 120000,
    netIncome: 150000,
  },
  {
    month: "February",
    revenue: 520000,
    cogs: 208000,
    operatingExpenses: 135000,
    netIncome: 177000,
  },
  {
    month: "March",
    revenue: 580000,
    cogs: 232000,
    operatingExpenses: 145000,
    netIncome: 203000,
  },
  {
    month: "April",
    revenue: 610000,
    cogs: 244000,
    operatingExpenses: 155000,
    netIncome: 211000,
  },
  {
    month: "May",
    revenue: 650000,
    cogs: 260000,
    operatingExpenses: 165000,
    netIncome: 225000,
  },
  {
    month: "June",
    revenue: 680000,
    cogs: 272000,
    operatingExpenses: 170000,
    netIncome: 238000,
  },
  {
    month: "July",
    revenue: 720000,
    cogs: 288000,
    operatingExpenses: 180000,
    netIncome: 252000,
  },
  {
    month: "August",
    revenue: 700000,
    cogs: 280000,
    operatingExpenses: 175000,
    netIncome: 245000,
  },
  {
    month: "September",
    revenue: 750000,
    cogs: 300000,
    operatingExpenses: 190000,
    netIncome: 260000,
  },
  {
    month: "October",
    revenue: 780000,
    cogs: 312000,
    operatingExpenses: 195000,
    netIncome: 273000,
  },
  {
    month: "November",
    revenue: 800000,
    cogs: 320000,
    operatingExpenses: 200000,
    netIncome: 280000,
  },
  {
    month: "December",
    revenue: 850000,
    cogs: 340000,
    operatingExpenses: 210000,
    netIncome: 300000,
  },
];

// Quarterly data for last 4 quarters
export const quarterlyFinancialData = [
  {
    quarter: "Q2 2024",
    revenue: 3500000,
    cogs: 1400000,
    operatingExpenses: 950000,
    netIncome: 1150000,
  },
  {
    quarter: "Q3 2024",
    revenue: 3850000,
    cogs: 1540000,
    operatingExpenses: 1020000,
    netIncome: 1290000,
  },
  {
    quarter: "Q4 2024",
    revenue: 4200000,
    cogs: 1680000,
    operatingExpenses: 1100000,
    netIncome: 1420000,
  },
  {
    quarter: "Q1 2025",
    revenue: 1550000,
    cogs: 620000,
    operatingExpenses: 400000,
    netIncome: 530000,
  },
];

// Yearly data for last 5 years
export const yearlyFinancialData = [
  {
    year: "2021",
    revenue: 12000000,
    cogs: 4800000,
    operatingExpenses: 3200000,
    netIncome: 4000000,
  },
  {
    year: "2022",
    revenue: 13800000,
    cogs: 5520000,
    operatingExpenses: 3680000,
    netIncome: 4600000,
  },
  {
    year: "2023",
    revenue: 15900000,
    cogs: 6360000,
    operatingExpenses: 4240000,
    netIncome: 5300000,
  },
  {
    year: "2024",
    revenue: 18400000,
    cogs: 7360000,
    operatingExpenses: 4920000,
    netIncome: 6120000,
  },
  {
    year: "2025",
    revenue: 8090000,
    cogs: 3236000,
    operatingExpenses: 2115000,
    netIncome: 2739000,
  },
];

// Keep Q1 data for backward compatibility
export const monthlyFinancialData = monthlyFinancialData2025.slice(0, 3);

export const expenseBreakdown = [
  { category: "Salaries & Wages", amount: 180000, percentage: 45 },
  { category: "Marketing & Advertising", amount: 80000, percentage: 20 },
  { category: "Rent & Utilities", amount: 60000, percentage: 15 },
  { category: "Technology & Software", amount: 40000, percentage: 10 },
  { category: "Other Operating", amount: 40000, percentage: 10 },
];

export const quarterlyMetrics = {
  totalRevenue: 1550000,
  totalExpenses: 1020000,
  netProfit: 530000,
  profitMargin: 34.2,
  revenueGrowthYoY: 15.3,
  expenseGrowthYoY: 8.7,
};

export const cashFlowData = [
  { month: "January", operating: 160000, investing: -30000, financing: -20000 },
  {
    month: "February",
    operating: 185000,
    investing: -25000,
    financing: -15000,
  },
  { month: "March", operating: 210000, investing: -35000, financing: -10000 },
];

// Company-specific data
export const companyFinancialData: Record<string, typeof monthlyFinancialData> =
  {
    keyhole: [
      {
        month: "January",
        revenue: 150000,
        cogs: 60000,
        operatingExpenses: 40000,
        netIncome: 50000,
      },
      {
        month: "February",
        revenue: 175000,
        cogs: 70000,
        operatingExpenses: 45000,
        netIncome: 60000,
      },
      {
        month: "March",
        revenue: 195000,
        cogs: 78000,
        operatingExpenses: 50000,
        netIncome: 67000,
      },
    ],
    payproff: [
      {
        month: "January",
        revenue: 180000,
        cogs: 72000,
        operatingExpenses: 48000,
        netIncome: 60000,
      },
      {
        month: "February",
        revenue: 210000,
        cogs: 84000,
        operatingExpenses: 55000,
        netIncome: 71000,
      },
      {
        month: "March",
        revenue: 230000,
        cogs: 92000,
        operatingExpenses: 58000,
        netIncome: 80000,
      },
    ],
    intercode: [
      {
        month: "January",
        revenue: 120000,
        cogs: 48000,
        operatingExpenses: 32000,
        netIncome: 40000,
      },
      {
        month: "February",
        revenue: 135000,
        cogs: 54000,
        operatingExpenses: 35000,
        netIncome: 46000,
      },
      {
        month: "March",
        revenue: 155000,
        cogs: 62000,
        operatingExpenses: 37000,
        netIncome: 56000,
      },
    ],
  };
