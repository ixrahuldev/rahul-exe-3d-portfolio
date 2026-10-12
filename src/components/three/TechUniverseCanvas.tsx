import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { UniverseScene } from './UniverseScene';
import type { TechModule } from '../../types';
import styles from './TechUniverseCanvas.module.css';

export interface TechUniverseCanvasProps {
  selectedModule: TechModule;
  modules: TechModule[];
  onSelectModule: (module: TechModule) => void;
}

export const TechUniverseCanvas: React.FC<TechUniverseCanvasProps> = ({
  selectedModule,
  modules,
  onSelectModule,
}) => {
  return (
    <div className={styles.canvasWrapper} aria-label="3D Tech Universe Interactive Centerpiece">
      {/* Background Soft Glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* R3F WebGL Canvas with responsive camera framing */}
      <div className={styles.canvasInner}>
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 38 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <UniverseScene
              accentColor={selectedModule.color}
              modules={modules}
              selectedModuleId={selectedModule.id}
              onSelectModule={onSelectModule}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default TechUniverseCanvas;
