# ChartAreaBreakdown Component

A reusable 100% stacked area chart component that displays percentage breakdowns over time with a legend.

## Features

- 📊 100% Stacked Area Chart (percentages always sum to 100%)
- 🎨 Dynamic color configuration
- 📝 Built-in legend at the bottom
- 🔄 Fully reusable with any dataset
- 💅 Consistent shadcn/ui styling
- 📱 Responsive design

## Usage

```tsx
import ChartAreaBreakdown from "@/components/charts/chart-area-breakdown";
import type { AreaConfig } from "@/components/charts/chart-area-breakdown";

// 1. Prepare your data (percentages should sum to 100 per period)
const data = [
  {
    period: "Jan",
    categoryA: 45.5,
    categoryB: 30.2,
    categoryC: 24.3,
  },
  {
    period: "Feb",
    categoryA: 42.8,
    categoryB: 33.1,
    categoryC: 24.1,
  },
  // ... more periods
];

// 2. Define area configurations
const areas: AreaConfig[] = [
  {
    dataKey: "categoryA",
    label: "Category A",
    color: "#3b82f6",
  },
  {
    dataKey: "categoryB",
    label: "Category B",
    color: "#10b981",
  },
  {
    dataKey: "categoryC",
    label: "Category C",
    color: "#f59e0b",
  },
];

// 3. Render the component
<ChartAreaBreakdown
  title="Category Breakdown"
  description="Monthly distribution across categories"
  data={data}
  areas={areas}
/>;
```

## Props

| Prop          | Type                                 | Required | Default    | Description                                 |
| ------------- | ------------------------------------ | -------- | ---------- | ------------------------------------------- |
| `title`       | `string`                             | ✅       | -          | Chart title                                 |
| `description` | `string`                             | ✅       | -          | Chart description/subtitle                  |
| `data`        | `Record<string, number \| string>[]` | ✅       | -          | Array of data points with period and values |
| `areas`       | `AreaConfig[]`                       | ✅       | -          | Configuration for each area/category        |
| `xAxisKey`    | `string`                             | ❌       | `"period"` | Key to use for X-axis labels                |
| `className`   | `string`                             | ❌       | -          | Additional CSS classes for the card         |

## AreaConfig Interface

```tsx
interface AreaConfig {
  dataKey: string; // Key in data object for this area
  label: string; // Display name in legend and tooltip
  color: string; // Hex color for this area
}
```

## Real-World Examples

### Example 1: Income Breakdown

```tsx
const incomeAreas: AreaConfig[] = [
  {
    dataKey: "netInterestIncome",
    label: "Net Interest Income",
    color: "#3b82f6",
  },
  { dataKey: "netFeeIncome", label: "Net Fee & Commission", color: "#10b981" },
  { dataKey: "derivativesGains", label: "Derivatives Gains", color: "#f59e0b" },
  { dataKey: "otherIncome", label: "Other Income", color: "#8b5cf6" },
];

<ChartAreaBreakdown
  title="Income Breakdown"
  description="Percentage composition of income sources"
  data={incomePercentData}
  areas={incomeAreas}
/>;
```

### Example 2: Asset Composition

```tsx
const assetAreas: AreaConfig[] = [
  {
    dataKey: "cashAndCentralBanks",
    label: "Cash & Central Banks",
    color: "#3b82f6",
  },
  {
    dataKey: "loansAndOverdrafts",
    label: "Loans & Overdrafts",
    color: "#10b981",
  },
  { dataKey: "debtSecurities", label: "Debt Securities", color: "#f59e0b" },
  { dataKey: "otherAssets", label: "Other Assets", color: "#ef4444" },
];

<ChartAreaBreakdown
  title="Asset Composition"
  description="Distribution of total assets"
  data={assetPercentData}
  areas={assetAreas}
  xAxisKey="month"
/>;
```

### Example 3: Expense Analysis

```tsx
const expenseAreas: AreaConfig[] = [
  { dataKey: "personnel", label: "Personnel Expenses", color: "#3b82f6" },
  { dataKey: "operating", label: "Operating Expenses", color: "#ef4444" },
  { dataKey: "depreciation", label: "Depreciation", color: "#f59e0b" },
  { dataKey: "creditLoss", label: "Credit Loss Expense", color: "#8b5cf6" },
];

<ChartAreaBreakdown
  title="Expense Breakdown"
  description="Operating expense composition over time"
  data={expensePercentData}
  areas={expenseAreas}
  className="col-span-2"
/>;
```

## Data Preparation Helper

To convert raw numeric data to percentage data suitable for this component:

```tsx
function computePercentData<T extends Record<string, number | string>>(
  data: T[],
  fields: (keyof T)[]
): Array<Record<string, number | string>> {
  return data.map((item) => {
    const total = fields.reduce((sum, field) => {
      const value = item[field];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    const percentItem: Record<string, number | string> = {
      period: item.period || item.month || item.quarter || item.year || "",
    };

    fields.forEach((field) => {
      const value = item[field];
      const numValue = typeof value === "number" ? value : 0;
      percentItem[String(field)] =
        total > 0 ? Number(((numValue / total) * 100).toFixed(2)) : 0;
    });

    return percentItem;
  });
}

// Usage:
const incomePercentData = computePercentData(bankingProfitLoss, [
  "netInterestIncome",
  "netFeeIncome",
  "derivativesGains",
  "otherIncome",
]);
```

## Color Palette Suggestions

### Default Palette (Used in examples)

- Primary Blue: `#3b82f6`
- Success Green: `#10b981`
- Warning Amber: `#f59e0b`
- Danger Red: `#ef4444`
- Purple: `#8b5cf6`
- Violet: `#a855f7`

### Alternative Palettes

**Professional:**

- `#1e3a8a`, `#1e40af`, `#3b82f6`, `#60a5fa`, `#93c5fd`

**Warm:**

- `#dc2626`, `#ea580c`, `#f59e0b`, `#eab308`, `#84cc16`

**Cool:**

- `#06b6d4`, `#0ea5e9`, `#3b82f6`, `#6366f1`, `#8b5cf6`

## Notes

- Data values should be percentages (0-100) and ideally sum to 100 per period
- The Y-axis is automatically configured to show 0-100% range
- Tooltip values display with one decimal place precision
- The legend is responsive and wraps on smaller screens
- Gradients are automatically generated for each area
