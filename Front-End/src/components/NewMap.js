import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '../components/PassNav.css'; 
import {useSelector} from 'react-redux'
import { selectUser, selectToken , selectEmails } from "./Features/features.js";
import UserService from '../Service/UserService';
import { PassNav } from './Passnav';
mapboxgl.accessToken = 'pk.eyJ1IjoidmFzYW50aDI3IiwiYSI6ImNsa2Fudzk5NTAxNHUzcXBzdzY5cGZ3YTkifQ.VzJz80y4VCrlUnirNRUK_w';

export default function NewMap() {

    
  const mapContainer = useRef(null);
  const token = useSelector(selectToken);
  const emails = useSelector(selectEmails);

  const map = useRef(null);
  const [lng, setLng] = useState(76.9958);
  const [lat, setLat] = useState(11.0168);
  const [zoom, setZoom] = useState(9);

  useEffect(() =>{
    getData();
  } , [])

  const getData = async() =>{
    // console.log(user);
    console.log(emails);
    try{
      const response = await UserService.getUserByEmail(emails ,token);
      console.log(response.data)
    }
    catch(Eroor){
      console.log(Eroor);
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div>
      <PassNav/>
      <div ref={mapContainer} className="map-container" > </div> 
    </div>
  );
}



