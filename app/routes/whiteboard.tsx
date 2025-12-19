import type { Route } from './+types/whiteboard';
import { Canvas } from '~/components/canvas/Canvas';
import { Header } from '~/components/header/Header';
import { Toolbar } from '~/components/toolbar/Toolbar';
import { PropertiesPanel } from '~/components/properties/PropertiesPanel';
import { usePersistence } from '~/hooks/usePersistence';
import '~/styles/glassmorphism.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Vellum | Modern Whiteboard' },
    { name: 'description', content: 'A modern collaborative whiteboard' },
  ];
}

export default function Whiteboard() {
  usePersistence();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-50">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <Canvas />
      <Header />
      <Toolbar />
      <PropertiesPanel />
    </div>
  );
}
