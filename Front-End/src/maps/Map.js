
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input, 
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'

  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
// import { selectUser } from '../components/Features/features'
import { PassNav } from '../components/Passnav'
  const center = { lat: 11.0168, lng: 76.9558 }
  
  function Map() {
    // const user = useSelector(selectUser);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })
    
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    
    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()
    
    if (!isLoaded) {
      return <SkeletonText />
    }
    
    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }
    
    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
      
    }
    
    
    
    return (
      <>
      <PassNav/>
      <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
            >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
              )}
          </GoogleMap>
        </Box>
        <Box
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='1'
          >
          <HStack spacing={2} justifyContent='space-between'>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type='text' placeholder='Pickup Location' ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                  />
              </Autocomplete>
            </Box>
  
            <ButtonGroup>
              <Button colorScheme='blue' type='submit' onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearRoute}
                />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
              />
          </HStack>
        </Box>
      </Flex>
</>
    )
  }
  export default Map

// import { useRef, useEffect, useState } from 'react'
// import * as tt from '@tomtom-international/web-sdk-maps'
// import * as ttapi from '@tomtom-international/web-sdk-services'
// import '@tomtom-international/web-sdk-maps/dist/maps.css'
// import '../maps/Map.css'

// const Map = () => {
//     const mapElement = useRef()
//     const [map, setMap] = useState({})
//     const [longitude, setLongitude] = useState(-0.112869)
//     const [latitude, setLatitude] = useState(51.504)
  
//     const convertToPoints = (lngLat) => {
//         return {
//             point: {
//                 latitude: lngLat.lat,
//         longitude: lngLat.lng
//       }
//     }
//   }

//   const drawRoute = (geoJson, map) => {
//     if (map.getLayer('route')) {
//       map.removeLayer('route')
//       map.removeSource('route')
//     }
//     map.addLayer({
//       id: 'route',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: geoJson
//       },
//       paint: {
//         'line-color': '#4a90e2',
//         'line-width': 6
  
//       }
//     })
//   }

//   const addDeliveryMarker = (lngLat, map) => {
//     const element = document.createElement('div')
//     element.className = 'marker-delivery'
//     new tt.Marker({
//       element: element
//     })
//     .setLngLat(lngLat)
//     .addTo(map)
//   }

//   useEffect(() => {
//     const origin = {
//       lng: longitude,
//       lat: latitude,
//     }
//     const destinations = []


//     let map = tt.map({
//       key: process.env.REACT_APP_TOM_TOM_API_KEY,
//       container: mapElement.current,
//       stylesVisibility: {
//         trafficIncidents: true,
//         trafficFlow: true,
//       },
//       center: [longitude, latitude],
//       zoom: 14,
//     })
//     setMap(map)

//     const addMarker = () => {
//       const popupOffset = {
//         bottom: [0, -25]
//       }
//       const popup = new tt.Popup({ offset: popupOffset }).setHTML('This is you!')
//       const element = document.createElement('div')
//       element.className = 'marker'

//       const marker = new tt.Marker({
//         draggable: true,
//         element: element,
//       })
//         .setLngLat([longitude, latitude])
//         .addTo(map)
      
//       marker.on('dragend', () => {
//         const lngLat = marker.getLngLat()
//         setLongitude(lngLat.lng)
//         setLatitude(lngLat.lat)
//       })

//       marker.setPopup(popup).togglePopup()
      
//     }
//     addMarker()

//     const sortDestinations = (locations) => {
//       const pointsForDestinations = locations.map((destination) => {
//         return convertToPoints(destination)
//       })
//       const callParameters = {
//         key: process.env.REACT_APP_TOM_TOM_API_KEY,
//         destinations: pointsForDestinations,
//         origins: [convertToPoints(origin)],
//       }

//     return new Promise((resolve, reject) => {
//       ttapi.services
//         .matrixRouting(callParameters)
//         .then((matrixAPIResults) => {
//           const results = matrixAPIResults.matrix[0]
//           const resultsArray = results.map((result, index) => {
//             return {
//               location: locations[index],
//               drivingtime: result.response.routeSummary.travelTimeInSeconds,
//             }
//           })
//           resultsArray.sort((a, b) => {
//             return a.drivingtime - b.drivingtime
//           })
//           const sortedLocations = resultsArray.map((result) => {
//             return result.location
//           })
//           resolve(sortedLocations)
//         })
//       })
//     }

//     const recalculateRoutes = () => {
//       sortDestinations(destinations).then((sorted) => {
//         sorted.unshift(origin)

//         ttapi.services
//           .calculateRoute({
//             key: process.env.REACT_APP_TOM_TOM_API_KEY,
//             locations: sorted,
//           })
//           .then((routeData) => {
//             const geoJson = routeData.toGeoJson()
//             drawRoute(geoJson, map)
//         })
//       })
//     }


//     map.on('click', (e) => {
//       destinations.push(e.lngLat)
//       addDeliveryMarker(e.lngLat, map)
//       recalculateRoutes()
//     })

//     return () => map.remove()
//   }, [longitude, latitude])

//   return (
//     <>
//       {map && (
//         <div className="app">
//           <div ref={mapElement} className="map" />
//           <div className="search-bar">
//             <h1>Where to?</h1>
//             <input
//               type="text"
//               id="longitude"
//               className="longitude"
//               placeholder="Put in Longitude"
//               onChange={(e) => {
//                 setLongitude(e.target.value)
//               }}
//             />
//             <input
//               type="text"
//               id="latitude"
//               className="latitude"
//               placeholder="Put in latitude"
//               onChange={(e) => {
//                 setLatitude(e.target.value)
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Map


// import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/src/directions";

// // Mapbox Public Access Key
// mapboxgl.accessToken = 'pk.eyJ1IjoidmFzYW50aDI3IiwiYSI6ImNsa2Fudzk5NTAxNHUzcXBzdzY5cGZ3YTkifQ.VzJz80y4VCrlUnirNRUK_w';

// // Initializing Map
// var map = new mapboxgl.Map({
//     // Map Cotainer ID
//     container: 'map',
//     // Mapbox Style URL
//     style: 'mapbox://styles/vasanth27/clkao7blt003701qt0b9gh9wv',
//     zoom: 12.56, // Default Zoom
//     center: [121.037, 14.332] // Default centered coordinate
// });

// // Search Places
// var geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     marker: true,
// });
// // Direction Form
// var directions = new MapboxDirections({
//         accessToken: mapboxgl.accessToken
//     })
//     // Adding Search Places on Map
// map.addControl(geocoder, 'top-left')


// // Adding navigation control on Map
// map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
// // Map Loaded 
// map.on('load', function() {

//     // Search Places Result Event
//     geocoder.on('result', function(event) {
//         console.log(event.result);
//         new Promise(function(resolve) {
//             // Removing Previous Search Result Marker
//             $('.marker').remove()
//             resolve()
//         }).then(() => {
//             // Adding Marker to the place
//             new mapboxgl.Marker($('<div class="marker"><i class="fa fa-map-marker-alt"></i></div>')[0])
//                 .setLngLat(event.result.geometry.coordinates)
//                 .setPopup(
//                     new mapboxgl.Popup({ offset: 25 }) // add popups
//                     .setHTML(
//                         `<div>${event.result.place_name}</div><small class='text-muted'>${parseFloat(event.result.center[0]).toLocaleString('en-US')}, ${parseFloat(event.result.center[1]).toLocaleString('en-US')}</small>`
//                     )
//                 )
//                 .addTo(map)
//         }).then(() => {
//             $('.marker').click()
//         })

//     });
//     geocoder.container.setAttribute('id', 'geocoder-search')
// });


// // Map Render Event Listener
// map.on('render', () => {
//     // Do Something here
// });

// function direction_reset() {
//     directions.actions.clearOrigin()
//     directions.actions.clearDestination()
//     directions.container.querySelector('input').value = ''
// }
// $(function() {
//     $('#get-direction').click(function() {
//         // Adding Direction form and instructions on map
//         map.addControl(directions, 'top-left');
//         directions.container.setAttribute('id', 'direction-container')
//         $(geocoder.container).hide()
//         $(this).hide()
//         $('#end-direction').removeClass('d-none')
//         $('.marker').remove()

//     })
//     $('#end-direction').click(function() {
//         direction_reset()
//         $(this).addClass('d-none')
//         $('#get-direction').show()
//         $(geocoder.container).show()
//         map.removeControl(directions)
//     })

// })


