import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Weather from "./Weather.jsx";

function Map({ position }) {
  const [pos, setPos] = useState(position || [0, 0]);
  useEffect(() => {
    setPos(position);
  }, []);

  useEffect(() => {
    const map = L.map("map").setView(pos, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(pos);
    marker.addTo(map);

    map.on("click", function (e) {
      const newPos = [e.latlng.lat, e.latlng.lng];
      setPos(newPos);
    });
    return () => map.remove();
  }, [pos]);

  return (
    <div>
      <div id="titulo">
        <h1>Maid Weather!!! メイド天気</h1>
      </div>
      <div
        id="map"
        style={{ height: "66vh", width: "75vw", borderRadius: 16 }}
      />
      <Weather position={pos} />
    </div>
  );
}

export default Map;
