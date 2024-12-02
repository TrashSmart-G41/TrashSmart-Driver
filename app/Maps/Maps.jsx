import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Alert,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SafeArea from '../../components/SafeArea';
import Header from '../../components/Header';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const screenHeight = Dimensions.get('window').height;

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

const CollectionMap = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      await Location.requestForegroundPermissionsAsync();
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setCurrentLocation(location?.coords);
  }, []);

  const getDirections = useCallback(async (current) => {
    if (!current) return;

    if (!API_KEY) {
      Alert.alert('Error', 'Google Maps API Key is missing.');
      return;
    }

    const origin = `${current.latitude},${current.longitude}`;
    const waypointStr = sampleLocations.map((loc) => `${loc.latitude},${loc.longitude}`).join('|');
    const destination = `${sampleLocations[sampleLocations.length - 1].latitude},${sampleLocations[sampleLocations.length - 1].longitude}`;

    try {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=optimize:true|${waypointStr}&key=${API_KEY}`
      );
      if (data.routes.length > 0) {
        const steps = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(steps);
      } else {
        Alert.alert('No Routes Found');
      }
    } catch (error) {
      console.error('Directions API Error:', error);
    }
  }, [sampleLocations]);

  useEffect(() => {
    startLocationUpdates().then(() => {
      if (currentLocation) getDirections(currentLocation);
    });
  }, [startLocationUpdates, currentLocation, getDirections]);

  return (
    <SafeAreaView>
      <Header/>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={startLocationUpdates} />}
      >
        <TouchableOpacity
          className="absolute top-10 left-7 bg-black p-3 rounded-full z-10"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="mt-0 h-screen">
        <MapView
  ref={mapRef}
  provider={PROVIDER_GOOGLE}
  style={{ flex: 1 }}
  initialRegion={{
    latitude: currentLocation?.latitude || sampleLocations[0]?.latitude,
    longitude: currentLocation?.longitude || sampleLocations[0]?.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }}
  showsUserLocation
>
  {/* Render Markers */}
  {(waypoints.length > 0 ? waypoints : sampleLocations).map((waypoint, index) => (
    <Marker key={index} coordinate={waypoint} />
  ))}

  {/* Render Polyline */}
  {routeCoordinates.length > 0 && (
    <Polyline coordinates={routeCoordinates} strokeWidth={5} strokeColor="blue" />
  )}
</MapView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionMap;
