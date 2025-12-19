import { Minus, Circle as CircleIcon } from 'lucide-react';
import { useCanvasStore } from '~/store/canvas-store';

export function PropertiesPanel() {
  const currentProperties = useCanvasStore((state) => state.currentProperties);
  const setCurrentProperties = useCanvasStore(
    (state) => state.setCurrentProperties
  );

  return (
    <aside className="glass-panel fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-6 rounded-full px-6 py-3">
      <div className="flex items-center gap-3">
        <Minus size={14} className="text-slate-500" />
        <input
          type="range"
          min="1"
          max="50"
          value={currentProperties.strokeWidth}
          onChange={(e) =>
            setCurrentProperties({
              strokeWidth: parseInt(e.target.value),
            })
          }
          className="h-1 w-24 cursor-pointer appearance-none rounded-sm bg-slate-200 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:hover:scale-110"
        />
        <CircleIcon size={14} className="fill-slate-500 text-slate-500" />
      </div>

      <div className="h-5 w-px bg-slate-200" />

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Opacidade
        </span>
        <input
          type="range"
          min="10"
          max="100"
          value={currentProperties.opacity}
          onChange={(e) =>
            setCurrentProperties({
              opacity: parseInt(e.target.value),
            })
          }
          className="h-1 w-24 cursor-pointer appearance-none rounded-sm bg-slate-200 outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </aside>
  );
}
