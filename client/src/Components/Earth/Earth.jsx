import React, { useEffect, useRef, useState, Suspense } from "react";

import Globe from "react-globe.gl";
import * as turf from "@turf/turf";
import * as THREE from "three";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRegion } from '../../store';

import "./Earth.css";
import VideoCardPin from '../VideoCardPin/VideoCardPin';

function Earth({ countries, videos, isCollapsed, isFullScreen }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [earthWidth, setEarthWidth] = useState(800);
  const [earthHeight, setEarthHeight] = useState(800);
  const [activePolygon, setActivePolygon] = useState(null);
  const [loading, setLoading] = useState(true);
  const world = useRef();
  const defaultRegion = 'United States of America';
  const selectedRegion = useSelector(state => state.selectedRegion || defaultRegion);
  console.log(selectedRegion);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
 //console.log(selectedRegion);
  // click on region, reset selected region
  // set default to united states
  // session storage for keeping region selected for other pages 


  const getRegionCoordinates = (regionName) => {
    const region = countries.features.find(country => country.properties.ADMIN.includes(regionName));
    setActivePolygon(region);
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
        world.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
        
      }
    } else {
      // world current pov is set to United States
      world.current.pointOfView({ lat: 38.0, lng: -97.0, altitude: 2 }, 1000);
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
   // setActivePolygon(polygon);
   const regionName = polygon.properties.ADMIN;
   console.log(regionName);
   dispatch(setSelectedRegion(regionName));
    updateMarkers(polygon);
  
    world.current.pointOfView({ lat, lng, altitude: 2 }, 1000);
    setTimeout(() => {
      polygon = null;
    }, 0);
    
  };

  const displayVideoCard = (videoData) => {
   setSelectedVideo(videoData);
   
  };

  const closeVideoCard = () => {
    setSelectedVideo(null); // This will set the selectedVideo to null, causing the VideoCardPin to not render
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

  const populateTags = (videoData) => {
    const element = document.createElement("div");
    const marker = `
            <svg viewBox="-4 0 36 36" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <pattern id="image-bg-${videoData.id}" patternUnits="objectBoundingBox" width="100%" height="100%">
                  <image xlink:href="${videoData.thumbnail}" x="0" y="0" width="28" height="28" />
                </pattern>
              </defs>
              <path fill="white" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268 0 14,0 Z"></path>
              <circle fill="url(#image-bg-${videoData.id})" cx="14" cy="14" r="10"></circle>
            </svg>
          `;

    element.innerHTML = marker;
    element.style.width = "50px";
    element.style.height = "50px";
    element.style["pointer-events"] = "auto";
    element.style.cursor = "pointer";
    element.onclick = () => displayVideoCard(videoData);
    element.style.transform = "translate(-50%, -100%)"; // centers the SVG horizontally on the point and moves it up by its own height
    return element;
  };

  return (
    <div className="earth-container"> {/* Container for both the globe and video card */}
    {selectedVideo && (
      <div className="video-overlay">
          <VideoCardPin video={selectedVideo} onClose={closeVideoCard} />
      </div>
    )}
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
        polygonAltitude={(coordinates) => (coordinates === hoveredCountry ? 0.02 : 0.01)}
        polygonCapColor={(coordinates) => {
          if (coordinates=== hoveredCountry) return "rgba(64,196,250, 0.5)";
          if (coordinates.properties.ADMIN.includes(selectedRegion)) return "rgba(64,196,250, 0.5)";
          return "rgba(0, 0, 0, 0)";
        }}
        polygonSideColor={() => `rgba(0, 0, 0, 0)`}
        polygonStrokeColor={() => `rgba(0, 0, 0, 0)`}
        polygonLabel={({ properties: coordinates }) => `
        <b>${coordinates.ADMIN} (${coordinates.ISO_A2}):</b> <br />
        Population: <i>${coordinates.POP_EST}</i>
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
    </div>
  );
}

export default Earth;
