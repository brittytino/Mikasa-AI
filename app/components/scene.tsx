'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls, Text3D, Center, Stars, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function FloatingCrystal({ position = [0, 0, 0], color = "#ff0000" }: { position?: [number, number, number], color?: string }) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      mesh.current.rotation.y += 0.01
      mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, hovered ? 0.6 : 0.5, 0.1)
      mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, hovered ? 0.6 : 0.5, 0.1)
      mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, hovered ? 0.6 : 0.5, 0.1)
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
    </Float>
  )
}

function FloatingSymbols() {
  return (
    <group position={[0, 0, -5]}>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={Math.random()}
          floatIntensity={Math.random() * 2}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={0.5}
            height={0.1}
            curveSegments={12}
          >
            {['自', '由', 'の', '翼'][Math.floor(Math.random() * 4)]}
            <meshStandardMaterial
              color="#ff0000"
              emissive="#330000"
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>
        </Float>
      ))}
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas>
      <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <Suspense fallback={null}>
        <FloatingSymbols />
        <FloatingCrystal position={[-2, -1, 0]} color="#ff3333" />
        <FloatingCrystal position={[2, -1, 0]} color="#ff0000" />
        <FloatingCrystal position={[0, 1, 0]} color="#cc0000" />
        <Stars 
          radius={50}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Environment preset="night" background blur={0.8} />
      </Suspense>
      <fog attach="fog" args={['#000000', 5, 15]} />
    </Canvas>
  )
}

