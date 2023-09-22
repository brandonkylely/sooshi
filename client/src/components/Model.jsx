import { Canvas } from "@react-three/fiber";
import { useGLTF, ContactShadows, Float, Environment } from "@react-three/drei";
import { Color } from "three";

function Model(props) {
  const { scene } = useGLTF("sushi.gltf");
  return <primitive object={scene} {...props} />;
}

function Scene() {
  const backgroundColor = new Color("black");
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [-0.5, 0.4, 1],
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[-0.2, 0.2, 0.2]} intensity={0.3} />
        <Float rotationIntensity={1.8} floatingRange={[-0.05, 0.05]} speed={2}>
          <Model />
        </Float>
        <ContactShadows position-y={-1.5} opacity={0.6} scale={5} blur={2.4} />
      </Canvas>
    </div>
  );
}

export default Scene;
