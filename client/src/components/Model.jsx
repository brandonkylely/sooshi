import { Canvas } from "@react-three/fiber";
import { useGLTF, ContactShadows, Float } from "@react-three/drei";
import { Color } from "three";

function Model(props) {
  const { scene } = useGLTF("sushi.gltf");
  return <primitive object={scene} {...props} />;
}

function Scene() {
  const backgroundColor = new Color("black");
  return (
    <div className="w-screen h-screen absolute">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0.5, 1],
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0.1, 0.4, 0.1]} intensity={0.5} />
        <Float
          position={[0.4, 0.1, 0]}
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
