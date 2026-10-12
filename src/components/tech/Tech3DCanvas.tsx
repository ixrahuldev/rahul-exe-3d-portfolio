import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Tech3DCanvasProps {
  activeTechId: string;
}

// 1. High-Fidelity React 3D Crystal Centerpiece
const ReactCenterpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const electron1Ref = useRef<THREE.Mesh>(null);
  const electron2Ref = useRef<THREE.Mesh>(null);
  const electron3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.28;
      crystalRef.current.rotation.x = Math.sin(t * 0.22) * 0.14;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.85;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.75;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.95;

    if (electron1Ref.current) {
      const a = t * 2.4;
      electron1Ref.current.position.set(Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0);
    }
    if (electron2Ref.current) {
      const a = -t * 2.1 + 1.2;
      electron2Ref.current.position.set(Math.cos(a) * 1.15, 0, Math.sin(a) * 1.15);
    }
    if (electron3Ref.current) {
      const a = t * 1.8 + 2.4;
      electron3Ref.current.position.set(0, Math.sin(a) * 1.15, Math.cos(a) * 1.15);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Luminous Crystal Polyhedron */}
      <group ref={crystalRef}>
        {/* Core Pulsing Energy Sphere */}
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.85} />
        </mesh>

        {/* Outer Faceted 3D Crystal Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[0.82, 0]} />
          <meshPhysicalMaterial
            color="#0284C7"
            emissive="#0369A1"
            emissiveIntensity={0.6}
            roughness={0.06}
            metalness={0.1}
            transmission={0.65}
            transparent
            opacity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            ior={1.65}
          />
        </mesh>

        {/* Glowing Wireframe Facet Lines */}
        <mesh>
          <icosahedronGeometry args={[0.825, 0]} />
          <meshStandardMaterial
            color="#BAE6FD"
            emissive="#38BDF8"
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Nucleus Atom Sphere */}
        <mesh>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#38BDF8"
            emissiveIntensity={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Orbiting Neon Atom Rings & Electrons */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[1.15, 0.018, 16, 80]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.9} />
        </mesh>
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[0.05, 14, 14]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 4, -0.4, 0.2]}>
        <mesh>
          <torusGeometry args={[1.15, 0.018, 16, 80]} />
          <meshStandardMaterial color="#67E8F9" emissive="#06B6D4" emissiveIntensity={0.9} />
        </mesh>
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[0.05, 14, 14]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      <group ref={ring3Ref} rotation={[0.2, Math.PI / 3, -0.3]}>
        <mesh>
          <torusGeometry args={[1.15, 0.018, 16, 80]} />
          <meshStandardMaterial color="#7DD3FC" emissive="#0284C7" emissiveIntensity={0.7} />
        </mesh>
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
      </group>

      {/* Center 3D Floating Pill Badge */}
      <Html position={[0, -1.15, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(11, 20, 38, 0.92)',
            border: '1.5px solid rgba(56, 189, 248, 0.5)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(56, 189, 248, 0.35)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 8px #38BDF8',
            }}
          />
          <span>React Ecosystem</span>
        </div>
      </Html>
    </group>
  );
};

// 2. High-Fidelity TypeScript 3D Centerpiece
const TypeScriptCenterpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.7;
    if (ring2Ref.current) ring2Ref.current.rotation.y = -t * 0.8;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Outer Clear Glass Sphere */}
      <mesh>
        <sphereGeometry args={[0.82, 36, 36]} />
        <meshPhysicalMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={0.4}
          roughness={0.08}
          transmission={0.55}
          transparent
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </mesh>

      {/* Inner Glowing Monogram Plate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshPhysicalMaterial
          color="#2563EB"
          emissive="#1E40AF"
          emissiveIntensity={0.6}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.38}
        color="#FFFFFF"
        fontWeight={900}
        anchorX="center"
        anchorY="middle"
      >
        TS
      </Text>

      {/* Orbiting Laser Latitude Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[1.12, 0.018, 16, 64]} />
        <meshStandardMaterial color="#93C5FD" emissive="#3B82F6" emissiveIntensity={0.9} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0, 0.3]}>
        <torusGeometry args={[1.18, 0.016, 16, 64]} />
        <meshStandardMaterial color="#60A5FA" emissive="#2563EB" emissiveIntensity={0.8} />
      </mesh>

      <Html position={[0, -1.15, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(11, 20, 38, 0.92)',
            border: '1.5px solid rgba(59, 130, 246, 0.5)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(59, 130, 246, 0.35)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 8px #3B82F6',
            }}
          />
          <span>TypeScript 5+ Architecture</span>
        </div>
      </Html>
    </group>
  );
};

// 3. High-Fidelity Micro-Frontends 3D Centerpiece
const MicroFrontendsCenterpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);
  const cube3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.32;
    }
    if (cube1Ref.current) {
      cube1Ref.current.position.y = 0.35 + Math.sin(t * 1.5) * 0.08;
    }
    if (cube2Ref.current) {
      cube2Ref.current.position.y = -0.3 + Math.cos(t * 1.3) * 0.08;
    }
    if (cube3Ref.current) {
      cube3Ref.current.position.x = -0.45 + Math.sin(t * 1.1) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Host Shell Monolith (Purple) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          emissive="#5B21B6"
          emissiveIntensity={0.6}
          roughness={0.1}
          clearcoat={1.0}
          transmission={0.4}
          transparent
        />
      </mesh>

      {/* Remote Micro-App 1 (Orange) */}
      <mesh ref={cube1Ref} position={[0.55, 0.35, 0.2]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshPhysicalMaterial
          color="#F97316"
          emissive="#C2410C"
          emissiveIntensity={0.5}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* Remote Micro-App 2 (Cyan) */}
      <mesh ref={cube2Ref} position={[-0.45, -0.3, 0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial
          color="#06B6D4"
          emissive="#0891B2"
          emissiveIntensity={0.5}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* Remote Micro-App 3 (Emerald) */}
      <mesh ref={cube3Ref} position={[-0.45, 0.35, -0.35]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshPhysicalMaterial
          color="#10B981"
          emissive="#059669"
          emissiveIntensity={0.5}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* Laser Federation Connection Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 0.98, 48]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      <Html position={[0, -1.15, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(11, 20, 38, 0.92)',
            border: '1.5px solid rgba(249, 115, 22, 0.5)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(249, 115, 22, 0.35)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#F97316',
              boxShadow: '0 0 8px #F97316',
            }}
          />
          <span>Module Federation & Host Shells</span>
        </div>
      </Html>
    </group>
  );
};

// 4. High-Fidelity Node.js 3D Centerpiece
const NodeJsCenterpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.9;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Hexagonal Prism Monolith */}
      <mesh>
        <cylinderGeometry args={[0.75, 0.75, 0.9, 6]} />
        <meshPhysicalMaterial
          color="#16A34A"
          emissive="#15803D"
          emissiveIntensity={0.55}
          roughness={0.08}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.4}
          transparent
        />
      </mesh>

      {/* Hexagonal Wireframe Accent */}
      <mesh>
        <cylinderGeometry args={[0.76, 0.76, 0.91, 6]} />
        <meshStandardMaterial
          color="#86EFAC"
          emissive="#22C55E"
          emissiveIntensity={1.0}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Event Loop Orbital Torus */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[1.15, 0.02, 16, 64]} />
        <meshStandardMaterial color="#4ADE80" emissive="#16A34A" emissiveIntensity={0.8} />
      </mesh>

      <Html position={[0, -1.15, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(11, 20, 38, 0.92)',
            border: '1.5px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(34, 197, 94, 0.35)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              boxShadow: '0 0 8px #22C55E',
            }}
          />
          <span>Node.js & Backend Services</span>
        </div>
      </Html>
    </group>
  );
};

// 5. High-Fidelity Python 3D Centerpiece
const PythonCenterpiece: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Top Blue Snake Helix */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.5, 0.16, 20, 48, Math.PI * 1.35]} />
        <meshPhysicalMaterial
          color="#0284C7"
          emissive="#0369A1"
          emissiveIntensity={0.5}
          roughness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Bottom Golden Snake Helix */}
      <mesh position={[0.1, -0.18, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.5, 0.16, 20, 48, Math.PI * 1.35]} />
        <meshPhysicalMaterial
          color="#F59E0B"
          emissive="#D97706"
          emissiveIntensity={0.5}
          roughness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Orbiting Particle Ring */}
      <mesh rotation={[Math.PI / 4, 0.4, 0]}>
        <torusGeometry args={[1.05, 0.018, 16, 64]} />
        <meshStandardMaterial color="#FCD34D" emissive="#F59E0B" emissiveIntensity={0.8} />
      </mesh>

      <Html position={[0, -1.15, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(11, 20, 38, 0.92)',
            border: '1.5px solid rgba(245, 158, 11, 0.5)',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(245, 158, 11, 0.35)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 8px #F59E0B',
            }}
          />
          <span>Python + FastAPI Pipelines</span>
        </div>
      </Html>
    </group>
  );
};

// Atmospheric sci-fi environment: glowing dais, floating cubes, specular bubbles
const AtmosphericEnvironment: React.FC<{ activeTechId: string }> = ({ activeTechId }) => {
  const accentColor = useMemo(() => {
    switch (activeTechId) {
      case 'typescript':
        return '#3B82F6';
      case 'micro-frontends':
        return '#F97316';
      case 'nodejs':
        return '#22C55E';
      case 'python':
        return '#F59E0B';
      default:
        return '#38BDF8';
    }
  }, [activeTechId]);

  return (
    <group>
      {/* Floating Gem Cube */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.25} position={[1.4, 1.1, -0.4]}>
        <mesh>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshPhysicalMaterial
            color="#A855F7"
            emissive="#7E22CE"
            emissiveIntensity={0.6}
            transmission={0.45}
            roughness={0.1}
            clearcoat={1.0}
            transparent
          />
        </mesh>
      </Float>

      {/* Ground Sapphire Block */}
      <mesh position={[-1.3, -1.05, 0.35]} rotation={[0.2, 0.3, 0.1]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshPhysicalMaterial
          color="#0284C7"
          emissive="#0369A1"
          emissiveIntensity={0.6}
          roughness={0.08}
          transmission={0.5}
          clearcoat={1.0}
          transparent
        />
      </mesh>

      {/* Floating Glass Specular Orbs */}
      <mesh position={[-1.4, 0.8, -0.3]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshPhysicalMaterial color="#BAE6FD" transmission={0.9} roughness={0.04} ior={1.4} transparent />
      </mesh>
      <mesh position={[1.5, -0.3, 0.2]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshPhysicalMaterial color="#E0E7FF" transmission={0.9} roughness={0.04} ior={1.4} transparent />
      </mesh>
      <mesh position={[-0.9, -0.3, 0.6]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#BAE6FD" transmission={0.9} roughness={0.04} ior={1.4} transparent />
      </mesh>

      {/* Cyber Floor Dais with Concentric Rings */}
      <group position={[0, -1.55, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 64]} />
          <meshBasicMaterial color="#070E1C" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[1.7, 1.73, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.45} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[1.05, 1.075, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};

// Interactive Scene Container with Mouse Parallax
const InteractiveScene: React.FC<{ activeTechId: string }> = ({ activeTechId }) => {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneGroupRef.current) {
      // Smooth mouse parallax tilt
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        state.pointer.x * 0.35,
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -state.pointer.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef}>
      <Float speed={1.6} rotationIntensity={0.06} floatIntensity={0.12}>
        {activeTechId === 'react' && <ReactCenterpiece />}
        {activeTechId === 'typescript' && <TypeScriptCenterpiece />}
        {activeTechId === 'micro-frontends' && <MicroFrontendsCenterpiece />}
        {activeTechId === 'nodejs' && <NodeJsCenterpiece />}
        {activeTechId === 'python' && <PythonCenterpiece />}
      </Float>

      <AtmosphericEnvironment activeTechId={activeTechId} />
    </group>
  );
};

export const Tech3DCanvas: React.FC<Tech3DCanvasProps> = ({ activeTechId }) => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '540px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.25, 3.8], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.95} />
        <directionalLight position={[3.5, 4.5, 3]} intensity={1.6} color="#F0F9FF" />
        <directionalLight position={[-3.5, -2, -1.5]} intensity={0.9} color="#0284C7" />
        <pointLight position={[0, 0.4, 1.2]} intensity={2.0} color="#38BDF8" distance={4.5} />

        <InteractiveScene activeTechId={activeTechId} />
      </Canvas>
    </div>
  );
};
