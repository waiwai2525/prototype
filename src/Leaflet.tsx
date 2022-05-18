import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import Coordinate from "./@types/Coordinate";
import "leaflet/dist/leaflet.css";

type Props = {
  coordinate: Coordinate;
};

function Leaflet(props: Props) {
  const [position, setPosition] = useState<LatLng>(
    new LatLng(props.coordinate.latitude, props.coordinate.longitude)
  );
  const [positions, setPositions] = useState<LatLng[]>([]);

  useEffect(() => {
    const newPosition = new LatLng(
      props.coordinate.latitude,
      props.coordinate.longitude
    );
    setPosition(newPosition);
    setPositions([...positions, newPosition]);
  }, [props]);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <Polyline pathOptions={{ color: "magenta" }} positions={positions} />
    </MapContainer>
  );
}

export default Leaflet;
