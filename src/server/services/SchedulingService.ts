import { Appointment } from '../models/Appointment';
import { Clinic } from '../models/Clinic';
import { Service } from '../models/Service';

export class SchedulingService {
  static async getAvailableSlots(
    clinicId: string,
    serviceId: string,
    date: Date
  ): Promise<Date[]> {
    const clinic = await Clinic.findById(clinicId);
    const service = await Service.findById(serviceId);

    if (!clinic || !service) {
      throw new Error('Clinic or service not found');
    }

    const dayOfWeek = date.toLocaleLowerCase();
    const operatingHours = clinic.operatingHours.find(
      (hours) => hours.day === dayOfWeek && hours.isOpen
    );

    if (!operatingHours) {
      return [];
    }

    // Get all appointments for the day
    const existingAppointments = await Appointment.find({
      clinic: clinicId,
      dateTime: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    }).select('dateTime duration');

    // Generate all possible time slots
    const slots: Date[] = [];
    const [openHour, openMinute] = operatingHours.open.split(':');
    const [closeHour, closeMinute] = operatingHours.close.split(':');
    
    const startTime = new Date(date);
    startTime.setHours(parseInt(openHour), parseInt(openMinute), 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(parseInt(closeHour), parseInt(closeMinute), 0, 0);

    const slotDuration = service.duration + clinic.settings.bufferTime;
    let currentSlot = new Date(startTime);

    while (currentSlot < endTime) {
      const slotEnd = new Date(currentSlot.getTime() + slotDuration * 60000);
      
      // Check if slot conflicts with existing appointments
      const hasConflict = existingAppointments.some(appointment => {
        const appointmentEnd = new Date(
          appointment.dateTime.getTime() + appointment.duration * 60000
        );
        return (
          (currentSlot >= appointment.dateTime && currentSlot < appointmentEnd) ||
          (slotEnd > appointment.dateTime && slotEnd <= appointmentEnd)
        );
      });

      if (!hasConflict) {
        slots.push(new Date(currentSlot));
      }

      currentSlot = slotEnd;
    }

    return slots;
  }

  static async scheduleAppointment(
    clinicId: string,
    patientId: string,
    serviceId: string,
    staffId: string,
    dateTime: Date
  ): Promise<any> {
    // Validate availability
    const availableSlots = await this.getAvailableSlots(
      clinicId,
      serviceId,
      dateTime
    );

    if (!availableSlots.some(slot => slot.getTime() === dateTime.getTime())) {
      throw new Error('Selected time slot is not available');
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Create appointment
    const appointment = new Appointment({
      clinic: clinicId,
      patient: patientId,
      service: serviceId,
      staff: staffId,
      dateTime,
      duration: service.duration,
      status: 'scheduled',
      price: {
        base: service.basePrice,
        final: service.basePrice,
      },
    });

    await appointment.save();
    return appointment;
  }
}