
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Navigation, Clock, Route, Car, MapPin } from 'lucide-react';

interface MapDirectionsProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  destinationName: string;
  onBack: () => void;
}

interface DirectionsStep {
  distance: string;
  duration: string;
  instructions: string;
  maneuver?: string;
}

interface DirectionsLeg {
  distance: string;
  duration: string;
  steps: DirectionsStep[];
}

export function MapDirections({ origin, destination, destinationName, onBack }: MapDirectionsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const directionsPanelRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    // Initialize map
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: origin,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Initialize directions service and renderer
    const directionsServiceInstance = new google.maps.DirectionsService();
    const directionsRendererInstance = new google.maps.DirectionsRenderer({
      map: mapInstance,
      panel: directionsPanelRef.current,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeWeight: 5
      }
    });

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Calculate route
    calculateRoute(directionsServiceInstance, directionsRendererInstance);
  }, [origin, destination]);

  const calculateRoute = (
    service: google.maps.DirectionsService,
    renderer: google.maps.DirectionsRenderer
  ) => {
    setIsLoading(true);
    setError(null);

    service.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        optimizeWaypoints: false,
        avoidHighways: false,
        avoidTolls: false
      },
      (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
        setIsLoading(false);

        if (status === google.maps.DirectionsStatus.OK && result) {
          renderer.setDirections(result);
          setDirections(result);

          // Fit map to show entire route
          const bounds = new google.maps.LatLngBounds();
          result.routes[selectedRouteIndex].overview_path.forEach((point: google.maps.LatLng) => {
            bounds.extend(point);
          });
          map?.fitBounds(bounds);

          // Add some padding
          const listener = google.maps.event.addListener(map, 'idle', () => {
            if (map.getZoom() && map.getZoom()! > 16) {
              map.setZoom(16);
            }
            google.maps.event.removeListener(listener);
          });
        } else {
          setError(`Failed to calculate directions: ${status}`);
        }
      }
    );
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const formatDistance = (meters: number): string => {
    const km = meters / 1000;
    return km < 1 ? `${Math.round(meters)} m` : `${km.toFixed(1)} km`;
  };

  const getManeuverIcon = (maneuver?: string) => {
    switch (maneuver) {
      case 'turn-left':
        return '↰';
      case 'turn-right':
        return '↱';
      case 'turn-slight-left':
        return '↖';
      case 'turn-slight-right':
        return '↗';
      case 'straight':
        return '↑';
      default:
        return '•';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Navigation Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{error}</p>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Directions to {destinationName}</h1>
              {directions && (
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(directions.routes[selectedRouteIndex].legs[0].duration?.value || 0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Route className="w-4 h-4" />
                    {formatDistance(directions.routes[selectedRouteIndex].legs[0].distance?.value || 0)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Car className="w-3 h-3 mr-1" />
              Driving
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Directions Panel */}
        <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Starting point</p>
                <p className="text-sm font-medium">Your location</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Calculating route...</p>
            </div>
          ) : directions ? (
            <div ref={directionsPanelRef} className="directions-panel">
              {/* Custom directions display */}
              <div className="p-4 space-y-4">
                {directions.routes[selectedRouteIndex].legs[0].steps.map((step: google.maps.DirectionsStep, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-700 mt-0.5">
                      {getManeuverIcon(step.maneuver)}
                    </div>
                    <div className="flex-1">
                      <div
                        className="text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                      />
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Route className="w-3 h-3" />
                        {formatDistance(step.distance?.value || 0)}
                        <Clock className="w-3 h-3 ml-2" />
                        {formatDuration(step.duration?.value || 0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600">No directions available</p>
            </div>
          )}

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="text-sm font-medium">{destinationName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef} className="flex-1 relative w-full h-full" />
      </div>
    </div>
  );
}
