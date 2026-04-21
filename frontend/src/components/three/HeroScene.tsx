import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBook = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 2) * 0.2;
    mesh.current.rotation.y = time / 2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[1, 1.4, 0.2]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    </Float>
  );
};

const GraduationCap = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <group position={position}>
        {/* Base */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Top */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1.2, 1.2, 0.05]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </Float>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-950">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <GraduationCap position={[0, 0, 0]} />
        <FloatingBook position={[-2, 1, -1]} />
        <FloatingBook position={[2, -1, -2]} />
        <FloatingBook position={[-3, -2, 0]} />
        
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[10, 32, 32]} />
          <MeshDistortMaterial
            color="#4338ca"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            opacity={0.1}
            transparent
          />
        </mesh>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
