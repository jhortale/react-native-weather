import { useState, useEffect } from "react";

export default function useGeoLocation(lat, lon) {
  const [latLon, setLatLon] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLon([position.coords.latitude, position.coords.longitude]);
      },
      (err) => {
        console.log(err);
        // setError({
        //   error: "Error Gettig Weather Condtions",
        // });
      }
    );
  }, []);

  return latLon;
}
