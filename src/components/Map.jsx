import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function Map({ position }) {
  useEffect(() => {
    const map = L.map("map").setView(position, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => map.remove();
  }, []);
  return (
    <div>
      <div id="titulo">
        <h1>Maid Weather!!! メイド天気</h1>
      </div>
      <div
        id="map"
        style={{ height: "66vh", width: "75vw", borderRadius: 16 }}
      />
    </div>
  );
}

export default Map;
