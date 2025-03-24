
import { addDocument, getDocuments, updateDocument, getDocumentsByField } from './firebase';
import { addShipment as addBlockchainShipment, updateShipmentStatus as updateBlockchainStatus } from './blockchain';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered';
  estimatedDelivery: string;
  customer: string;
  trackingEvents: {
    time: string;
    location: string;
    status: string;
  }[];
  carbonFootprint?: number;
  temperature?: number;
  humidity?: number;
}

// Add a new shipment
export const addShipment = async (shipmentData: Omit<Shipment, 'id'>) => {
  try {
    // Add to Firebase
    const shipmentId = await addDocument('shipments', shipmentData);
    
    // Add to Blockchain
    await addBlockchainShipment(
      shipmentId,
      shipmentData.origin,
      shipmentData.destination,
      shipmentData.status
    );
    
    return shipmentId;
  } catch (error) {
    console.error("Error adding shipment:", error);
    throw error;
  }
};

// Get all shipments
export const getAllShipments = async () => {
  try {
    const shipments = await getDocuments('shipments');
    return shipments as Shipment[];
  } catch (error) {
    console.error("Error getting shipments:", error);
    throw error;
  }
};

// Get shipments by status
export const getShipmentsByStatus = async (status: Shipment['status']) => {
  try {
    const shipments = await getDocumentsByField('shipments', 'status', status);
    return shipments as Shipment[];
  } catch (error) {
    console.error("Error getting shipments by status:", error);
    throw error;
  }
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId: string, newStatus: Shipment['status']) => {
  try {
    // Update in Firebase
    await updateDocument('shipments', shipmentId, { status: newStatus });
    
    // Update in Blockchain
    await updateBlockchainStatus(shipmentId, newStatus);
    
    return true;
  } catch (error) {
    console.error("Error updating shipment status:", error);
    throw error;
  }
};

// Add tracking event
export const addTrackingEvent = async (
  shipmentId: string,
  event: { time: string; location: string; status: string }
) => {
  try {
    const shipment = await getDocumentsByField('shipments', 'id', shipmentId);
    if (!shipment.length) throw new Error('Shipment not found');
    
    const updatedEvents = [...shipment[0].trackingEvents, event];
    await updateDocument('shipments', shipmentId, { trackingEvents: updatedEvents });
    
    return true;
  } catch (error) {
    console.error("Error adding tracking event:", error);
    throw error;
  }
};

// Calculate carbon footprint
export const calculateCarbonFootprint = async (
  shipmentId: string,
  distance: number,
  transportMode: 'road' | 'air' | 'sea'
) => {
  // Emission factors in kg CO2 per km
  const emissionFactors = {
    road: 0.1,  // Example value for truck transport
    air: 0.5,   // Example value for air freight
    sea: 0.02   // Example value for sea freight
  };
  
  try {
    const carbonFootprint = distance * emissionFactors[transportMode];
    await updateDocument('shipments', shipmentId, { carbonFootprint });
    return carbonFootprint;
  } catch (error) {
    console.error("Error calculating carbon footprint:", error);
    throw error;
  }
};

// Update IoT sensor data
export const updateSensorData = async (
  shipmentId: string,
  temperature: number,
  humidity: number
) => {
  try {
    await updateDocument('shipments', shipmentId, { temperature, humidity });
    return true;
  } catch (error) {
    console.error("Error updating sensor data:", error);
    throw error;
  }
};
