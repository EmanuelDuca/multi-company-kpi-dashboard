import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function ReportsIndex() {
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
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Reports Overview</h1>
        <p className="text-muted-foreground">
          Generate and view company reports
        </p>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Monthly Report
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Quarterly Report
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            Annual Report
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
          <p className="text-sm text-muted-foreground">
            Available reports and download options
          </p>
        </div>
      </div>
    </>
  );
}
