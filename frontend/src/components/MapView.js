import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [roads, setRoads] = useState([]);
  
  useEffect(() => {
    const fetchRoads = async () => {
      const roadCollection = await getDocs(collection(db, 'roads'));
      setRoads(roadCollection.docs.map(doc => doc.data()));
    };
    fetchRoads();
  }, []);
  
  return (
    <MapContainer center={[12.2958, 76.6394]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {roads.map((road, idx) => (
        <Polyline key={idx} positions={road.path} color={road.type === "oneway" ? "red" : "green"}>
          <Popup>{road.name} ({road.type})</Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
};

export default MapView;
