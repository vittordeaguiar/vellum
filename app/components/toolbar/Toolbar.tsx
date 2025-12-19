import {
  MousePointer2,
  Pencil,
  Square,
  Circle,
  Type,
  Eraser,
} from 'lucide-react';
import { useCanvasStore } from '~/store/canvas-store';
import type { ToolType } from '~/types/canvas.types';

const tools: Array<{
  id: ToolType;
  icon: typeof MousePointer2;
  title: string;
}> = [
  { id: 'select', icon: MousePointer2, title: 'Selecionar (V)' },
  { id: 'pencil', icon: Pencil, title: 'Lápis (P)' },
  { id: 'rectangle', icon: Square, title: 'Retângulo (R)' },
  { id: 'circle', icon: Circle, title: 'Círculo (C)' },
  { id: 'text', icon: Type, title: 'Texto (T)' },
  { id: 'eraser', icon: Eraser, title: 'Borracha (E)' },
];

export function Toolbar() {
  const currentTool = useCanvasStore((state) => state.currentTool);
  const currentProperties = useCanvasStore((state) => state.currentProperties);
  const { setCurrentTool, setCurrentProperties } = useCanvasStore();

  return (
    <aside className="glass-panel fixed left-4 top-1/2 z-[100] flex w-14 -translate-y-1/2 flex-col gap-2 rounded-xl p-2">
      <button
        onClick={() => setCurrentTool('select')}
        className={`flex items-center justify-center rounded-lg p-2.5 transition ${
          currentTool === 'select'
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
            : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-500'
        }`}
        title="Selecionar (V)"
      >
        <MousePointer2 size={20} />
      </button>

      <div className="my-1 h-px w-full bg-slate-200" />

      {tools.slice(1, 5).map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => setCurrentTool(tool.id)}
            className={`flex items-center justify-center rounded-lg p-2.5 transition ${
              currentTool === tool.id
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-500'
            }`}
            title={tool.title}
          >
            <Icon size={20} />
          </button>
        );
      })}

      <div className="my-1 h-px w-full bg-slate-200" />

      <button
        onClick={() => setCurrentTool('eraser')}
        className={`flex items-center justify-center rounded-lg p-2.5 transition ${
          currentTool === 'eraser'
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
            : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-500'
        }`}
        title="Borracha (E)"
      >
        <Eraser size={20} />
      </button>

      <div className="relative mx-auto my-1 h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm shadow-slate-300">
        <input
          type="color"
          value={currentProperties.color}
          onChange={(e) =>
            setCurrentProperties({ color: e.target.value })
          }
          className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] cursor-pointer border-0 p-0"
          title="Cor do Traço"
        />
      </div>
    </aside>
  );
}
