import { Service } from '../models/Service';
import { Clinic } from '../models/Clinic';
import { Appointment } from '../models/Appointment';

export class PricingService {
  static async calculateDynamicPrice(
    serviceId: string,
    clinicId: string,
    dateTime: Date
  ): Promise<number> {
    const service = await Service.findById(serviceId);
    const clinic = await Clinic.findById(clinicId);

    if (!service || !clinic || !service.dynamicPricing.enabled) {
      return service?.basePrice || 0;
    }

    let adjustedPrice = service.basePrice;
    const factors = service.dynamicPricing.factors;

    for (const factor of factors) {
      switch (factor.name) {
        case 'time':
          adjustedPrice *= await this.calculateTimeMultiplier(dateTime);
          break;
        case 'demand':
          adjustedPrice *= await this.calculateDemandMultiplier(clinicId, dateTime);
          break;
        case 'location':
          adjustedPrice *= await this.calculateLocationMultiplier(clinic);
          break;
        case 'competition':
          adjustedPrice *= await this.calculateCompetitionMultiplier(clinic);
          break;
      }
    }

    // Ensure price stays within bounds
    return Math.min(
      Math.max(adjustedPrice, service.dynamicPricing.minPrice),
      service.dynamicPricing.maxPrice
    );
  }

  private static async calculateTimeMultiplier(dateTime: Date): Promise<number> {
    const hour = dateTime.getHours();
    // Peak hours (9-11 AM and 2-4 PM) get higher multiplier
    if ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16)) {
      return 1.2;
    }
    // Early morning and late evening get lower multiplier
    if (hour < 8 || hour > 17) {
      return 0.8;
    }
    return 1.0;
  }

  private static async calculateDemandMultiplier(
    clinicId: string,
    dateTime: Date
  ): Promise<number> {
    const start = new Date(dateTime);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dateTime);
    end.setHours(23, 59, 59, 999);

    const appointmentCount = await Appointment.countDocuments({
      clinic: clinicId,
      dateTime: { $gte: start, $lte: end },
    });

    // Adjust price based on daily booking volume
    if (appointmentCount > 20) return 1.3;
    if (appointmentCount > 15) return 1.2;
    if (appointmentCount > 10) return 1.1;
    if (appointmentCount < 5) return 0.9;
    return 1.0;
  }

  private static async calculateLocationMultiplier(clinic: any): Promise<number> {
    // Implement location-based pricing using clinic's location data
    // This could factor in average income of the area, cost of living, etc.
    return 1.0;
  }

  private static async calculateCompetitionMultiplier(clinic: any): Promise<number> {
    // Implement competition-based pricing using nearby clinics data
    // This could factor in number of competitors and their pricing
    return 1.0;
  }
}