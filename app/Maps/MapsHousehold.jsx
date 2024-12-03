import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Alert, ActivityIndicator, SafeAreaView, Dimensions, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { router, useLocalSearchParams } from 'expo-router';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const screenHeight = Dimensions.get("window").height;

const decodePolyline = (encoded) => {
  const poly = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
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

const HouseholdRouteMap = () => {
  const params = useLocalSearchParams();
  const dispatch = JSON.parse(params.dispatch);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const routeFetched = useRef(false); // Ref to track route fetch status

  const parseRouteFromUrl = (url) => {
    if (!url) return { destination: null, waypoints: [] };

    const params = new URLSearchParams(url.split("?")[1]);
    const destination = params.get("destination")?.split(",").map(Number);
    const waypoints = params
      .get("waypoints")
      ?.split("|")
      .map((point) => point.split(",").map(Number))
      .map(([latitude, longitude]) => ({ latitude, longitude })) || [];

    return {
      destination: destination
        ? { latitude: destination[0], longitude: destination[1] }
        : null,
      waypoints,
    };
  };

  const { destination, waypoints } = parseRouteFromUrl(dispatch.route);

  const fetchCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Permission to access location was denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Unable to fetch your location.");
    }
  }, []);

  const fetchRoute = useCallback(async () => {
    if (!currentLocation || !destination || routeFetched.current) return;

    try {
      routeFetched.current = true; // Prevent subsequent calls
      const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
      const dest = `${destination.latitude},${destination.longitude}`;
      const waypointStr = waypoints
        .map((point) => `${point.latitude},${point.longitude}`)
        .join("|");

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&waypoints=${waypointStr}&mode=driving&key=${API_KEY}`;
      const { data } = await axios.get(url);
      console.log("Route data:", data);
      if (data.routes.length > 0) {
        const polyline = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(polyline);
        
      } else {
        Alert.alert("Error", "No route found.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      Alert.alert("Error", "Unable to fetch route.");
    } finally {
      setLoading(false);
    }
  }, [currentLocation, destination, waypoints]);

  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  useEffect(() => {
    if (currentLocation) {
      fetchRoute();
    }
  }, [currentLocation, fetchRoute]);

  const refreshRoute = () => {
    routeFetched.current = false; // Allow re-fetching
    setLoading(true);
    fetchRoute();
  };

  if (!dispatch || !dispatch.route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No route data available</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#46AA62" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshRoute} />}
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
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation
          >
            <Marker coordinate={destination} title="Destination" />
            {waypoints.map((point, index) => (
              <Marker key={index} coordinate={point} title={`Waypoint ${index + 1}`} />
            ))}
            {routeCoordinates.length > 0 && (
              <Polyline coordinates={routeCoordinates} strokeWidth={5} strokeColor="blue" />
            )}
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HouseholdRouteMap;
