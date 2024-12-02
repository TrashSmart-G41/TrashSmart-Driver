import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Header from '../../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BACKEND_URL from '../../constants/config';
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key

const decodePolyline = (encoded) => {
  const poly = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return poly;
};

const simulateTravelBetweenWaypoints = (waypoints, setTravelingPoint) => {
  let currentIndex = 0;

  const travelInterval = setInterval(() => {
    if (currentIndex >= waypoints.length) {
      clearInterval(travelInterval);
      Alert.alert('Dispatch Completed', 'You have reached your final destination!');
      return;
    }

    const nextPoint = waypoints[currentIndex++];
    setTravelingPoint(nextPoint);
  }, 1000); // 1 second per waypoint
};


const CollectionMap = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [travelingPoint, setTravelingPoint] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [simulationCompleted, setSimulationCompleted] = useState(false); // Track simulation status

  const mapRef = useRef(null);
  const { dispatch } = useLocalSearchParams();
  const parsedDispatch = JSON.parse(dispatch);

  const sampleLocations = useMemo(() => {
    return parsedDispatch.wasteCollectionRequestList.map((location) => ({
      title: `Request ID: ${location.id}`,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  }, [parsedDispatch]);

  const startLocationUpdates = useCallback(async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Denied', 'Location permissions are required for simulation.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setInitialLocation(location.coords); // Set only once as the starting point
  }, []);

  const getDirections = useCallback(async () => {
    if (simulationCompleted || !initialLocation || sampleLocations.length === 0) return; // Stop if simulation is completed

    if (!API_KEY) {
      Alert.alert('Error', 'Google Maps API Key is missing.');
      return;
    }

    const origin = `${initialLocation.latitude},${initialLocation.longitude}`;
    const destination = `${sampleLocations[sampleLocations.length - 1].latitude},${sampleLocations[sampleLocations.length - 1].longitude}`;
    const waypoints = sampleLocations
      .slice(0, sampleLocations.length - 1)
      .map((loc) => `${loc.latitude},${loc.longitude}`)
      .join('|');

    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${API_KEY}`
      );

      if (data.routes.length > 0) {
        const steps = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(steps);
        setTravelingPoint(steps[0]); // Start traveling from the first point
      } else {
        Alert.alert('No Route Found');
      }
    } catch (error) {
      console.error('Error fetching directions:', error.response?.data || error.message);
    }
  }, [initialLocation, sampleLocations, simulationCompleted]);
  const completeDispatch = async (dispatchId) => {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('Completing dispatch:', dispatchId);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/organization_dispatch/finish_dispatch/${dispatchId}`,
        {}, // Provide an empty object as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Dispatch Completed', 'The dispatch has been marked as completed successfully.');
    } catch (error) {
      console.error('Error completing dispatch:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to complete the dispatch.');
    }
  };
  

  const simulateTravelBetweenWaypoints = (waypoints, setTravelingPoint, dispatchId) => {
    let currentIndex = 0;
  
    const travelInterval = setInterval(() => {
      if (currentIndex >= waypoints.length) {
        clearInterval(travelInterval);
        Alert.alert(
          'Dispatch Completed',
          'You have reached your final destination. Do you want to complete this dispatch?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => completeDispatch(dispatchId),
            },
          ]
        );
        return;
      }
  
      const nextPoint = waypoints[currentIndex++];
      setTravelingPoint(nextPoint);
    }, 1000); // 1 second per waypoint
  };

  useEffect(() => {
    startLocationUpdates();
  }, [startLocationUpdates]);

  useEffect(() => {
    if (initialLocation) {
      getDirections();
    }
  }, [initialLocation, getDirections]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: initialLocation?.latitude || sampleLocations[0]?.latitude,
            longitude: initialLocation?.longitude || sampleLocations[0]?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Render Waypoint Markers */}
          {sampleLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={location.title}
            />
          ))}

          {/* Traveling Point Marker */}
          {travelingPoint && (
            <Marker
              coordinate={travelingPoint}
              pinColor="green" // Traveling point color
              title="Traveling Point"
            />
          )}

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
          )}

          {/* Starting Position */}
          {initialLocation && (
            <Marker
              coordinate={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
              }}
              pinColor="red" // Start point color
              title="Starting Point"
            />
          )}
        </MapView>

        {/* Start Travel Simulation Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            padding: 15,
            backgroundColor: '#46AA62',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() =>
            simulateTravelBetweenWaypoints(sampleLocations, setTravelingPoint, parsedDispatch.id)
          }
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Start Travel Simulation
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CollectionMap;
