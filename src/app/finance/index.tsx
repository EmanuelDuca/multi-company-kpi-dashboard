import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function FinanceIndex() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Finance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Finance KPIs</h1>
        <p className="text-muted-foreground">
          Financial performance across all companies
        </p>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Revenue
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Expenses
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Profit Margin
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
          <p className="text-sm text-muted-foreground">
            Financial charts and detailed metrics
          </p>
        </div>
      </div>
    </>
  );
}
