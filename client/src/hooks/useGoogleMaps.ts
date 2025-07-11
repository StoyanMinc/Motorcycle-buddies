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
                    <div style="max-width: 160px;">
                    <img src="${trip.motorcycleId.image}" alt="Motorcycle" style="width: 100%; border-radius: 8px; margin-bottom: 8px;" />
                    <p>
                        Riding: <strong>${trip.motorcycleId.manufacturer} ${trip.motorcycleId.model}</strong><br>
                        <strong>${trip.tripTitle}</strong><br>
                        At: <strong>${trip.address}</strong><br>
                        With: <strong>${friends}</strong><br>
                        On: <strong>${date}</strong>
                    </p>
                    </div>
                `
            });

            marker.addListener("mouseover", () => infoWindow.open(map, marker));
            marker.addListener("mouseout", () => infoWindow.close());

            markers.push(marker);
        });

        return () => markers.forEach((marker) => marker.setMap(null));
    }, [mapRef.current, trips]);
};

export const useInteractiveMap = (
    mapId: string,
    center: google.maps.LatLngLiteral,
    zoom: number
) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const [coords, setCoords] = useState(`${center.lat},${center.lng}`);

    useEffect(() => {
        const initMap = () => {
            if (!window.google?.maps) return;

            const mapEl = document.getElementById(mapId) as HTMLElement;
            if (!mapEl) return;
            const map = new window.google.maps.Map(mapEl, {
                center,
                zoom,
            });
            mapRef.current = map;
            const marker = new window.google.maps.Marker({
                position: center,
                map,
                draggable: false,
            });
            markerRef.current = marker;
            map.addListener("click", (e: google.maps.MapMouseEvent) => {
                const lat = e.latLng?.lat();
                const lng = e.latLng?.lng();
                if (lat && lng) {
                    const position = { lat, lng };
                    marker.setPosition(position);
                    setCoords(`${lat},${lng}`);
                }
            });

            geocoderRef.current = new window.google.maps.Geocoder();
        };
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
                (window as any).initMap = initMap;
            } else {
                existingScript.addEventListener("load", initMap);
            }
        }
    }, [mapId, center.lat, center.lng, zoom]);
    const geocodeAddress = (address: string) => {
        if (!geocoderRef.current || !address) return;

        geocoderRef.current.geocode({ address }, (results, status) => {
            if (status === "OK" && results?.[0]) {
                const loc = results[0].geometry.location;
                const pos = { lat: loc.lat(), lng: loc.lng() };

                mapRef.current?.setCenter(pos);
                markerRef.current?.setPosition(pos);
                setCoords(`${pos.lat},${pos.lng}`);
            }
        });
    };
    return { coords, geocodeAddress };
};

