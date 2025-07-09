import { useEffect, useRef, useState } from "react";
import type { Trip } from "../../types/trips";
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_KEY;


export const useGoogleMaps =
    (
        mapId: string,
        center: google.maps.LatLngLiteral,
        zoom: number,
        onMapReady?: (map: google.maps.Map) => void
    ) => {
        const mapRef = useRef<google.maps.Map | null>(null);
        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            const initMap = () => {
                if (!window.google?.maps) return;
                const mapEl = document.getElementById(mapId) as HTMLElement;
                if (!mapEl || !window.google?.maps) return;
                mapRef.current = new window.google.maps.Map(mapEl, {
                    center,
                    zoom,
                });
                setIsReady(true);
            };
            if (mapRef.current && onMapReady) {
                onMapReady(mapRef.current);
            }

            if (window.google && window.google.maps) {
                initMap();
            } else {
                const existingScript = document.getElementById("googleMapsScript") as HTMLScriptElement;

                if (!existingScript) {
                    const script = document.createElement("script");
                    script.id = "googleMapsScript";
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
                    script.async = true;
                    script.defer = true;
                    document.body.appendChild(script);

                    window.initMap = initMap;
                } else {
                    existingScript.addEventListener("load", initMap);
                }
            }
        }, [mapId, center, zoom]);

        return { mapRef, isReady };
    }

export const useMarkers = (mapRef: React.RefObject<google.maps.Map | null>, trips: Trip[]) => {
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !trips.length) return;

        const markers: google.maps.Marker[] = [];

        trips.forEach((trip) => {
            if (!trip.gps) return;

            const [lat, lng] = trip.gps.split(",");
            const position = { lat: Number(lat), lng: Number(lng) };

            const icon = {
                url: "motorcycleIcon.png",
                scaledSize: new window.google.maps.Size(50, 50),
                anchor: new window.google.maps.Point(16, 32),
            };
            const friends = trip.friends.join(', ');
            const date = trip.date.split('T')[0];

            const marker = new window.google.maps.Marker({
                position,
                map,
                title: trip.tripTitle || "Trip",
                icon,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: `
        <strong>${trip.tripTitle}</strong><br>
        riding: <strong>${trip.motorcycleId.manufacturer} ${trip.motorcycleId.model}</strong><br>
        with: <strong>${friends}</strong><br>
        on: <strong>${date}</strong>

        `,
            });

            marker.addListener("mouseover", () => infoWindow.open(map, marker));
            marker.addListener("mouseout", () => infoWindow.close());

            markers.push(marker);
        });

        return () => markers.forEach((marker) => marker.setMap(null));
    }, [mapRef.current, trips]);
};

