import { useCanvas } from '~/hooks/useCanvas';
import { useDrawing } from '~/hooks/useDrawing';
import { useSelection } from '~/hooks/useSelection';
import { useKeyboard } from '~/hooks/useKeyboard';

export function Canvas() {
  const canvasRef = useCanvas();
  useDrawing(canvasRef);
  useSelection(canvasRef);
  useKeyboard();

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        id="main-canvas"
        className="block cursor-crosshair"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
