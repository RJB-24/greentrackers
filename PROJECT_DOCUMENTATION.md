
# Blockchain-Based Logistics Tracker - Documentation

## Project Overview

This application is a blockchain-based logistics tracking platform that enables real-time tracking of shipments, provides blockchain transparency, and offers sustainability recommendations. It serves as a central hub for logistics managers, warehouse staff, and other stakeholders.

## Technology Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Blockchain**: Web3.js for Ethereum blockchain integration
- **State Management**: Tanstack React Query
- **Animation**: Framer Motion

## Project Structure

```
src/
├── components/        # UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── home/          # Home page components
│   ├── layout/        # Layout components (Navbar, Footer)
│   └── ui/            # Reusable UI components from shadcn/ui
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── services/          # Service layer (Firebase, Blockchain)
└── main.tsx           # Entry point
```

## Getting Started

### Prerequisites

1. Node.js (v16 or higher)
2. npm, yarn, or pnpm
3. Git
4. MetaMask or other Web3 wallet (for blockchain interaction)
5. Firebase account
6. Ethereum node access (Infura, Alchemy, or your own node)

### Local Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd blockchain-logistics-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # Blockchain Configuration
   VITE_INFURA_API_KEY=your_infura_api_key
   VITE_CONTRACT_ADDRESS=your_contract_address
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:5173` to view the application.

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage services
3. Create a web app in your Firebase project
4. Copy the Firebase configuration to your `.env` file
5. Set up Firebase Authentication methods (Email/Password, Google, etc.)
6. Create Firestore database collections:
   - `shipments`: For storing shipment data
   - `users`: For user profiles
   - `trackingEvents`: For shipment tracking events

## Blockchain Integration

### Smart Contract Deployment

1. Install Truffle or Hardhat for smart contract development:
   ```bash
   npm install -g truffle
   # or
   npm install -g hardhat
   ```

2. Create a new smart contract project:
   ```bash
   mkdir smart-contracts
   cd smart-contracts
   truffle init
   # or
   npx hardhat init
   ```

3. Create a LogisticsTracker smart contract:
   ```solidity
   // contracts/LogisticsTracker.sol
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;
   
   contract LogisticsTracker {
       struct Shipment {
           string origin;
           string destination;
           uint256 timestamp;
           string status;
           bool isActive;
       }
       
       mapping(string => Shipment) private shipments;
       string[] private shipmentIds;
       
       event ShipmentAdded(string shipmentId, string origin, string destination, string status);
       event ShipmentStatusUpdated(string shipmentId, string status);
       
       function addShipment(
           string memory _shipmentId,
           string memory _origin,
           string memory _destination,
           string memory _status
       ) public {
           require(shipments[_shipmentId].isActive == false, "Shipment ID already exists");
           
           shipments[_shipmentId] = Shipment({
               origin: _origin,
               destination: _destination,
               timestamp: block.timestamp,
               status: _status,
               isActive: true
           });
           
           shipmentIds.push(_shipmentId);
           
           emit ShipmentAdded(_shipmentId, _origin, _destination, _status);
       }
       
       function updateShipmentStatus(string memory _shipmentId, string memory _status) public {
           require(shipments[_shipmentId].isActive == true, "Shipment ID does not exist");
           
           shipments[_shipmentId].status = _status;
           
           emit ShipmentStatusUpdated(_shipmentId, _status);
       }
       
       function getShipmentDetails(string memory _shipmentId) public view returns (
           string memory origin,
           string memory destination,
           uint256 timestamp,
           string memory status
       ) {
           require(shipments[_shipmentId].isActive == true, "Shipment ID does not exist");
           
           Shipment memory shipment = shipments[_shipmentId];
           
           return (
               shipment.origin,
               shipment.destination,
               shipment.timestamp,
               shipment.status
           );
       }
       
       function getShipmentCount() public view returns (uint256) {
           return shipmentIds.length;
       }
   }
   ```

4. Compile and deploy the smart contract:
   ```bash
   truffle compile
   truffle migrate --network <network-name>
   # or
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

5. Update the `contractAddress` in `src/services/blockchain.ts` with your deployed contract address
6. Update the `contractABI` in `src/services/blockchain.ts` with your contract ABI

### Connecting to the Contract

The application uses Web3.js to connect to the Ethereum blockchain. The initialization logic is in `src/services/blockchain.ts`. Make sure to:

1. Replace `YOUR_INFURA_API_KEY` with your actual Infura API key
2. Replace `YOUR_CONTRACT_ADDRESS` with your deployed contract address
3. Update the `contractABI` with your actual contract ABI

## Adding New Features

### 1. Smart Navigation Feature

1. Install required dependencies:
   ```bash
   npm install @react-google-maps/api
   ```

2. Create a new component for smart navigation:
   ```tsx
   // src/components/dashboard/SmartNavigation.tsx
   import React, { useState, useCallback } from 'react';
   import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
   import { Card } from '@/components/ui/card';
   
   const SmartNavigation = () => {
     const [directions, setDirections] = useState(null);
     const [origin, setOrigin] = useState('');
     const [destination, setDestination] = useState('');
   
     const directionsCallback = useCallback((response) => {
       if (response !== null && response.status === 'OK') {
         setDirections(response);
       }
     }, []);
   
     return (
       <div className="space-y-4">
         <h2 className="text-2xl font-bold text-charcoal">Smart Navigation</h2>
         
         <Card className="p-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
               <input
                 type="text"
                 value={origin}
                 onChange={(e) => setOrigin(e.target.value)}
                 className="w-full p-2 border border-gray-300 rounded-md"
                 placeholder="Enter origin address"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
               <input
                 type="text"
                 value={destination}
                 onChange={(e) => setDestination(e.target.value)}
                 className="w-full p-2 border border-gray-300 rounded-md"
                 placeholder="Enter destination address"
               />
             </div>
           </div>
           
           <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
             <div style={{ height: '400px', width: '100%' }}>
               <GoogleMap
                 mapContainerStyle={{ height: '100%', width: '100%' }}
                 zoom={7}
                 center={{ lat: 40.7128, lng: -74.0060 }}
               >
                 {origin && destination && (
                   <DirectionsService
                     options={{
                       origin,
                       destination,
                       travelMode: 'DRIVING',
                     }}
                     callback={directionsCallback}
                   />
                 )}
                 {directions && <DirectionsRenderer directions={directions} />}
               </GoogleMap>
             </div>
           </LoadScript>
         </Card>
       </div>
     );
   };
   
   export default SmartNavigation;
   ```

3. Add the component to your dashboard tabs:
   ```tsx
   // src/pages/Dashboard.tsx
   // Add import
   import SmartNavigation from '@/components/dashboard/SmartNavigation';
   
   // Add to TabsList
   <TabsTrigger value="navigation">Smart Navigation</TabsTrigger>
   
   // Add TabsContent
   <TabsContent value="navigation" className="space-y-6">
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.3 }}
     >
       <SmartNavigation />
     </motion.div>
   </TabsContent>
   ```

### 2. Weather Analytics Feature

1. Install required dependencies:
   ```bash
   npm install react-apexcharts apexcharts
   ```

2. Create a new weather service:
   ```tsx
   // src/services/weather.ts
   const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
   
   export interface WeatherData {
     location: string;
     temperature: number;
     humidity: number;
     windSpeed: number;
     conditions: string;
     forecast: {
       date: string;
       temperature: number;
       conditions: string;
     }[];
   }
   
   export const getWeatherData = async (location: string): Promise<WeatherData> => {
     try {
       const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
       );
       
       if (!response.ok) {
         throw new Error('Weather data fetch failed');
       }
       
       const data = await response.json();
       
       // Get forecast data
       const forecastResponse = await fetch(
         `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
       );
       
       if (!forecastResponse.ok) {
         throw new Error('Forecast data fetch failed');
       }
       
       const forecastData = await forecastResponse.json();
       
       // Process forecast data (daily)
       const dailyForecast = forecastData.list
         .filter((_: any, index: number) => index % 8 === 0) // Get one reading per day
         .slice(0, 5) // Get 5 days
         .map((day: any) => ({
           date: new Date(day.dt * 1000).toLocaleDateString(),
           temperature: day.main.temp,
           conditions: day.weather[0].main,
         }));
       
       return {
         location: data.name,
         temperature: data.main.temp,
         humidity: data.main.humidity,
         windSpeed: data.wind.speed,
         conditions: data.weather[0].main,
         forecast: dailyForecast,
       };
     } catch (error) {
       console.error('Error fetching weather data:', error);
       throw error;
     }
   };
   ```

3. Create the weather analytics component:
   ```tsx
   // src/components/dashboard/WeatherAnalytics.tsx
   import React, { useState } from 'react';
   import { useQuery } from '@tanstack/react-query';
   import { Card } from '@/components/ui/card';
   import { Button } from '@/components/ui/button';
   import { Cloud, Sun, Wind, Droplets, Search } from 'lucide-react';
   import { getWeatherData } from '@/services/weather';
   import dynamic from 'next/dynamic';
   
   // Import ApexCharts dynamically to avoid SSR issues
   const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
   
   const WeatherAnalytics = () => {
     const [location, setLocation] = useState('New York');
     const [searchQuery, setSearchQuery] = useState('New York');
     
     const { data, isLoading, error } = useQuery({
       queryKey: ['weather', location],
       queryFn: () => getWeatherData(location),
     });
     
     const handleSearch = () => {
       setLocation(searchQuery);
     };
     
     const getWeatherIcon = (conditions: string) => {
       switch (conditions.toLowerCase()) {
         case 'clear':
           return <Sun className="h-10 w-10 text-yellow-500" />;
         case 'clouds':
           return <Cloud className="h-10 w-10 text-gray-500" />;
         case 'rain':
           return <Droplets className="h-10 w-10 text-blue-500" />;
         default:
           return <Cloud className="h-10 w-10 text-gray-500" />;
       }
     };
     
     if (isLoading) {
       return <div className="text-center py-10">Loading weather data...</div>;
     }
     
     if (error) {
       return <div className="text-center py-10 text-red-500">Error loading weather data</div>;
     }
     
     const chartOptions = {
       chart: {
         type: 'line',
         toolbar: {
           show: false,
         },
       },
       xaxis: {
         categories: data?.forecast.map(day => day.date) || [],
       },
       colors: ['#6f61ef'],
       stroke: {
         curve: 'smooth',
       },
     };
     
     const chartSeries = [
       {
         name: 'Temperature (°C)',
         data: data?.forecast.map(day => day.temperature) || [],
       },
     ];
     
     return (
       <div className="space-y-6">
         <h2 className="text-2xl font-bold text-charcoal">Weather Analytics</h2>
         <p className="text-gray-600">
           Monitor weather conditions along shipping routes to optimize delivery planning
         </p>
         
         <div className="flex space-x-2 mb-6">
           <div className="relative flex-grow">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search location"
               className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full"
             />
           </div>
           <Button onClick={handleSearch}>Search</Button>
         </div>
         
         {data && (
           <>
             <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h3 className="text-xl font-semibold">{data.location}</h3>
                   <p className="text-gray-500">Current Weather Conditions</p>
                 </div>
                 {getWeatherIcon(data.conditions)}
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                   <div className="mr-3">
                     <p className="text-xl font-bold">{data.temperature}°C</p>
                     <p className="text-sm text-gray-500">Temperature</p>
                   </div>
                 </div>
                 
                 <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                   <div className="mr-3">
                     <p className="text-xl font-bold">{data.humidity}%</p>
                     <p className="text-sm text-gray-500">Humidity</p>
                   </div>
                   <Droplets className="h-8 w-8 text-blue-500 ml-auto" />
                 </div>
                 
                 <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                   <div className="mr-3">
                     <p className="text-xl font-bold">{data.windSpeed} m/s</p>
                     <p className="text-sm text-gray-500">Wind Speed</p>
                   </div>
                   <Wind className="h-8 w-8 text-blue-500 ml-auto" />
                 </div>
               </div>
             </Card>
             
             <Card className="p-6">
               <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
               <div className="h-64">
                 <Chart
                   options={chartOptions}
                   series={chartSeries}
                   type="line"
                   height="100%"
                 />
               </div>
             </Card>
           </>
         )}
       </div>
     );
   };
   
   export default WeatherAnalytics;
   ```

### 3. Carbon Emission Reduction AI Suggestions

1. Create a service for AI suggestions:
   ```tsx
   // src/services/sustainability.ts
   import { Shipment } from './shipment';
   
   export interface SustainabilitySuggestion {
     id: string;
     type: 'route' | 'packaging' | 'transport' | 'schedule';
     title: string;
     description: string;
     potentialSavings: {
       carbon: number; // in kg CO2
       cost: number; // in USD
     };
     difficulty: 'easy' | 'medium' | 'hard';
   }
   
   // Simulated AI suggestion generator
   export const generateSustainabilitySuggestions = (
     shipments: Shipment[]
   ): SustainabilitySuggestion[] => {
     // This would typically be an API call to an AI service
     // Here we're simulating suggestions based on shipment data
     
     const suggestions: SustainabilitySuggestion[] = [];
     
     // Check for route optimization opportunities
     if (shipments.length > 5) {
       suggestions.push({
         id: 'sugg-1',
         type: 'route',
         title: 'Optimize Delivery Routes',
         description: 'Consolidate shipments going to nearby destinations to reduce travel distance by up to 15%.',
         potentialSavings: {
           carbon: 120, // kg CO2
           cost: 350, // USD
         },
         difficulty: 'medium',
       });
     }
     
     // Check for packaging optimization
     suggestions.push({
       id: 'sugg-2',
       type: 'packaging',
       title: 'Use Sustainable Packaging',
       description: 'Switch to recycled packaging materials to reduce packaging carbon footprint by up to 30%.',
       potentialSavings: {
         carbon: 85, // kg CO2
         cost: 200, // USD
       },
       difficulty: 'easy',
     });
     
     // Check for transport mode optimization
     const longDistanceShipments = shipments.filter(
       (s) => getDistance(s.origin, s.destination) > 500
     );
     
     if (longDistanceShipments.length > 0) {
       suggestions.push({
         id: 'sugg-3',
         type: 'transport',
         title: 'Switch to Rail for Long Distance',
         description: 'Use rail transport instead of trucks for shipments over 500km to reduce emissions by up to 75%.',
         potentialSavings: {
           carbon: 450, // kg CO2
           cost: -150, // USD (might be more expensive)
         },
         difficulty: 'hard',
       });
     }
     
     // Scheduling optimization
     suggestions.push({
       id: 'sugg-4',
       type: 'schedule',
       title: 'Off-Peak Deliveries',
       description: 'Schedule deliveries during off-peak hours to reduce time spent in traffic and lower fuel consumption.',
       potentialSavings: {
         carbon: 65, // kg CO2
         cost: 180, // USD
       },
       difficulty: 'medium',
     });
     
     return suggestions;
   };
   
   // Helper function to simulate distance calculation
   const getDistance = (origin: string, destination: string): number => {
     // This would typically use a mapping API
     // For simulation, we'll return a random value
     return Math.floor(Math.random() * 1000) + 100;
   };
   ```

2. Create the sustainability component:
   ```tsx
   // src/components/dashboard/SustainabilityRecommendations.tsx
   import React from 'react';
   import { useQuery } from '@tanstack/react-query';
   import { Card } from '@/components/ui/card';
   import { Badge } from '@/components/ui/badge';
   import { Button } from '@/components/ui/button';
   import { Leaf, BarChart2, TrendingDown, AlertTriangle } from 'lucide-react';
   import { getAllShipments } from '@/services/shipment';
   import { generateSustainabilitySuggestions } from '@/services/sustainability';
   
   const SustainabilityRecommendations = () => {
     const { data: shipments, isLoading: shipmentsLoading } = useQuery({
       queryKey: ['shipments'],
       queryFn: getAllShipments,
     });
     
     const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
       queryKey: ['sustainability-suggestions', shipments],
       queryFn: () => generateSustainabilitySuggestions(shipments || []),
       enabled: !!shipments,
     });
     
     if (shipmentsLoading || suggestionsLoading) {
       return <div className="text-center py-10">Loading recommendations...</div>;
     }
     
     const getTotalSavings = () => {
       if (!suggestions) return { carbon: 0, cost: 0 };
       
       return suggestions.reduce(
         (acc, sugg) => ({
           carbon: acc.carbon + sugg.potentialSavings.carbon,
           cost: acc.cost + sugg.potentialSavings.cost,
         }),
         { carbon: 0, cost: 0 }
       );
     };
     
     const getDifficultyColor = (difficulty: string) => {
       switch (difficulty) {
         case 'easy':
           return 'bg-green-100 text-green-800';
         case 'medium':
           return 'bg-yellow-100 text-yellow-800';
         case 'hard':
           return 'bg-red-100 text-red-800';
         default:
           return 'bg-gray-100 text-gray-800';
       }
     };
     
     const totalSavings = getTotalSavings();
     
     return (
       <div className="space-y-6">
         <div className="flex justify-between items-center">
           <div>
             <h2 className="text-2xl font-bold text-charcoal">Sustainability Recommendations</h2>
             <p className="text-gray-600">AI-powered suggestions to reduce your carbon footprint</p>
           </div>
           <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-lg">
             <Leaf className="h-5 w-5" />
             <span className="font-medium">AI Suggestions</span>
           </div>
         </div>
         
         <Card className="p-6">
           <div className="flex items-center space-x-3 mb-6">
             <div className="h-12 w-12 bg-purple/10 rounded-lg flex items-center justify-center">
               <BarChart2 className="h-6 w-6 text-purple" />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-charcoal">Potential Savings Summary</h3>
               <p className="text-gray-600">Implement all recommendations to achieve these savings</p>
             </div>
           </div>
   
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-pale/50 p-6 rounded-lg">
               <div className="flex items-center mb-2">
                 <Leaf className="h-5 w-5 text-green-600 mr-2" />
                 <h4 className="font-semibold">Carbon Reduction</h4>
               </div>
               <p className="text-3xl font-bold text-green-600 mb-1">{totalSavings.carbon} kg CO2</p>
               <p className="text-sm text-gray-600">Potential carbon savings per month</p>
             </div>
             
             <div className="bg-pale/50 p-6 rounded-lg">
               <div className="flex items-center mb-2">
                 <TrendingDown className="h-5 w-5 text-blue-600 mr-2" />
                 <h4 className="font-semibold">Cost Impact</h4>
               </div>
               <p className="text-3xl font-bold text-blue-600 mb-1">${totalSavings.cost}</p>
               <p className="text-sm text-gray-600">Potential cost savings per month</p>
             </div>
           </div>
         </Card>
         
         <h3 className="text-xl font-semibold text-charcoal mt-8 mb-4">Recommendations</h3>
         
         <div className="space-y-4">
           {suggestions?.map((suggestion) => (
             <Card key={suggestion.id} className="p-6">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="text-lg font-semibold text-charcoal">{suggestion.title}</h4>
                   <p className="text-gray-600 mt-1">{suggestion.description}</p>
                 </div>
                 <Badge className={getDifficultyColor(suggestion.difficulty)}>
                   {suggestion.difficulty}
                 </Badge>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                 <div className="flex items-center space-x-2">
                   <Leaf className="h-5 w-5 text-green-600" />
                   <span className="text-sm">Carbon savings: <span className="font-semibold">{suggestion.potentialSavings.carbon} kg CO2</span></span>
                 </div>
                 
                 <div className="flex items-center space-x-2">
                   <TrendingDown className="h-5 w-5 text-blue-600" />
                   <span className="text-sm">Cost impact: <span className="font-semibold">${suggestion.potentialSavings.cost}</span></span>
                 </div>
               </div>
               
               <div className="flex justify-end">
                 <Button>Implement</Button>
               </div>
             </Card>
           ))}
         </div>
       </div>
     );
   };
   
   export default SustainabilityRecommendations;
   ```

## Authentication Setup

The application uses Firebase for authentication. Here's how to set it up:

1. Update the Firebase configuration in `src/services/firebase.ts` with your actual Firebase project credentials.

2. Create an authentication service:
   ```tsx
   // src/services/auth.ts
   import { 
     loginUser, 
     registerUser, 
     logoutUser, 
     getCurrentUser 
   } from './firebase';
   
   export interface UserCredentials {
     email: string;
     password: string;
   }
   
   export interface UserProfile {
     id: string;
     email: string;
     displayName?: string;
     role: 'admin' | 'manager' | 'driver' | 'warehouse';
     company?: string;
     photoURL?: string;
   }
   
   export const login = async (credentials: UserCredentials) => {
     try {
       const user = await loginUser(credentials.email, credentials.password);
       return user;
     } catch (error) {
       console.error("Error during login:", error);
       throw error;
     }
   };
   
   export const register = async (credentials: UserCredentials, profile: Partial<UserProfile>) => {
     try {
       const user = await registerUser(credentials.email, credentials.password);
       
       // Create user profile in Firestore
       // You would implement this functionality in firebase.ts
       
       return user;
     } catch (error) {
       console.error("Error during registration:", error);
       throw error;
     }
   };
   
   export const logout = async () => {
     try {
       await logoutUser();
       return true;
     } catch (error) {
       console.error("Error during logout:", error);
       throw error;
     }
   };
   
   export const getCurrentUserProfile = async () => {
     try {
       const user = getCurrentUser();
       
       if (!user) {
         return null;
       }
       
       // Fetch user profile from Firestore
       // You would implement this functionality in firebase.ts
       
       return {
         id: user.uid,
         email: user.email || '',
         displayName: user.displayName || '',
         photoURL: user.photoURL || '',
         role: 'manager', // Default role, would come from Firestore in a real app
       };
     } catch (error) {
       console.error("Error getting current user profile:", error);
       throw error;
     }
   };
   ```

3. Create authentication components:
   ```tsx
   // src/components/auth/LoginForm.tsx
   import React, { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import { Button } from '@/components/ui/button';
   import { Card } from '@/components/ui/card';
   import { Input } from '@/components/ui/input';
   import { Label } from '@/components/ui/label';
   import { login } from '@/services/auth';
   import { useToast } from '@/hooks/use-toast';
   
   const LoginForm = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const navigate = useNavigate();
     const { toast } = useToast();
     
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setIsLoading(true);
       
       try {
         await login({ email, password });
         toast({
           title: 'Login Successful',
           description: 'Welcome back to GreenTrackers!',
           variant: 'default',
         });
         navigate('/dashboard');
       } catch (error) {
         toast({
           title: 'Login Failed',
           description: 'Please check your credentials and try again.',
           variant: 'destructive',
         });
         console.error(error);
       } finally {
         setIsLoading(false);
       }
     };
     
     return (
       <Card className="w-full max-w-md mx-auto p-6">
         <h2 className="text-2xl font-bold text-center mb-6">Login to GreenTrackers</h2>
         
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="email">Email</Label>
             <Input
               id="email"
               type="email"
               placeholder="your@email.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
             />
           </div>
           
           <div className="space-y-2">
             <div className="flex justify-between">
               <Label htmlFor="password">Password</Label>
               <a href="#" className="text-sm text-purple hover:underline">
                 Forgot Password?
               </a>
             </div>
             <Input
               id="password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
             />
           </div>
           
           <Button type="submit" className="w-full" disabled={isLoading}>
             {isLoading ? 'Logging in...' : 'Login'}
           </Button>
           
           <p className="text-center text-sm mt-4">
             Don't have an account?{' '}
             <a href="/signup" className="text-purple hover:underline">
               Sign up
             </a>
           </p>
         </form>
       </Card>
     );
   };
   
   export default LoginForm;
   ```

## Summary and Future Development

This documentation provides a comprehensive guide to the Blockchain-Based Logistics Tracker project, including:

1. Technology stack and project structure
2. Local setup instructions
3. Firebase and blockchain integration
4. Adding new features (Smart Navigation, Weather Analytics, Carbon Emission Reduction)
5. Authentication setup

### Future Development Ideas

1. **Real-time IoT Integration**: Connect with real IoT devices for temperature, humidity, and location monitoring.
2. **Machine Learning for Predictive Analytics**: Implement ML algorithms for delivery time prediction and demand forecasting.
3. **Mobile App Development**: Create a companion mobile app for drivers and warehouse staff.
4. **Advanced Blockchain Features**: Implement smart contracts for automated payments and penalty calculations.
5. **Integration with ERP Systems**: Connect with popular ERP systems like SAP, Oracle, etc.
6. **Advanced Sustainability Metrics**: Add more detailed carbon footprint tracking and reporting.
7. **Multi-language Support**: Add internationalization for global usage.
8. **Advanced Access Control**: Implement role-based access control for different user types.

### Maintenance and Support

To ensure the application runs smoothly:

1. Regularly update dependencies and security patches
2. Monitor Firebase usage to optimize costs
3. Backup Firestore data regularly
4. Monitor blockchain gas costs and optimize transactions
5. Set up error monitoring with tools like Sentry

For any questions or support needs, refer to the official documentation of the technologies used or contact the project maintainers.
