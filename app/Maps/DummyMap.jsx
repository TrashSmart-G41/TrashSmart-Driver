import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;// Replace with your API key

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
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loadingRoute, setLoadingRoute] = useState(false);

  const sampleLocations = useMemo(() => [
    { title: 'Independence Square', latitude: 6.9020, longitude: 79.8652 },
    { title: 'Viharamahadevi Park', latitude: 6.9110, longitude: 79.8638 },
  ], []);

  const startLocationUpdates = useCallback(async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      await Location.requestForegroundPermissionsAsync();
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setCurrentLocation(location?.coords);
  }, []);

  const fetchRoute = useCallback(async () => {
    if (!currentLocation || sampleLocations.length === 0) return;

    setLoadingRoute(true);

    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
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
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      } else {
        Alert.alert('No Route Found', 'Unable to fetch route.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Failed to fetch route.');
    } finally {
      setLoadingRoute(false);
    }
  }, [currentLocation, sampleLocations]);

  const simulateTravel = useCallback(() => {
    if (routeCoordinates.length === 0) return;

    let currentIndex = 0;
    const travelInterval = setInterval(() => {
      if (currentIndex >= routeCoordinates.length - 1) {
        clearInterval(travelInterval);
        Alert.alert('Dispatch Completed', 'You have reached your final destination!');
        return;
      }

      setCurrentLocation(routeCoordinates[++currentIndex]);
    }, 1000); // 1 second per step
  }, [routeCoordinates]);

  useEffect(() => {
    startLocationUpdates();
  }, [startLocationUpdates]);

  useEffect(() => {
    if (currentLocation) {
      fetchRoute();
    }
  }, [currentLocation, fetchRoute]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation?.latitude || sampleLocations[0]?.latitude,
            longitude: currentLocation?.longitude || sampleLocations[0]?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          region={
            currentLocation && {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
          }
          showsUserLocation
        >
          {sampleLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={location.title}
            />
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              pinColor="blue"
              title="My Current Location"
            />
          )}
        </MapView>
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
          onPress={simulateTravel}
          disabled={loadingRoute}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {loadingRoute ? 'Loading Route...' : 'Start Travel Simulation'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CollectionMap;
