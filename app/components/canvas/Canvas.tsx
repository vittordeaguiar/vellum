import { useCanvas } from '~/hooks/useCanvas';
import { useDrawing } from '~/hooks/useDrawing';
import { useSelection } from '~/hooks/useSelection';
import { useKeyboard } from '~/hooks/useKeyboard';
import { TextInputModal } from '~/components/modals/TextInputModal';

export function Canvas() {
  const canvasRef = useCanvas();
  const { textModalOpen, setTextModalOpen, handleTextSubmit } = useDrawing(canvasRef);
  useSelection(canvasRef);
  useKeyboard();

  return (
    <>
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          id="main-canvas"
          className="block cursor-crosshair"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <TextInputModal
        isOpen={textModalOpen}
        onClose={() => setTextModalOpen(false)}
        onSubmit={handleTextSubmit}
      />
    </>
  );
}
