import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { TechModule } from '../../types';

export interface UniverseSceneProps {
  accentColor?: string;
  modules?: TechModule[];
  selectedModuleId?: string;
  onSelectModule?: (mod: TechModule) => void;
}

// Particle field around the centerpiece
const FloatingParticles: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#B49AFF'), // lavender
      new THREE.Color('#7939F5'), // purple
      new THREE.Color('#13C9F4'), // cyan
      new THREE.Color('#FF858F'), // coral
      new THREE.Color('#E64BD7'), // magenta
      new THREE.Color('#FFFFFF'), // white
    ];

    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const rVal = pseudoRandom(i * 1.7 + 1);
      const thetaVal = pseudoRandom(i * 2.3 + 2);
      const phiVal = pseudoRandom(i * 3.1 + 3);

      const radius = 2.1 + rVal * 2.6;
      const theta = thetaVal * Math.PI * 2;
      const phi = Math.acos(phiVal * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.7;

      const colorIdx = Math.floor(pseudoRandom(i * 4.7 + 4) * palette.length);
      const color = palette[colorIdx];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.035;
      pointsRef.current.rotation.x = Math.sin(time * 0.04) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Pedestal Dais & Soft Floor Shadow
const PedestalDais: React.FC = () => {
  return (
    <group position={[0, -2.2, 0]}>
      {/* Soft Contact Shadow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[2.0, 64]} />
        <meshBasicMaterial color="#101B4C" transparent opacity={0.06} />
      </mesh>

      {/* Primary Inner Glowing Dais Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.4, 1.425, 64]} />
        <meshBasicMaterial color="#B49AFF" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Secondary Outer Luminous Dais Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[1.85, 1.87, 64]} />
        <meshBasicMaterial color="#13C9F4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Faint Outer Perimeter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[2.25, 2.265, 64]} />
        <meshBasicMaterial color="#7939F5" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Compact, Intertwined Purple Knot Centerpiece with Delicate Orbital Rings
const CompactPurpleKnot: React.FC<{ accentColor?: string }> = ({
  accentColor = '#7939F5',
}) => {
  const knotRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // MeshPhysicalMaterial matching Figma iridescent purple knot
  const knotMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#4C1D95'),
        emissive: new THREE.Color('#2E1065'),
        emissiveIntensity: 0.25,
        roughness: 0.09,
        metalness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        reflectivity: 0.98,
        sheen: 1.0,
        sheenRoughness: 0.18,
        sheenColor: new THREE.Color('#E879F9'),
        ior: 1.54,
      }),
    [accentColor]
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C4B5FD'),
        emissive: new THREE.Color('#8B5CF6'),
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.4,
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  const cyanRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#13C9F4'),
        emissive: new THREE.Color('#06B6D4'),
        emissiveIntensity: 0.25,
        roughness: 0.25,
        metalness: 0.4,
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (knotRef.current) {
      // Gentle, slow floating rotation
      knotRef.current.rotation.y = time * 0.18;
      knotRef.current.rotation.x = 0.25 + Math.sin(time * 0.3) * 0.06;
      knotRef.current.rotation.z = Math.cos(time * 0.22) * 0.04;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.09;
      ring1Ref.current.rotation.x = Math.PI / 2.8 + Math.sin(time * 0.18) * 0.03;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.07;
      ring2Ref.current.rotation.y = Math.cos(time * 0.2) * 0.05;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.11;
      ring3Ref.current.rotation.x = -Math.PI / 3.2 + Math.cos(time * 0.25) * 0.04;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* Central Intertwined Knot matching Figma */}
      <group ref={knotRef}>
        <mesh material={knotMaterial}>
          {/* TorusKnot (2, 3) provides clean intertwining loops with visible gaps */}
          <torusKnotGeometry args={[0.72, 0.22, 180, 42, 2, 3]} />
        </mesh>
      </group>

      {/* Delicate Lavender Orbital Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.8, 0.2, -0.1]}>
        <torusGeometry args={[1.52, 0.007, 16, 120]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>

      {/* Delicate Cyan/Lavender Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.4, -0.35, 0.4]}>
        <torusGeometry args={[1.78, 0.006, 16, 120]} />
        <primitive object={cyanRingMaterial} attach="material" />
      </mesh>

      {/* Delicate Accent Orbital Ring 3 */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 3.2, 0.4, 0.2]}>
        <torusGeometry args={[2.02, 0.005, 16, 120]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>

      {/* Micro-beads / Glowing nodes positioned along orbital paths */}
      <mesh position={[1.1, 0.9, 0.3]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#FF858F" emissive="#FF858F" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[-1.2, -0.7, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#13C9F4" emissive="#13C9F4" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, -1.2, -0.2]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#E64BD7" emissive="#E64BD7" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      <mesh position={[-0.8, 1.1, -0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#B49AFF" emissive="#B49AFF" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// 10 3D TECHNOLOGY MODULE OBJECTS (matching IMAGE 1 exactly)
// -------------------------------------------------------------

// 1. React: Cyan Faceted Polyhedron + Atom Orbital Ring
const ReactMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={meshRef} scale={scale}>
      {/* Faceted Cyan Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshPhysicalMaterial
          color="#13C9F4"
          emissive="#0891B2"
          emissiveIntensity={0.3}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transmission={0.4}
          opacity={0.92}
          transparent
          reflectivity={0.9}
        />
      </mesh>

      {/* Cyan Wireframe Edge Accent */}
      <mesh>
        <icosahedronGeometry args={[0.325, 0]} />
        <meshStandardMaterial
          color="#A5F3FC"
          emissive="#22D3EE"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbiting Atom Ring */}
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[0.42, 0.012, 16, 48]} />
        <meshStandardMaterial color="#67E8F9" emissive="#06B6D4" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

// 2. TypeScript: Coral Sphere with "TS" text
const TypeScriptMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = Math.sin(time * 0.35) * 0.2;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={meshRef} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshPhysicalMaterial
          color="#FF858F"
          emissive="#E11D48"
          emissiveIntensity={0.18}
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>
      {/* White "TS" Monogram on front */}
      <Text
        position={[0, 0, 0.35]}
        fontSize={0.22}
        color="#FFFFFF"
        fontWeight={800}
        anchorX="center"
        anchorY="middle"
      >
        TS
      </Text>
    </group>
  );
};

// 3. UI Architecture: Magenta Pyramid atop Translucent Purple Cube
const UIArchitectureMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.25;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Base Translucent Purple Cube */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshPhysicalMaterial
          color="#7939F5"
          emissive="#3B0764"
          emissiveIntensity={0.25}
          roughness={0.18}
          clearcoat={1.0}
          transmission={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Magenta 4-sided Pyramid */}
      <mesh position={[0, 0.28, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.26, 0.42, 4]} />
        <meshPhysicalMaterial
          color="#E64BD7"
          emissive="#A21CAF"
          emissiveIntensity={0.25}
          roughness={0.14}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
};

// 4. Micro-Frontends: Glossy Orange Torus
const MicroFrontendsMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = 0.6 + Math.sin(time * 0.4) * 0.15;
      meshRef.current.rotation.y = time * 0.35;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <mesh ref={meshRef} scale={scale} rotation={[0.6, 0.3, 0]}>
      <torusGeometry args={[0.28, 0.13, 24, 48]} />
      <meshPhysicalMaterial
        color="#FFA043"
        emissive="#C2410C"
        emissiveIntensity={0.2}
        roughness={0.12}
        clearcoat={1.0}
        reflectivity={0.92}
      />
    </mesh>
  );
};

// 5. Node.js: Green Faceted Hexagonal Polyhedron
const NodeJsMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.z = Math.sin(time * 0.25) * 0.08;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.36, 6]} />
        <meshPhysicalMaterial
          color="#19C979"
          emissive="#047857"
          emissiveIntensity={0.25}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>
      {/* Front "JS" symbol */}
      <Text
        position={[0, 0, 0.32]}
        fontSize={0.2}
        color="#FFFFFF"
        fontWeight={800}
        anchorX="center"
        anchorY="middle"
      >
        JS
      </Text>
    </group>
  );
};

// 6. Python + FastAPI: Blue and Yellow Interlocking Curved Shapes
const PythonMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Blue Top Half-Shape */}
      <group position={[-0.05, 0.06, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.18, 0.075, 16, 32, Math.PI * 1.2]} />
          <meshPhysicalMaterial
            color="#3776AB"
            emissive="#1E3A8A"
            emissiveIntensity={0.25}
            roughness={0.14}
            clearcoat={1.0}
          />
        </mesh>
        {/* Tiny eye dot */}
        <mesh position={[-0.08, 0.12, 0.06]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Yellow Bottom Half-Shape */}
      <group position={[0.05, -0.06, 0]}>
        <mesh rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.18, 0.075, 16, 32, Math.PI * 1.2]} />
          <meshPhysicalMaterial
            color="#FFD343"
            emissive="#B45309"
            emissiveIntensity={0.2}
            roughness={0.14}
            clearcoat={1.0}
          />
        </mesh>
        {/* Tiny eye dot */}
        <mesh position={[0.08, -0.12, 0.06]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
};

// 7. Projects: Glossy Purple Code Panels with </>
const ProjectsMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = -0.15 + Math.sin(time * 0.3) * 0.1;
      groupRef.current.rotation.x = 0.1 + Math.cos(time * 0.25) * 0.08;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Front Purple Panel */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.46, 0.34, 0.04]} />
        <meshPhysicalMaterial
          color="#7939F5"
          emissive="#3B0764"
          emissiveIntensity={0.25}
          roughness={0.14}
          clearcoat={1.0}
        />
      </mesh>

      {/* Code symbol </> on front */}
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.15}
        color="#FFFFFF"
        fontWeight={800}
        anchorX="center"
        anchorY="middle"
      >
        {'</>'}
      </Text>

      {/* Rear Offset Violet Panel */}
      <mesh position={[-0.06, 0.06, -0.02]}>
        <boxGeometry args={[0.42, 0.32, 0.03]} />
        <meshPhysicalMaterial
          color="#5421C8"
          roughness={0.2}
          clearcoat={0.8}
          transmission={0.3}
          transparent
        />
      </mesh>
    </group>
  );
};

// 8. About: Lavender Faceted Geometric Crystal
const AboutMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.35;
      meshRef.current.rotation.z = Math.sin(time * 0.25) * 0.15;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <mesh ref={meshRef} scale={scale}>
      <octahedronGeometry args={[0.32, 0]} />
      <meshPhysicalMaterial
        color="#B49AFF"
        emissive="#6D28D9"
        emissiveIntensity={0.25}
        roughness={0.15}
        clearcoat={1.0}
        transmission={0.35}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
};

// 9. Experience: Blue-Violet Bust in Translucent Glass Dome
const ExperienceMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Translucent Glass Dome */}
      <mesh position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          emissive="#A78BFA"
          emissiveIntensity={0.15}
          roughness={0.05}
          transmission={0.85}
          transparent
          opacity={0.5}
          clearcoat={1.0}
          ior={1.4}
        />
      </mesh>

      {/* Humanoid Head inside */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshPhysicalMaterial
          color="#4B7BEC"
          emissive="#1D4ED8"
          emissiveIntensity={0.25}
          roughness={0.16}
          clearcoat={0.9}
        />
      </mesh>

      {/* Shoulders inside */}
      <mesh position={[0, -0.12, 0]} scale={[1.3, 0.7, 0.8]}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshPhysicalMaterial
          color="#4B7BEC"
          emissive="#1D4ED8"
          emissiveIntensity={0.25}
          roughness={0.16}
          clearcoat={0.9}
        />
      </mesh>
    </group>
  );
};

// 10. Contact: Hot-Pink Speech Bubble with 3 White Dots
const ContactMesh: React.FC<{ isHovered: boolean; isSelected: boolean }> = ({ isHovered, isSelected }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.35) * 0.15;
    }
  });

  const scale = isHovered || isSelected ? 1.15 : 1.0;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main Bubble */}
      <mesh scale={[1.15, 0.9, 0.7]}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          color="#E64BD7"
          emissive="#BE185D"
          emissiveIntensity={0.25}
          roughness={0.12}
          clearcoat={1.0}
          reflectivity={0.9}
        />
      </mesh>

      {/* Tail Cone */}
      <mesh position={[-0.18, -0.18, 0]} rotation={[0, 0, -2.4]}>
        <coneGeometry args={[0.07, 0.16, 16]} />
        <meshPhysicalMaterial
          color="#E64BD7"
          emissive="#BE185D"
          emissiveIntensity={0.25}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* 3 White Dots */}
      <mesh position={[-0.09, 0, 0.18]}>
        <sphereGeometry args={[0.026, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0, 0.19]}>
        <sphereGeometry args={[0.026, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.09, 0, 0.18]}>
        <sphereGeometry args={[0.026, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
};

// Component Map for 3D Technology Module Meshes
const MESH_COMPONENTS: Record<
  string,
  React.FC<{ isHovered: boolean; isSelected: boolean }>
> = {
  'react-ecosystem': ReactMesh,
  typescript: TypeScriptMesh,
  'ui-architecture': UIArchitectureMesh,
  'micro-frontends': MicroFrontendsMesh,
  nodejs: NodeJsMesh,
  'python-fastapi': PythonMesh,
  projects: ProjectsMesh,
  'tech-stack': ReactMesh,
  about: AboutMesh,
  experience: ExperienceMesh,
  contact: ContactMesh,
};

// Interactive Technology Node Component
// Connected Floating Label matching Figma
const TechModuleNode: React.FC<{
  module: TechModule;
  isSelected: boolean;
  onSelect: (mod: TechModule) => void;
}> = ({ module, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const MeshComponent = MESH_COMPONENTS[module.id] || ReactMesh;

  const labelOffset = module.labelOffset || [0, 0.48, 0];

  return (
    <group position={module.position3D}>
      {/* Interactive 3D Mesh with subtle hover & float */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group
          onClick={(e) => {
            e.stopPropagation();
            onSelect(module);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setIsHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setIsHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          <MeshComponent isHovered={isHovered} isSelected={isSelected} />
        </group>
      </Float>

      {/* Connected Floating Label matching exact Figma white pill */}
      <Html
        position={labelOffset}
        center
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(module);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Select ${module.label} module`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5.5px',
            padding: '3.5px 10px',
            backgroundColor: '#FFFFFF',
            border: isSelected
              ? `1.5px solid ${module.color}`
              : '1px solid rgba(226, 218, 206, 0.85)',
            borderRadius: '9999px',
            boxShadow: isSelected
              ? `0 0 0 2px ${module.color}28, 0 4px 14px rgba(15, 23, 42, 0.12)`
              : isHovered
              ? '0 4px 12px rgba(15, 23, 42, 0.10)'
              : '0 2px 6px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#0F172A',
            cursor: 'pointer',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            lineHeight: 1.2,
            transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered || isSelected ? 'scale(1.04)' : 'scale(1)',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: module.color,
              boxShadow: `0 0 4px ${module.color}`,
              display: 'inline-block',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <span>{module.label}</span>
        </button>
      </Html>
    </group>
  );
};

// Floating Pastel Micro-Accents (cubes & spheres) matching Figma background depth
const PastelMicroAccents: React.FC = () => {
  const accents = useMemo(
    () => [
      { pos: [-1.4, -0.2, 0.4] as [number, number, number], color: '#B49AFF', size: 0.075, isBox: true },
      { pos: [1.3, -1.0, 0.3] as [number, number, number], color: '#FF858F', size: 0.065, isBox: false },
      { pos: [0.5, 1.25, -0.3] as [number, number, number], color: '#13C9F4', size: 0.07, isBox: true },
      { pos: [-0.9, -1.3, 0.5] as [number, number, number], color: '#A855F7', size: 0.08, isBox: true },
      { pos: [1.8, 0.95, -0.25] as [number, number, number], color: '#22C55E', size: 0.065, isBox: false },
      { pos: [-1.9, 1.15, -0.2] as [number, number, number], color: '#13C9F4', size: 0.07, isBox: true },
      { pos: [2.1, -1.2, 0.35] as [number, number, number], color: '#E879F9', size: 0.075, isBox: true },
      { pos: [-0.3, 1.95, -0.25] as [number, number, number], color: '#FFD43B', size: 0.06, isBox: false },
      { pos: [-2.2, -0.1, -0.3] as [number, number, number], color: '#B49AFF', size: 0.065, isBox: true },
      { pos: [1.0, 0.7, 0.4] as [number, number, number], color: '#FF858F', size: 0.05, isBox: false },
      { pos: [-0.6, 0.8, -0.4] as [number, number, number], color: '#13C9F4', size: 0.055, isBox: false },
      { pos: [0.2, -1.5, 0.4] as [number, number, number], color: '#A855F7', size: 0.07, isBox: true },
    ],
    []
  );

  return (
    <group>
      {accents.map((item, idx) => (
        <Float key={idx} speed={1.5 + (idx % 3) * 0.4} rotationIntensity={0.25} floatIntensity={0.25}>
          <mesh position={item.pos} rotation={[0.4 * idx, 0.6 * idx, 0.2 * idx]}>
            {item.isBox ? (
              <boxGeometry args={[item.size, item.size, item.size]} />
            ) : (
              <sphereGeometry args={[item.size, 16, 16]} />
            )}
            <meshPhysicalMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.15}
              roughness={0.18}
              clearcoat={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const UniverseScene: React.FC<UniverseSceneProps> = ({
  accentColor = '#7939F5',
  modules = [],
  selectedModuleId = 'projects',
  onSelectModule = () => {},
}) => {
  return (
    <>
      {/* Studio Lighting Setup matching Figma */}
      <ambientLight intensity={1.25} color="#FFFDF7" />

      {/* Key Light: Crisp top-left warm white light */}
      <directionalLight position={[5, 8, 7]} intensity={2.3} color="#FFFFFF" />

      {/* Violet Accent Rim Light: Left-back highlight */}
      <directionalLight position={[-6, 5, -5]} intensity={1.9} color="#A855F7" />

      {/* Cyan Accent Fill Light: Bottom-right specular sheen */}
      <directionalLight position={[6, -4, 4]} intensity={1.3} color="#06B6D4" />

      {/* Rear Soft Lavender Backlight for contour separation */}
      <directionalLight position={[0, 6, -7]} intensity={1.1} color="#E9D5FF" />

      {/* Point Light inside centerpiece for interior specular glow */}
      <pointLight position={[0, 0.2, 1.4]} intensity={1.6} distance={8} color="#C084FC" />

      {/* Compact Central Sculpture Centerpiece */}
      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.25}>
        <CompactPurpleKnot accentColor={accentColor} />
      </Float>

      {/* 10 Technology Modules floating around the knot */}
      {modules.map((mod) => (
        <TechModuleNode
          key={mod.id}
          module={mod}
          isSelected={mod.id === selectedModuleId}
          onSelect={onSelectModule}
        />
      ))}

      {/* Floating Pastel Micro-Accents matching Figma depth */}
      <PastelMicroAccents />

      {/* Pedestal Dais & Soft Contact Shadow */}
      <PedestalDais />

      {/* Subtle Floating Ambient Particles */}
      <FloatingParticles count={50} />
    </>
  );
};

export default UniverseScene;
