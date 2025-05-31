export interface Route {
  duration: string;
  distanceMeters: number;
  polyline: {
    encodedPolyline: string;
  };
  legs: [
    {
      steps: {
        navigationInstruction: {
          instructions: string;
        };
      }[];
    },
  ];
}

export interface RouteStep {
  navigationInstruction: {
    instructions: string;
  };
}

export interface RouteInstructionsProps {
  steps: RouteStep[];
}

export interface RoutesBody {
  origin: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  destination: {
    location: {
      latLng: {
        latitude: number;
        longitude: number;
      };
    };
  };
  travelMode: string;
}
