import React from "react";
import dynamic from "next/dynamic";

export default function Home() {
  console.log(process.env.MAPBOX_TOKEN, 'home')
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <main>
      <div id="map" className="w-screen h-screen">
        <MapWithNoSSR />
      </div>
    </main>
  );
}