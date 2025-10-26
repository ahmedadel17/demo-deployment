// "use client";

// import { useEffect, useRef, useState } from "react";

// declare global {
//   interface Window {
//     google: any;
//     initMap: () => void;
//   }
// }

// interface AddressForm {
//   address: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   lat: string;
//   lng: string;
// }

// export default function AddressEdit() {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const markerRef = useRef<any>(null);
//   const geocoderRef = useRef<any>(null);
//   const [map, setMap] = useState<any>(null);
//   const [form, setForm] = useState<AddressForm>({
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     lat: "",
//     lng: "",
//   });

//   // Load Google Maps script
//   useEffect(() => {
//     const existingScript = document.querySelector(
//       `script[src*="maps.googleapis.com/maps/api/js"]`
//     );
//     if (existingScript) {
//       window.initMap = initMap;
//       return;
//     }

//     const script = document.createElement("script");
//     script.src =
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk&libraries=places&callback=initMap";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//     window.initMap = initMap;

//     return () => {
//       script.remove();
//     };
//   }, []);

//   // Initialize map
//   const initMap = () => {
//     const defaultCenter = { lat: 34.052235, lng: -118.243683 };

//     const mapInstance = new window.google.maps.Map(mapRef.current, {
//       center: defaultCenter,
//       zoom: 12,
//     });

//     const geocoder = new window.google.maps.Geocoder();
//     const marker = new window.google.maps.Marker({
//       map: mapInstance,
//       position: defaultCenter,
//       draggable: true,
//     });

//     geocoderRef.current = geocoder;
//     markerRef.current = marker;
//     setMap(mapInstance);
//     updateLatLngInputs(defaultCenter);

//     mapInstance.addListener("click", (e: any) => {
//       geocodeLatLng(e.latLng);
//       updateLatLngInputs(e.latLng);
//     });

//     marker.addListener("dragend", () => {
//       geocodeLatLng(marker.getPosition());
//       updateLatLngInputs(marker.getPosition());
//     });
//   };

//   const geocodeLatLng = (latLng: any) => {
//     const geocoder = geocoderRef.current;
//     geocoder.geocode({ location: latLng }, (results: any, status: string) => {
//       if (status === "OK") {
//         if (results[0]) {
//           map.setZoom(16);
//           markerRef.current.setPosition(latLng);
//           fillFormWithAddress(results[0].address_components);
//         } else {
//           alert("No results found");
//         }
//       } else {
//         alert("Geocoder failed due to: " + status);
//       }
//     });
//   };

//   const updateLatLngInputs = (latLng: any) => {
//     if (!latLng || typeof latLng.lat !== 'function' || typeof latLng.lng !== 'function') {
//       console.error("Invalid latLng object:", latLng);
//       return;
//     }
    
//     setForm((prev) => ({
//       ...prev,
//       lat: latLng.lat(),
//       lng: latLng.lng(),
//     }));
//   };

//   const fillFormWithAddress = (components: any[]) => {
//     let streetNumber = "";
//     let route = "";
//     let city = "";
//     let state = "";
//     let postalCode = "";

//     for (const component of components) {
//       const type = component.types[0];
//       switch (type) {
//         case "street_number":
//           streetNumber = component.long_name;
//           break;
//         case "route":
//           route = component.long_name;
//           break;
//         case "locality":
//           city = component.long_name;
//           break;
//         case "administrative_area_level_1":
//           state = component.short_name;
//           break;
//         case "postal_code":
//           postalCode = component.long_name;
//           break;
//       }
//     }

//     setForm((prev) => ({
//       ...prev,
//       address: `${streetNumber} ${route}`.trim(),
//       city,
//       state,
//       postalCode,
//     }));
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Address saved:", form);
//     alert("Address saved successfully!");
//   };

//   return (
//   <>
//   {/* Main Content */}
//   <div className="lg:col-span-3 space-y-8">
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-600">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Add New Address via Map
//             </h1>
//           </div>

//           <div className="p-6">
//             <div
//               ref={mapRef}
//               className="h-96 w-full rounded-lg mb-6 border border-gray-300"
//             ></div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   Address Line 1
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={form.address}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="city"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   value={form.city}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="state"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   State/Province
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="postalCode"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   Postal Code
//                 </label>
//                 <input
//                   type="text"
//                   id="postalCode"
//                   name="postalCode"
//                   value={form.postalCode}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="lat"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   Latitude
//                 </label>
//                 <input
//                   type="text"
//                   id="lat"
//                   name="lat"
//                   value={form.lat}
//                   readOnly
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="lng"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                 >
//                   Longitude
//                 </label>
//                 <input
//                   type="text"
//                   id="lng"
//                   name="lng"
//                   value={form.lng}
//                   readOnly
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="te-btn te-btn-primary bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
//               >
//                 Save Address
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//   </>
//   );
// }
