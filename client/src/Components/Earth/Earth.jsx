import React, { useEffect, useRef, useState, Suspense } from "react";

import Globe from "react-globe.gl";
import * as turf from "@turf/turf";

import "./Earth.css";

function Earth({ countries, videos }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [earthWidth, setEarthWidth] = useState(window.innerWidth);
  const [earthHeight, setEarthHeight] = useState(window.innerHeight);
  const world = useRef();

  useEffect(() => {
    const resizeListener = () => {
      setEarthWidth(window.innerWidth);
      setEarthHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  });

  const handlePolygonClick = (polygon, coords) => {
    let { lat, lng, altitude } = coords;
    let activePolygon = polygon;
    updateMarkers(activePolygon);
    world.current.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
    setTimeout(() => {
      activePolygon = null;
    }, 0);
  };

  const updateMarkers = (activePolygon) => {
    if (activePolygon) {
      const filteredVideos = videos.filter((video) => {
        const point = turf.point([video.lng, video.lat]);
        return turf.booleanPointInPolygon(point, activePolygon);
      });
      setTagData(filteredVideos);
    } else {
      console.log("no hovered country");
      return [];
    }
  };

  const populateTags = (data) => {
    const element = document.createElement("div");
    const marker = `
            <svg viewBox="-4 0 36 36" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <pattern id="image-bg-${data.id}" patternUnits="objectBoundingBox" width="100%" height="100%">
                  <image xlink:href="${data.thumbnail}" x="0" y="0" width="28" height="28" />
                </pattern>
              </defs>
              <path fill="white" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268 0 14,0 Z"></path>
              <circle fill="url(#image-bg-${data.id})" cx="14" cy="14" r="10"></circle>
            </svg>
          `;

    element.innerHTML = marker;
    element.style.width = "50px";
    element.style.height = "50px";
    element.style["pointer-events"] = "auto";
    element.style.cursor = "pointer";
    element.onclick = () => console.info(data);
    element.style.transform = "translate(-50%, -100%)"; // centers the SVG horizontally on the point and moves it up by its own height
    return element;
  };

  return (
    <Suspense fallback={<div className="loading">Loading Earth...</div>}>
      <Globe
        width={earthWidth}
        height={earthHeight}
        ref={world}
        globeImageUrl={
          "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        }
        bumpImageUrl={"//unpkg.com/three-globe/example/img/earth-topology.png"}
        atmosphereColor="white"
        polygonsData={countries.features}
        polygonAltitude={(data) => (data === hoveredCountry ? 0.02 : 0.01)}
        polygonCapColor={(data) =>
          data === hoveredCountry ? "rgba(64,196,250, 0.5)" : `rgba(0, 0, 0, 0)`
        }
        polygonSideColor={() => `rgba(0, 0, 0, 0)`}
        polygonStrokeColor={() => `rgba(0, 0, 0, 0)`}
        polygonLabel={({ properties: data }) => `
        <b>${data.ADMIN} (${data.ISO_A2}):</b> <br />
        Population: <i>${data.POP_EST}</i>
      `}
        onPolygonHover={(country) => {
          setHoveredCountry(country);
        }}
        polygonsTransitionDuration={300}
        onPolygonClick={(polygon, event, { lat, lng, altitude }) =>
          handlePolygonClick(polygon, { lat, lng, altitude })
        }
        htmlElementsData={tagData}
        htmlElement={(video) => populateTags(video)}
      />
    </Suspense>
  );
}

export default Earth;
