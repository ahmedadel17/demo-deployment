"use client";
import { useEffect, useRef, useState } from "react";

interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
}

interface MarkerOptions {
  position: { lat: number; lng: number };
  map: unknown;
  draggable: boolean;
}

interface AutocompleteOptions {
  fields: string[];
}

interface GoogleMapsAPI {
  maps: {
    Map: new (element: HTMLElement, options: MapOptions) => unknown;
    Marker: new (options: MarkerOptions) => unknown;
    places: {
      Autocomplete: new (input: HTMLInputElement, options: AutocompleteOptions) => unknown;
    };
  };
}

declare global {
  interface Window {
    google: GoogleMapsAPI;
    initMap: () => void;
  }
}

interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number, address?: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function MapComponent({ onLocationSelect, searchInputRef }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const fallbackInputRef = useRef<HTMLInputElement>(null);
  const inputRef = searchInputRef || fallbackInputRef;
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 30.0444,
    lng: 31.2357,
  });

  useEffect(() => {
    if (window.google) {
      initMap(); // if script already loaded
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    const google = window.google;
    if (!google || !mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: position,
      zoom: 10,
    }) as any;
    setMap(mapInstance);

    const markerInstance = new google.maps.Marker({
      position,
      map: mapInstance,
      draggable: true, // allow manual drag
    }) as { setPosition: (pos: { lat: number; lng: number }) => void; addListener: (event: string, callback: (e: any) => void) => void };
    setMarker(markerInstance);

    // Move marker on map click
    mapInstance.addListener("click", (e: { latLng: { lat: () => number; lng: () => number } }) => {
      if (!e.latLng || typeof e.latLng.lat !== 'function' || typeof e.latLng.lng !== 'function') {
        console.error("Invalid latLng object:", e.latLng);
        return;
      }
      
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      markerInstance.setPosition(newPos);
      mapInstance.panTo(newPos);
      setPosition(newPos);
      // console.log("Map clicked:", newPos);
      
      // Call the callback with the new position
      onLocationSelect?.(newPos.lat, newPos.lng);
    });

    // Update position when marker dragged
    markerInstance.addListener("dragend", (e: { latLng: { lat: () => number; lng: () => number } }) => {
      if (!e.latLng || typeof e.latLng.lat !== 'function' || typeof e.latLng.lng !== 'function') {
        console.error("Invalid latLng object:", e.latLng);
        return;
      }
      
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setPosition(newPos);
      // console.log("Marker dragged to:", newPos);
      
      // Call the callback with the new position
      onLocationSelect?.(newPos.lat, newPos.lng);
    });

    // Setup autocomplete
    if (!inputRef.current) return;
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "formatted_address"],
    }) as any;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      const newPos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      markerInstance.setPosition(newPos);
      mapInstance.panTo(newPos);
      mapInstance.setZoom(15);
      setPosition(newPos);
      // console.log("Search selected:", newPos);
      
      // Call the callback with the new position and address
      onLocationSelect?.(newPos.lat, newPos.lng, place.formatted_address);
    });
  };

  return (
    <div className="flex flex-col items-center  ">
      <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow" />
      <div className="text-sm text-gray-700 mt-2">
        📍 Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
      </div>
    </div>
  );
}
