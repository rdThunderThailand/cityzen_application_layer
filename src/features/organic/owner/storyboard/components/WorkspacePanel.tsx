import { workspaceModules } from "../mock";

export function WorkspacePanel() {
  return (
    <section className="relative col-span-2 flex h-full min-h-0 flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 px-8 py-6 shadow-sm">
      <div className="text-center">
        <h2 className="text-lg font-bold text-blue-800">CityZen Executive Office</h2>
        <p className="mx-auto mt-1 max-w-2xl text-xs text-slate-500">
          เข้าสู่พื้นที่ปฏิบัติการที่รวมข้อมูลอ้างอิง ระบบวิเคราะห์ และเครื่องมือสั่งการ
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-2xl grid-cols-6 gap-3">
        {workspaceModules.map((module) => {
          const Icon = module.icon;
          return (
            <div key={module.label} className="flex flex-col items-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-medium text-slate-600">{module.label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] italic text-slate-400">
        Evidence before Judgment. Executive Office prepares. Executives decide.
      </p>
    </section>
  );
}
