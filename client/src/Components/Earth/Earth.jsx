import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader, BackSide, Raycaster, Vector2 } from "three";
import EarthNightMap from "./night-earth.jpg";
import EarthDayMap from "./day-earth.jpg";
import SpaceMap from "./space.jpg";
import SkyMap from "./sky.jpg";
import EarthNormalMap from "./normal.jpg";
import EarthSpecularMap from "./specular.png";
import EarthCloudsMap from "./clouds.jpg";
import * as THREE from "three";

import "./Earth.css";

function Background() {
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";
  const texture = useLoader(TextureLoader, SpaceMap);

  return (
    <mesh scale={[100, 100, 100]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
}

function Earth(props) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const earthScale = 2;
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";

  const { camera } = useThree();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // earthRef.current.rotation.y = elapsedTime / 6;
    // cloudsRef.current.rotation.y = elapsedTime / 6;
  });

  const onClick = (event) => {
    const mouse = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(earthRef.current);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      const latLng = convertToLatLng(point);
      const continent = getContinentFromLatLng(latLng);
      props.onSelectContinent(continent);
    }
  };

  function convertToLatLng(point, radius = 1) {
    // Assuming point is a THREE.Vector3 object and radius is the globe's radius
    const lat = (Math.asin(point.y / radius) * 180) / Math.PI;
    const lng = (Math.atan2(point.x, point.z) * 180) / Math.PI;

    return { lat, lng };
  }

  function getContinentFromLatLng({ lat, lng }) {
    // This is a mock function. In a real application, you would query a database or use an API.
    if (lat > 50 && lng < -30) {
      return "North America";
    } else if (lat > 30 && lng > -10 && lng < 40) {
      return "Europe";
    } else if (lat > 0 && lng > 40 && lng < 100) {
      return "Asia";
    } else if (lat < 0 && lng > 100) {
      return "Australia";
    } // ... other simple mock conditions for demonstration

    return "Unknown"; // Fallback
  }

  // Attach the onClick handler to the canvas
  // Note: You might need to adjust this based on how your Canvas is set up.
  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [props.camera]);

  let earthTexture = isDarkMode ? EarthNightMap : EarthDayMap;

  return (
    <>
      <mesh
        ref={earthRef}
        scale={[earthScale, earthScale, earthScale]}
        position={[0, -1, 0]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          specularMap={new TextureLoader().load(EarthSpecularMap)}
        />
        <meshStandardMaterial
          map={new TextureLoader().load(earthTexture)}
          normalMap={new TextureLoader().load(EarthNormalMap)}
        />
      </mesh>
      {/* <mesh ref={cloudsRef} scale={[earthScale, earthScale, earthScale]} position={[0, -1, 0]}>
                <sphereGeometry args={[1.01, 32, 32]} />
                <meshPhongMaterial
                    map={new TextureLoader().load(EarthCloudsMap)}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh> */}
    </>
  );
}

function EarthScene(props) {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";

  return (
    <Suspense fallback={<div className="loading">Loading Earth...</div>}>
      <Canvas>
        <ambientLight intensity={2} color="white" />
        <directionalLight color="white" position={[5, 3, 5]} />
        <Earth onSelectContinent={setSelectedContinent} />
        {/* <Background /> */}
        <OrbitControls />
        <Stars />
      </Canvas>
    </Suspense>
  );
}

export default EarthScene;
