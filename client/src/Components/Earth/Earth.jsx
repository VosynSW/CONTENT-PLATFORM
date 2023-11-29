import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as turf from '@turf/turf';
import con from '../../Data/ne_110m_admin_0_countries.geojson';

function Earth({ countries, videos }) {
  // print video data
  console.log("printing features");
  // countries.map ((country) => console.log(country.features));
  console.log(countries.features);

  const globeVizRef = useRef(null);

  useEffect(() => {
    if (!globeVizRef.current) return;

    let activePolygon = null;
    let world;

    world = Globe()(globeVizRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    //  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .atmosphereColor('white')
      .polygonsData(countries.features)
      .polygonAltitude(0.01)
      .polygonCapColor(() => `rgba(0, 0, 0, 0)`)
      .polygonSideColor(() => `rgba(0, 0, 0, 0)`)
      .polygonStrokeColor(() => `rgba(0, 0, 0, 0)`)
      .polygonLabel(({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        Population: <i>${d.POP_EST}</i>
      `)
      .onPolygonHover(hoverD => world
        .polygonAltitude(d => d === hoverD ? 0.02 : 0.01)
        .polygonCapColor(d => d === hoverD ? 'rgba(64,196,250, 0.5)' : `rgba(0, 0, 0, 0)`)
      )
      .polygonsTransitionDuration(300)
      .onPolygonClick(polygon => {
        activePolygon = polygon;
        console.log(polygon.properties.ADMIN);
        updateMarkers();
        const centroid = turf.centroid(polygon);
        const [lng, lat] = centroid.geometry.coordinates;
        world.pointOfView({ lat, lng, altitude: 1.5}, 2000);
        setTimeout(() => {
          activePolygon = null;
        }, 0);
      });

    const directionalLight = world.lights().find(light => light.type === 'DirectionalLight');
    directionalLight && directionalLight.position.set(1, 1, 1);

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.1;
    //world.controls().enableZoom = false;

    function updateMarkers() {
      console.log("updateMarkers called");
      const filteredVideos = videos.filter(video => {
        const point = turf.point([video.lng, video.lat]);
        return turf.booleanPointInPolygon(point, activePolygon);
      });

      if (activePolygon) {
        world.htmlElementsData(filteredVideos).htmlElement(video => {
          const marker = `
            <svg viewBox="-4 0 36 36" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <pattern id="image-bg-${video.id}" patternUnits="objectBoundingBox" width="100%" height="100%">
                  <image xlink:href="${video.thumbnail}" x="0" y="0" width="28" height="28" />
                </pattern>
              </defs>
              <path fill="white" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268 0 14,0 Z"></path>
              <circle fill="url(#image-bg-${video.id})" cx="14" cy="14" r="10"></circle>
            </svg>
          `;

          const el = document.createElement('div');
          el.innerHTML = marker;
          el.style.width = '50px';
          el.style.height = '50px';
          el.style['pointer-events'] = 'auto';
          el.style.cursor = 'pointer';
          el.onclick = () => console.info(video);
          el.style.transform = 'translate(-50%, -100%)';  // centers the SVG horizontally on the point and moves it up by its own height
          return el;
        });
      } else {
        // no active polygon, clear markers
        console.log("No active polygon. Clearing markers.");
        world.htmlElementsData([]);
      }
    }

    // Handle the globe click event
    globeVizRef.current.addEventListener('click', event => {
      setTimeout(() => {
        if (!activePolygon) {
          hideMarkers();
        }
      }, 0);
    });
    function hideMarkers() {
      console.log("Hiding markers.");
      world.htmlElementsData([]); // clear the data for HTML markers
    }
  }, [countries, videos]);
  return (
    <div>
      <div id="globeViz" ref={globeVizRef}></div>
      <div id="hoverLabel" style={{ display: 'none', position: 'fixed', bottom: '10px', left: '10px', color: 'white', background: 'rgba(0, 0, 0, 0.7)', padding: '5px', borderRadius: '5px' }}></div>
    </div>
  );
}

export default Earth;

