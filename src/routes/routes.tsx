import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import { ProtectedRoute } from "./protected-route";
import { routes as PATH } from "@/utils/app-routes";

// App pages
import LoginPage from "@/app/login";
import HomePage from "@/app/home";
import FinanceIndex from "@/app/finance";
import FinanceCompanyPage from "@/app/finance/[companyId]";
import MarketingIndex from "@/app/marketing";
import MarketingCompanyPage from "@/app/marketing/[companyId]";
import ReportsIndex from "@/app/reports";
import ReportViewerPage from "@/app/reports/[reportId]";
import SettingsIndex from "@/app/settings";

export const routes: RouteObject[] = [
  {
    path: PATH.login,
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: PATH.root,
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "finance",
            children: [
              { index: true, element: <FinanceIndex /> },
              { path: ":companyId", element: <FinanceCompanyPage /> },
            ],
          },
          {
            path: "marketing",
            children: [
              { index: true, element: <MarketingIndex /> },
              { path: ":companyId", element: <MarketingCompanyPage /> },
            ],
          },
          {
            path: "reports",
            children: [
              { index: true, element: <ReportsIndex /> },
              { path: ":reportId", element: <ReportViewerPage /> },
            ],
          },
          { path: "settings", element: <SettingsIndex /> },
        ],
      },
    ],
  },
];
