import React, { useEffect, useRef, useState, Suspense } from "react";
import Globe from "react-globe.gl";
import * as turf from "@turf/turf";
import * as THREE from "three";
import { useSelector } from "react-redux";

import "./Earth.css";

function Earth({ countries, videos, isCollapsed, isFullScreen }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [earthWidth, setEarthWidth] = useState(800);
  const [earthHeight, setEarthHeight] = useState(800);
  const [loading, setLoading] = useState(true);
  const world = useRef();
  const selectedRegion = useSelector(state => state.selectedRegion);

  const getRegionCoordinates = (regionName) => {
    const region = countries.features.find(country => country.properties.ADMIN === regionName);
    if (region) {
      const centroid = turf.centroid(region);
      return centroid.geometry.coordinates;
    }
    return null;
  };

  useEffect(() => {
    world.current.controls().enableZoom = false;
    world.current.pointOfView({ lat: 0, lng: 0, altitude: 2.0 }, 200);

    if (selectedRegion) {
      const coordinates = getRegionCoordinates(selectedRegion);
      if (coordinates) {
        const [lng, lat] = coordinates;
        world.current.pointOfView({ lat, lng, altitude: 2.0 }, 1000);
      }
    }

    if (!isFullScreen) {
    //  world.current.pointOfView({ lat: 0, lng: 0, altitude: 2.0 }, 200);
      setEarthHeight(500);
      setEarthWidth(500);
    } else {
    //  world.current.pointOfView({ lat: 0, lng: 0, altitude: 2.0 }, 200);
      setEarthHeight(800);
      setEarthWidth(800);
    }
    console.log(world.current.camera());
    console.log(world.current.scene());
  }, [selectedRegion,isCollapsed, isFullScreen]);

  const handlePolygonClick = (polygon, coords) => {
    let { lat, lng, altitude } = coords;
    let activePolygon = polygon;
    updateMarkers(activePolygon);
    world.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
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

  const populateTags = (d) => {
    const el = document.createElement("div");
    const marker = `
            <svg viewBox="-4 0 36 36" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <pattern id="image-bg-${d.id}" patternUnits="objectBoundingBox" width="100%" height="100%">
                  <image xlink:href="${d.thumbnail}" x="0" y="0" width="28" height="28" />
                </pattern>
              </defs>
              <path fill="white" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268 0 14,0 Z"></path>
              <circle fill="url(#image-bg-${d.id})" cx="14" cy="14" r="10"></circle>
            </svg>
          `;

    el.innerHTML = marker;
    el.style.width = "50px";
    el.style.height = "50px";
    el.style["pointer-events"] = "auto";
    el.style.cursor = "pointer";
    el.onclick = () => console.info(d);
    el.style.transform = "translate(-50%, -100%)"; // centers the SVG horizontally on the point and moves it up by its own height
    return el;
  };

  return (
    <Suspense fallback={<div className="loading">Loading Earth...</div>}>
      <Globe
        backgroundColor="#121118"
        width={earthWidth}
        height={earthHeight}
        ref={world}
        globeImageUrl={
          "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        }
        bumpImageUrl={"//unpkg.com/three-globe/example/img/earth-topology.png"}
        atmosphereColor="white"
        polygonsData={countries.features}
        polygonsTransitionDuration={300}
        polygonAltitude={(d) => (d === hoveredCountry ? 0.02 : 0.01)}
        polygonCapColor={(d) => {
          if (d === hoveredCountry) return "rgba(64,196,250, 0.5)";
          if (d.properties.ADMIN === selectedRegion)
            return "rgba(64,196,250, 0.5)";
          return "rgba(0, 0, 0, 0)";
        }}
        polygonSideColor={() => `rgba(0, 0, 0, 0)`}
        polygonStrokeColor={() => `rgba(0, 0, 0, 0)`}
        polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        Population: <i>${d.POP_EST}</i>
      `}
        onPolygonHover={(country) => {
          setHoveredCountry(country);
        }}
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
