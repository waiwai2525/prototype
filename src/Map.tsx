import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import Coordinate from "./@types/Coordinate";
import "leaflet/dist/leaflet.css";
import Leaflet from "./Leaflet";

function Map() {
  const [coordinate, setCoordinate] = useState<Coordinate>({
    latitude: 35,
    longitude: 135,
  });

  useEffect(() => {
    let unlisten: UnlistenFn;
    async function f() {
      unlisten = await listen<Coordinate>("update-coordinate", (event) => {
        setCoordinate(event.payload);
      });
    }
    f();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return <Leaflet coordinate={coordinate} />;
}

export default Map;
