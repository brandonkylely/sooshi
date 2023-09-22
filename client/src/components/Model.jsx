import { useState } from "react";
import { Canvas, act } from "@react-three/fiber";
import { useGLTF, ContactShadows, Float } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three'

function Model(props) {
  const { scene } = useGLTF("sushi.gltf");
  const [active, setActive] = useState(false);
  const {rotation} = useSpring({rotation: active ? [0, Math.PI * 2, 0] : [0, 0, 0]})

  return <animated.primitive rotation={rotation} onClick={() => {setActive(!active);}} object={scene} {...props} />;
}

function Scene() {
  return (
    <div className="w-full h-screen absolute">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0.2, 1],
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0.1, 0.4, 0.1]} intensity={0.5} />
        <Float
          position={[0.4, 0, 0]}
          rotationIntensity={1.8}
          floatingRange={[-0.05, 0.05]}
          speed={2}
        >
          <Model />
        </Float>
        <ContactShadows position-y={-1.5} opacity={0.6} scale={5} blur={2.4} />
      </Canvas>
    </div>
  );
}

export default Scene;
