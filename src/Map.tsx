import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

type Coordinate = {
  latitude: number;
  longitude: number;
};

function Map() {
  const [coordinate, setCoordinate] = useState<Coordinate>({
    latitude: 0.0,
    longitude: 0.0,
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

  return (
    <div className="Map">
      <p>{coordinate.latitude}</p>
      <p>{coordinate.longitude}</p>
    </div>
  );
}

export default Map;
