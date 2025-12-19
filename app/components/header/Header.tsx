import { Download } from "lucide-react";
import { useCanvasStore } from "~/store/canvas-store";
import { exportCanvasToPNG } from "~/lib/export-utils";

export function Header() {
  const clearAll = useCanvasStore((state) => state.clearAll);

  const handleExport = () => {
    const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    if (canvas) {
      exportCanvasToPNG(canvas);
    }
  };

  return (
    <header className="glass-panel fixed left-4 right-4 top-4 z-100 flex h-16 items-center justify-between rounded-xl px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold text-white">
          V
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-800">Projeto Vellum Sem Título</h1>
          <span className="text-xs text-slate-500">Editado agora mesmo</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearAll}
          className="rounded-md border border-transparent px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
        >
          Limpar
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
        >
          <Download size={16} />
          Exportar
        </button>
      </div>
    </header>
  );
}
