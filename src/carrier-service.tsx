import { Hono } from 'hono'

type Bindings = {
  DB: D1Database
  FEDEX_API_KEY?: string
  FEDEX_SECRET_KEY?: string
  DHL_API_KEY?: string
  BLUEDART_API_KEY?: string
  DELHIVERY_API_KEY?: string
}

const carrierRouter = new Hono<{ Bindings: Bindings }>()

// Carrier interface
interface Carrier {
  name: string
  createShipment(order: any): Promise<ShipmentResponse>
  trackShipment(trackingId: string): Promise<TrackingResponse>
  cancelShipment(trackingId: string): Promise<{ success: boolean; error?: string }>
}

interface ShipmentResponse {
  success: boolean
  trackingId?: string
  labelUrl?: string
  error?: string
  estimatedDelivery?: string
}

interface TrackingResponse {
  success: boolean
  status?: string
  location?: string
  events?: Array<{ status: string; location: string; timestamp: string; message: string }>
  estimatedDelivery?: string
  error?: string
}

// FedEx Carrier (India)
class FedExCarrier implements Carrier {
  name = 'FedEx'
  
  constructor(private apiKey: string, private secretKey: string) {}

  async createShipment(order: any): Promise<ShipmentResponse> {
    try {
      // FedEx API endpoint (production: https://apis.fedex.com/ship/v1/shipments)
      const url = 'https://apis.fedex.com/ship/v1/shipments'
      
      const payload = {
        requestedShipment: {
          shipper: {
            address: {
              streetLines: ['FLYQ Warehouse'],
              city: 'Mumbai',
              stateOrProvinceCode: 'MH',
              postalCode: '400001',
              countryCode: 'IN'
            },
            contact: {
              personName: 'FLYQ Drones',
              phoneNumber: '+919876543210'
            }
          },
          recipients: [{
            address: {
              streetLines: [order.shipping_address],
              city: order.city || 'Unknown',
              postalCode: order.pincode || '',
              countryCode: 'IN'
            },
            contact: {
              personName: order.customer_name,
              phoneNumber: order.customer_phone
            }
          }],
          shipmentSpecialServices: {
            specialServiceTypes: ['PRIORITY_ALERT']
          },
          pickupType: 'CONTACT_FEDEX_TO_SCHEDULE',
          serviceType: 'FEDEX_EXPRESS_SAVER',
          packagingType: 'YOUR_PACKAGING',
          requestedPackageLineItems: [{
            weight: { value: 2, units: 'KG' },
            dimensions: { length: 30, width: 30, height: 15, units: 'CM' }
          }]
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'Authorization': `Bearer ${this.secretKey}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok && data.output?.transactionShipments?.[0]) {
        const shipment = data.output.transactionShipments[0]
        return {
          success: true,
          trackingId: shipment.masterTrackingNumber,
          labelUrl: shipment.pieceResponses?.[0]?.packageDocuments?.[0]?.url,
          estimatedDelivery: shipment.completedShipmentDetail?.operationalDetail?.deliveryDate
        }
      } else {
        return { success: false, error: data.errors?.[0]?.message || 'FedEx API error' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async trackShipment(trackingId: string): Promise<TrackingResponse> {
    try {
      const url = `https://apis.fedex.com/track/v1/trackingnumbers`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
          'Authorization': `Bearer ${this.secretKey}`
        },
        body: JSON.stringify({
          trackingInfo: [{ trackingNumberInfo: { trackingNumber: trackingId } }],
          includeDetailedScans: true
        })
      })

      const data = await response.json()

      if (response.ok && data.output?.completeTrackResults?.[0]) {
        const track = data.output.completeTrackResults[0].trackResults[0]
        const events = track.scanEvents?.map((e: any) => ({
          status: e.eventType,
          location: e.scanLocation?.city || '',
          timestamp: e.date,
          message: e.eventDescription
        })) || []

        return {
          success: true,
          status: track.latestStatusDetail?.description,
          location: track.latestStatusDetail?.scanLocation?.city,
          events,
          estimatedDelivery: track.estimatedDeliveryTimeWindow?.window?.ends
        }
      } else {
        return { success: false, error: 'Tracking not found' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async cancelShipment(trackingId: string): Promise<{ success: boolean; error?: string }> {
    return { success: false, error: 'FedEx cancellation requires API call' }
  }
}

// Delhivery Carrier (Popular in India)
class DelhiveryCarrier implements Carrier {
  name = 'Delhivery'
  
  constructor(private apiKey: string) {}

  async createShipment(order: any): Promise<ShipmentResponse> {
    try {
      const url = 'https://track.delhivery.com/api/cmu/create.json'
      
      const payload = {
        shipments: [{
          name: order.customer_name,
          add: order.shipping_address,
          pin: order.pincode || '400001',
          city: order.city || 'Mumbai',
          state: order.state || 'Maharashtra',
          country: 'India',
          phone: order.customer_phone,
          order: order.order_number,
          payment_mode: 'Prepaid',
          return_add: 'FLYQ Warehouse, Mumbai',
          return_pin: '400001',
          return_city: 'Mumbai',
          return_phone: '+919876543210',
          order_date: new Date().toISOString(),
          total_amount: order.total,
          seller_add: 'FLYQ Warehouse',
          seller_name: 'FLYQ Drones',
          seller_inv: order.order_number,
          quantity: '1',
          waybill: '',
          shipment_width: '30',
          shipment_height: '15',
          weight: '2',
          seller_gst_tin: '',
          shipping_mode: 'Surface',
          address_type: 'home'
        }],
        pickup_location: {
          name: 'FLYQ Warehouse',
          add: 'FLYQ Warehouse, Mumbai',
          city: 'Mumbai',
          pin_code: '400001',
          country: 'India',
          phone: '+919876543210'
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.apiKey}`
        },
        body: JSON.stringify({ format: 'json', data: JSON.stringify(payload) })
      })

      const data = await response.json()

      if (response.ok && data.packages) {
        return {
          success: true,
          trackingId: data.packages[0]?.waybill,
          estimatedDelivery: data.packages[0]?.expected_delivery_date
        }
      } else {
        return { success: false, error: data.error || 'Delhivery API error' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async trackShipment(trackingId: string): Promise<TrackingResponse> {
    try {
      const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=${trackingId}`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${this.apiKey}`
        }
      })

      const data = await response.json()

      if (response.ok && data.ShipmentData?.[0]) {
        const shipment = data.ShipmentData[0].Shipment
        const scans = shipment.Scans || []
        
        const events = scans.map((scan: any) => ({
          status: scan.ScanDetail?.Scan,
          location: scan.ScanDetail?.ScannedLocation,
          timestamp: scan.ScanDetail?.ScanDateTime,
          message: scan.ScanDetail?.Instructions || scan.ScanDetail?.Scan
        }))

        return {
          success: true,
          status: shipment.Status?.Status,
          location: shipment.Origin,
          events,
          estimatedDelivery: shipment.ExpectedDeliveryDate
        }
      } else {
        return { success: false, error: 'Tracking not found' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async cancelShipment(trackingId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `https://track.delhivery.com/api/p/edit`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.apiKey}`
        },
        body: JSON.stringify({ waybill: trackingId, cancellation: true })
      })

      return response.ok ? { success: true } : { success: false, error: 'Cancellation failed' }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// Mock Carrier for development
class MockCarrier implements Carrier {
  name = 'FLYQ Express (Mock)'

  async createShipment(order: any): Promise<ShipmentResponse> {
    return {
      success: true,
      trackingId: `TRK${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  }

  async trackShipment(trackingId: string): Promise<TrackingResponse> {
    return {
      success: true,
      status: 'In Transit',
      location: 'Mumbai Distribution Center',
      events: [
        { status: 'picked_up', location: 'FLYQ Warehouse', timestamp: new Date().toISOString(), message: 'Package picked up' },
        { status: 'in_transit', location: 'Mumbai Hub', timestamp: new Date().toISOString(), message: 'In transit' }
      ],
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  }

  async cancelShipment(trackingId: string): Promise<{ success: boolean; error?: string }> {
    return { success: true }
  }
}

// Get carrier instance
function getCarrier(carrierName: string, env: Bindings): Carrier {
  switch (carrierName.toLowerCase()) {
    case 'fedex':
      if (env.FEDEX_API_KEY && env.FEDEX_SECRET_KEY) {
        return new FedExCarrier(env.FEDEX_API_KEY, env.FEDEX_SECRET_KEY)
      }
      break
    case 'delhivery':
      if (env.DELHIVERY_API_KEY) {
        return new DelhiveryCarrier(env.DELHIVERY_API_KEY)
      }
      break
  }
  return new MockCarrier()
}

// Create shipment with carrier
carrierRouter.post('/api/admin/orders/:id/create-carrier-shipment', async (c) => {
  const orderId = c.req.param('id')
  const { carrier } = await c.req.json()
  
  const order = await c.env.DB.prepare(`
    SELECT * FROM orders WHERE id = ?
  `).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: 'Order not found' }, 404)
  }

  const carrierInstance = getCarrier(carrier || 'mock', c.env)
  const result = await carrierInstance.createShipment(order)

  if (result.success) {
    // Update order with carrier tracking
    await c.env.DB.prepare(`
      UPDATE orders
      SET tracking_id = ?,
          shipping_carrier = ?,
          estimated_delivery = ?,
          shipping_status = 'picked_up',
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(result.trackingId, carrierInstance.name, result.estimatedDelivery, orderId).run()

    return c.json({
      success: true,
      trackingId: result.trackingId,
      carrier: carrierInstance.name,
      labelUrl: result.labelUrl,
      estimatedDelivery: result.estimatedDelivery
    })
  } else {
    return c.json({ success: false, error: result.error }, 400)
  }
})

// Sync tracking from carrier
carrierRouter.post('/api/admin/orders/:id/sync-carrier-tracking', async (c) => {
  const orderId = c.req.param('id')
  
  const order = await c.env.DB.prepare(`
    SELECT tracking_id, shipping_carrier FROM orders WHERE id = ?
  `).bind(orderId).first()
  
  if (!order || !order.tracking_id) {
    return c.json({ error: 'No tracking ID' }, 404)
  }

  const carrier = getCarrier(order.shipping_carrier || 'mock', c.env)
  const tracking = await carrier.trackShipment(order.tracking_id)

  if (tracking.success && tracking.events) {
    // Add events to shipping_updates
    for (const event of tracking.events) {
      await c.env.DB.prepare(`
        INSERT INTO shipping_updates (order_id, tracking_id, status, location, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        orderId,
        order.tracking_id,
        event.status,
        event.location,
        event.message,
        event.timestamp
      ).run()
    }

    return c.json({
      success: true,
      status: tracking.status,
      eventsAdded: tracking.events.length
    })
  } else {
    return c.json({ success: false, error: tracking.error }, 400)
  }
})

// List available carriers
carrierRouter.get('/api/admin/carriers', async (c) => {
  const carriers = [
    { id: 'fedex', name: 'FedEx', available: !!(c.env.FEDEX_API_KEY && c.env.FEDEX_SECRET_KEY), countries: ['IN', 'US', 'Global'] },
    { id: 'delhivery', name: 'Delhivery', available: !!c.env.DELHIVERY_API_KEY, countries: ['IN'] },
    { id: 'bluedart', name: 'Blue Dart', available: !!c.env.BLUEDART_API_KEY, countries: ['IN'] },
    { id: 'dhl', name: 'DHL', available: !!c.env.DHL_API_KEY, countries: ['Global'] },
    { id: 'mock', name: 'FLYQ Express (Mock)', available: true, countries: ['All'] }
  ]

  return c.json({ carriers })
})

export default carrierRouter
