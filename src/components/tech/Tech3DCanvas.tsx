import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { TechStackItem } from './TechStackView';

interface Tech3DCanvasProps {
  activeTech: TechStackItem;
  onSelectTechIndex?: (index: number) => void;
}

// Helper to create an elliptical tube geometry
const createEllipseTube = (xRadius: number, yRadius: number, tubeRadius: number = 0.011) => {
  const curve = new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2 * Math.PI, false, 0);
  const points = curve.getPoints(140).map((p) => new THREE.Vector3(p.x, p.y, 0));
  const catmull = new THREE.CatmullRomCurve3(points, true);
  return new THREE.TubeGeometry(catmull, 140, tubeRadius, 10, true);
};

// 1. Exact React 3D Atom Icon matching Figma (Dynamic Orbit Animation, Fixed Centerpiece)
const ReactAtomCenterpiece: React.FC = () => {
  const cageRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const electron1Ref = useRef<THREE.Mesh>(null);
  const electron2Ref = useRef<THREE.Mesh>(null);
  const electron3Ref = useRef<THREE.Mesh>(null);

  // Exact Figma scale: rings fit comfortably inside center viewport
  const ringGeo = useMemo(() => createEllipseTube(0.96, 0.38, 0.01), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Inner crystal cage rotation & shimmer
    if (cageRef.current) {
      cageRef.current.rotation.y = t * 0.32;
      cageRef.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }

    // 2. Subtle gyroscopic precession of rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = Math.sin(t * 0.7) * 0.03;
    if (ring2Ref.current) ring2Ref.current.rotation.z = Math.PI / 3 + Math.sin(t * 0.7 + 1) * 0.03;
    if (ring3Ref.current) ring3Ref.current.rotation.z = -Math.PI / 3 + Math.sin(t * 0.7 + 2) * 0.03;

    // 3. Orbiting electron particles flowing along the elliptical tracks
    if (electron1Ref.current) {
      const a = t * 1.8;
      electron1Ref.current.position.set(Math.cos(a) * 0.96, Math.sin(a) * 0.38, 0);
    }
    if (electron2Ref.current) {
      const a = -t * 1.6 + 1.2;
      electron2Ref.current.position.set(Math.cos(a) * 0.96, Math.sin(a) * 0.38, 0);
    }
    if (electron3Ref.current) {
      const a = t * 1.5 + 2.5;
      electron3Ref.current.position.set(Math.cos(a) * 0.96, Math.sin(a) * 0.38, 0);
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      {/* Central Luminous Nucleus Sphere & Icosahedron Wireframe Cage */}
      <group ref={cageRef}>
        {/* Core Glowing Blue Energy Sphere */}
        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial
            color="#0284C7"
            emissive="#0369A1"
            emissiveIntensity={0.95}
            roughness={0.08}
            metalness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Inner Glowing White Highlight */}
        <mesh>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>

        {/* Faceted Translucent Crystal Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[0.38, 0]} />
          <meshPhysicalMaterial
            color="#0284C7"
            emissive="#0369A1"
            emissiveIntensity={0.4}
            roughness={0.06}
            metalness={0.1}
            transmission={0.7}
            transparent
            opacity={0.65}
            clearcoat={1.0}
            ior={1.6}
          />
        </mesh>

        {/* Glowing Cyan Wireframe Cage Edges */}
        <mesh>
          <icosahedronGeometry args={[0.385, 0]} />
          <meshStandardMaterial
            color="#BAE6FD"
            emissive="#38BDF8"
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* 3 Large Orbital Neon Cyan Ellipses with Active Electrons matching Figma */}
      {/* Ring 1: Horizontal Ellipse (0°) */}
      <group ref={ring1Ref}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.3}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[0.036, 12, 12]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
      </group>

      {/* Ring 2: Tilted Ellipse (60°) */}
      <group ref={ring2Ref} rotation={[0, 0, Math.PI / 3]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.3}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[0.036, 12, 12]} />
          <meshBasicMaterial color="#BAE6FD" />
        </mesh>
      </group>

      {/* Ring 3: Tilted Ellipse (-60°) */}
      <group ref={ring3Ref} rotation={[0, 0, -Math.PI / 3]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.3}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[0.036, 12, 12]} />
          <meshBasicMaterial color="#C084FC" />
        </mesh>
      </group>
    </group>
  );
};

// 2. Exact TypeScript 3D Architecture Monolith with Orbiting Laser Rings
const TypeScriptCenterpiece: React.FC = () => {
  const innerRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  const ringGeo = useMemo(() => createEllipseTube(0.92, 0.44, 0.01), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = Math.sin(t * 0.4) * 0.16;
      innerRef.current.rotation.x = Math.cos(t * 0.3) * 0.08;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.55;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.45;
  });

  return (
    <group position={[0, 0.08, 0]}>
      <group ref={innerRef}>
        {/* 3D TypeScript Sapphire Block with Bevel & Glow */}
        <mesh>
          <boxGeometry args={[0.54, 0.54, 0.14]} />
          <meshPhysicalMaterial
            color="#1D4ED8"
            emissive="#1E40AF"
            emissiveIntensity={0.65}
            roughness={0.1}
            metalness={0.2}
            clearcoat={1.0}
            transmission={0.4}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Glowing Wireframe Bounding Cage */}
        <mesh>
          <boxGeometry args={[0.545, 0.545, 0.145]} />
          <meshStandardMaterial
            color="#93C5FD"
            emissive="#38BDF8"
            emissiveIntensity={1.3}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner Plate */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.46, 0.46, 0.02]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#1D4ED8"
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* 3D "TS" Monogram */}
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.22}
          color="#FFFFFF"
          fontWeight={800}
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.02}
        >
          TS
        </Text>
      </group>

      {/* Orbiting Latitude Laser Rings */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0.25, 0]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#60A5FA" emissive="#2563EB" emissiveIntensity={1.1} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[-Math.PI / 4, -0.2, 0.2]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#93C5FD" emissive="#38BDF8" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </group>
  );
};

// 3. Exact Micro-Frontends 3D Federated Cluster with Bobbing Remote Modules
const MicroFrontendsCenterpiece: React.FC = () => {
  const cube1Ref = useRef<THREE.Group>(null);
  const cube2Ref = useRef<THREE.Group>(null);
  const cube3Ref = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const ringGeo = useMemo(() => createEllipseTube(0.95, 0.44, 0.01), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cube1Ref.current) {
      cube1Ref.current.position.y = 0.3 + Math.sin(t * 1.8) * 0.05;
      cube1Ref.current.rotation.y = t * 0.4;
    }
    if (cube2Ref.current) {
      cube2Ref.current.position.y = -0.28 + Math.cos(t * 1.5) * 0.05;
      cube2Ref.current.rotation.x = t * 0.35;
    }
    if (cube3Ref.current) {
      cube3Ref.current.position.x = -0.38 + Math.sin(t * 1.3) * 0.04;
      cube3Ref.current.rotation.z = t * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.05;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      {/* Central Host Shell Monolith (Purple/Indigo) */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshPhysicalMaterial
          color="#7C3AED"
          emissive="#5B21B6"
          emissiveIntensity={0.7}
          roughness={0.08}
          transmission={0.4}
          clearcoat={1.0}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.385, 0.385, 0.385]} />
        <meshStandardMaterial
          color="#C084FC"
          emissive="#7C3AED"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbiting Remote 1: Orange Module */}
      <group ref={cube1Ref} position={[0.42, 0.3, 0.15]}>
        <mesh>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshPhysicalMaterial
            color="#F97316"
            emissive="#C2410C"
            emissiveIntensity={0.65}
            roughness={0.1}
            clearcoat={1.0}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.225, 0.225, 0.225]} />
          <meshStandardMaterial color="#FED7AA" emissive="#F97316" emissiveIntensity={1.2} wireframe />
        </mesh>
      </group>

      {/* Orbiting Remote 2: Cyan Module */}
      <group ref={cube2Ref} position={[-0.36, -0.28, 0.15]}>
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshPhysicalMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={0.65}
            roughness={0.1}
            clearcoat={1.0}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.205, 0.205, 0.205]} />
          <meshStandardMaterial color="#A5F3FC" emissive="#06B6D4" emissiveIntensity={1.2} wireframe />
        </mesh>
      </group>

      {/* Orbiting Remote 3: Emerald Module */}
      <group ref={cube3Ref} position={[-0.38, 0.24, -0.15]}>
        <mesh>
          <boxGeometry args={[0.19, 0.19, 0.19]} />
          <meshPhysicalMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={0.65}
            roughness={0.1}
            clearcoat={1.0}
          />
        </mesh>
        <mesh>
          <boxGeometry args={[0.195, 0.195, 0.195]} />
          <meshStandardMaterial color="#A7F3D0" emissive="#10B981" emissiveIntensity={1.2} wireframe />
        </mesh>
      </group>

      {/* Laser Connectors */}
      <mesh rotation={[0.4, 0.2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[-0.5, -0.3, 0.5]}>
        <cylinderGeometry args={[0.008, 0.008, 0.85, 8]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.7} />
      </mesh>

      {/* Federation Orbital Ring */}
      <group ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#F97316" emissive="#C2410C" emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
};

// 4. Exact Node.js 3D Hexagonal Prism with Spinning Event Loop
const NodeJsCenterpiece: React.FC = () => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const ringGeo = useMemo(() => createEllipseTube(0.92, 0.44, 0.01), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = -t * 0.75;
    if (ring2Ref.current) ring2Ref.current.rotation.z = t * 0.65;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      {/* 3D Hexagonal Prism Cylinder in Rich Emerald Jade */}
      <mesh>
        <cylinderGeometry args={[0.44, 0.44, 0.22, 6]} />
        <meshPhysicalMaterial
          color="#16A34A"
          emissive="#15803D"
          emissiveIntensity={0.65}
          roughness={0.08}
          metalness={0.15}
          clearcoat={1.0}
          transmission={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Hexagonal Wireframe Accent */}
      <mesh>
        <cylinderGeometry args={[0.445, 0.445, 0.225, 6]} />
        <meshStandardMaterial
          color="#86EFAC"
          emissive="#22C55E"
          emissiveIntensity={1.3}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Central Pulsing Event-Loop Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshBasicMaterial color="#4ADE80" />
      </mesh>

      {/* Stylized Node "N" Monogram */}
      <Html position={[0, 0, 0.12]} center transform style={{ pointerEvents: 'none' }}>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '25px',
            fontWeight: 900,
            color: '#FFFFFF',
            textShadow: '0 0 12px rgba(74, 222, 128, 0.9), 0 2px 6px rgba(0,0,0,0.8)',
            letterSpacing: '-0.02em',
          }}
        >
          N
        </div>
      </Html>

      {/* Dual Event Loop Orbital Rings */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, 0.25, 0]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#4ADE80" emissive="#16A34A" emissiveIntensity={1.1} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[-Math.PI / 3, -0.25, 0]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#86EFAC" emissive="#22C55E" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </group>
  );
};

// 5. Exact Python 3D Interlocking Dual-Snake Sculpture with Orbiting Ring
const PythonCenterpiece: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);
  const snakesRef = useRef<THREE.Group>(null);

  const ringGeo = useMemo(() => createEllipseTube(0.92, 0.44, 0.01), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) ringRef.current.rotation.z = t * 0.55;
    if (snakesRef.current) {
      snakesRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      <group ref={snakesRef}>
        {/* Top Snake (Ocean Blue) */}
        <group position={[-0.05, 0.12, 0]}>
          <mesh>
            <torusGeometry args={[0.28, 0.09, 18, 40, Math.PI * 1.35]} />
            <meshPhysicalMaterial
              color="#0284C7"
              emissive="#0369A1"
              emissiveIntensity={0.6}
              roughness={0.08}
              metalness={0.15}
              clearcoat={1.0}
            />
          </mesh>
          <mesh position={[0.28, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial color="#0284C7" emissive="#0369A1" emissiveIntensity={0.6} clearcoat={1.0} />
          </mesh>
          <mesh position={[0.3, 0.04, 0.07]}>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Bottom Snake (Warm Amber Gold) */}
        <group position={[0.05, -0.12, 0]} rotation={[0, 0, Math.PI]}>
          <mesh>
            <torusGeometry args={[0.28, 0.09, 18, 40, Math.PI * 1.35]} />
            <meshPhysicalMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.6}
              roughness={0.08}
              metalness={0.15}
              clearcoat={1.0}
            />
          </mesh>
          <mesh position={[0.28, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={0.6} clearcoat={1.0} />
          </mesh>
          <mesh position={[0.3, 0.04, 0.07]}>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      </group>

      {/* Orbiting Ring */}
      <group ref={ringRef} rotation={[Math.PI / 4, 0.3, 0]}>
        <mesh geometry={ringGeo}>
          <meshStandardMaterial color="#FCD34D" emissive="#F59E0B" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </group>
  );
};

// Holographic Floor Projection Dais with Dashed Concentric Rings matching Figma
const HolographicDais: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    const cx = 512;
    const cy = 512;

    const colorObj = new THREE.Color(accentColor);
    const r = Math.round(colorObj.r * 255);
    const g = Math.round(colorObj.g * 255);
    const b = Math.round(colorObj.b * 255);

    // 1. Center soft radial glow
    const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, 460);
    radial.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.35)`);
    radial.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.16)`);
    radial.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.04)`);
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Outermost solid subtle ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, 470, 210, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 3. Middle dashed glowing ellipse matching Figma
    ctx.beginPath();
    ctx.setLineDash([14, 12]);
    ctx.ellipse(cx, cy, 390, 175, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.65)`;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 4. Inner dashed ring
    ctx.beginPath();
    ctx.setLineDash([8, 10]);
    ctx.ellipse(cx, cy, 270, 120, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [accentColor]);

  return (
    <group position={[0, -0.92, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial map={texture} transparent opacity={0.92} depthWrite={false} />
      </mesh>
    </group>
  );
};

export const Tech3DCanvas: React.FC<Tech3DCanvasProps> = ({ activeTech }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-4, -2, -1.5]} intensity={1.0} color="#0284C7" />
        <pointLight position={[0, 0.2, 1.4]} intensity={2.2} color={activeTech.color} distance={5.5} />

        {/* Floating Core Structure with Micro-float */}
        <Float speed={2.0} rotationIntensity={0.035} floatIntensity={0.1}>
          {activeTech.id === 'react' && <ReactAtomCenterpiece />}
          {activeTech.id === 'typescript' && <TypeScriptCenterpiece />}
          {activeTech.id === 'micro-frontends' && <MicroFrontendsCenterpiece />}
          {activeTech.id === 'nodejs' && <NodeJsCenterpiece />}
          {activeTech.id === 'python' && <PythonCenterpiece />}

          {/* Floating Sub-Node Beads & Pill Labels matching Figma */}
          {activeTech.nodes3D.map((node) => (
            <group key={node.label} position={node.position}>
              {/* Glowing 3D Particle Bead */}
              <mesh>
                <sphereGeometry args={[0.038, 16, 16]} />
                <meshBasicMaterial color={node.color} />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.065, 14, 14]} />
                <meshBasicMaterial color={node.color} transparent opacity={0.35} />
              </mesh>

              {/* Floating Pill Callout Badge matching Figma */}
              <Html position={[0, 0, 0]} style={{ pointerEvents: 'none' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: node.position[0] < 0 ? undefined : '9px',
                    right: node.position[0] < 0 ? '9px' : undefined,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '2px 7.5px',
                    background: 'rgba(7, 13, 26, 0.92)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 0 8px rgba(56, 189, 248, 0.18)',
                    backdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {node.label}
                </div>
              </Html>
            </group>
          ))}
        </Float>

        {/* Holographic Projection Dais with Dashed Rings */}
        <HolographicDais accentColor={activeTech.color} />

        {/* Center Floating Capsule Badge matching Figma: ● React Ecosystem */}
        <Html position={[0, -0.88, 0.2]} center style={{ pointerEvents: 'none' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(8, 15, 30, 0.94)',
              border: `1.2px solid ${activeTech.color}75`,
              borderRadius: '9999px',
              boxShadow: `0 4px 14px rgba(0, 0, 0, 0.6), 0 0 10px ${activeTech.color}30`,
              backdropFilter: 'blur(16px)',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5.5px',
                height: '5.5px',
                borderRadius: '50%',
                backgroundColor: activeTech.color,
                boxShadow: `0 0 6px ${activeTech.color}`,
              }}
            />
            <span>{activeTech.title}</span>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};
