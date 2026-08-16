"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ForgeAtmosphere } from "./ForgeAtmosphere";
import { applyTemperShader } from "./temperMaterial";
import { useForgeEnvironment } from "./useForgeEnvironment";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

type ForgeSceneProps = {
  pointer: Pointer;
  active?: boolean;
  onReady?: () => void;
};

function CameraRig({ pointer }: { pointer: Pointer }) {
  useFrame((state, delta) => {
    const targetX = pointer.x.get() * 0.3;
    const targetY = pointer.y.get() * 0.16;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3.2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function ForgedRibbon({ pointer }: { pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);
  const hotLight = useRef<THREE.PointLight>(null);
  const steel = useRef<THREE.MeshPhysicalMaterial>(null);
  // A ref rather than useMemo: this uniform is written every frame, and the compiler's
  // immutability rule (rightly) refuses mutation of a memoised value.
  const time = useRef<THREE.IUniform<number>>({ value: 0 });

  useEffect(() => {
    if (steel.current) applyTemperShader(steel.current, time.current);
  }, []);

  const geometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-3.6, -0.1, 0.3),
        new THREE.Vector3(-2.4, 2.35, -0.55),
        new THREE.Vector3(0.2, 2.85, -0.15),
        new THREE.Vector3(2.9, 1.65, 0.7),
        new THREE.Vector3(3.45, -0.75, 0.2),
        new THREE.Vector3(1.65, -2.5, -0.55),
        new THREE.Vector3(-1.2, -2.25, 0.85),
      ],
      true,
      "centripetal",
      0.42,
    );
    const section = new THREE.Shape();
    section.moveTo(-0.72, -0.12);
    section.lineTo(0.72, -0.12);
    section.lineTo(0.72, 0.12);
    section.lineTo(-0.72, 0.12);
    section.closePath();
    const result = new THREE.ExtrudeGeometry(section, {
      steps: 180,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      extrudePath: path,
    });
    result.center();
    result.computeVertexNormals();
    return result;
  }, []);

  useFrame((state, delta) => {
    time.current.value += delta;
    if (!group.current) return;
    const pointerX = pointer.x.get();
    const pointerY = pointer.y.get();
    group.current.rotation.y += delta * 0.055;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.18 + pointerY * 0.13, 2.5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.13 + pointerX * 0.07, 2.5, delta);
    if (hotLight.current) {
      hotLight.current.position.x = Math.sin(state.clock.elapsedTime * 0.28) * 4;
      hotLight.current.position.y = Math.cos(state.clock.elapsedTime * 0.21) * 2;
    }
  });

  // Raised off centre so the arc grazes the top of the frame as it turns: the fixed header
  // difference-blends against whatever is behind it, and that strip used to be empty.
  return (
    <group ref={group} scale={0.9} position={[0.8, 0.55, 0]} rotation={[-0.18, -0.35, -0.13]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={steel}
          color="#61676a"
          metalness={0.94}
          roughness={0.29}
          clearcoat={0.18}
          clearcoatRoughness={0.62}
          // Forged and milled stock has directional micro-grooves; highlights stretch across
          // them rather than sitting as round points.
          anisotropy={0.55}
          anisotropyRotation={Math.PI * 0.5}
        />
        <Edges threshold={28} color="#b3b7b7" opacity={0.28} transparent />
      </mesh>

      {/* Weld collars are intentionally visible: the loop reads as fabricated sections. */}
      <mesh position={[2.58, 1.52, 0.56]} rotation={[0.45, -0.4, 1.2]}>
        <boxGeometry args={[0.16, 1.55, 0.32]} />
        <meshStandardMaterial color="#77614f" metalness={0.9} roughness={0.42} />
      </mesh>
      <mesh position={[-1.08, -2.23, 0.72]} rotation={[0.1, 0.25, 1.43]}>
        <boxGeometry args={[0.15, 1.48, 0.31]} />
        <meshStandardMaterial color="#4d5f70" metalness={0.88} roughness={0.4} />
      </mesh>

      <pointLight ref={hotLight} position={[2, 2, 3]} color="#d98554" intensity={34} distance={8} decay={2} />
    </group>
  );
}

function ForgeEnvironment() {
  const environment = useForgeEnvironment();
  if (!environment) return null;
  return <primitive object={environment} attach="environment" />;
}

export default function ForgeScene({ pointer, active = true, onReady }: ForgeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10.2], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
      onCreated={() => onReady?.()}
    >
      <ForgeEnvironment />
      {/* Pulled well back from 0.42: the environment now supplies the ambient term, and
          leaving both in flattened the very reflections it was added to produce. */}
      <ambientLight intensity={0.16} color="#8b9296" />
      <directionalLight position={[-5, 6, 6]} intensity={3.2} color="#e7edf0" castShadow />
      <directionalLight position={[4, -3, 4]} intensity={2.1} color="#435f87" />
      <spotLight position={[0, 7, -1]} intensity={52} color="#fff7e8" angle={0.22} penumbra={0.9} distance={16} />
      <ForgedRibbon pointer={pointer} />
      <CameraRig pointer={pointer} />
      <ForgeAtmosphere />
    </Canvas>
  );
}
