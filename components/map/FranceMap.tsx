"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  value: number;
  subtitle?: string;
}

export function FranceMap({
  points,
  height = 520,
}: {
  points: MapPoint[];
  height?: number;
}) {
  return (
    <MapContainer
      center={[46.6, 2.4]}
      zoom={6}
      scrollWheelZoom
      style={{ height, width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lng]}
          radius={Math.max(8, Math.min(32, 7 + p.value * 2))}
          pathOptions={{
            color: "#047857",
            fillColor: "#047857",
            fillOpacity: 0.65,
            weight: 1.5,
          }}
        >
          <Tooltip direction="top" offset={[0, -6]}>
            {p.label} — {p.value} lead{p.value > 1 ? "s" : ""}
          </Tooltip>
          <Popup>
            <strong>{p.label}</strong>
            <br />
            {p.subtitle}
            <br />
            {p.value} lead{p.value > 1 ? "s" : ""} généré{p.value > 1 ? "s" : ""}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
