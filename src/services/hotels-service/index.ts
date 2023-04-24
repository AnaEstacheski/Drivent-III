import { TicketStatus } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getAllHotels(userId: number) {
  await verifyPaymentAndEnrollment(userId);
  const findHotels = await hotelRepository.findHotels();
  if (!findHotels) throw notFoundError();
  return findHotels;
}

async function verifyPaymentAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const existingPaidTicket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!existingPaidTicket) throw notFoundError();

  const notPaid = existingPaidTicket.status == TicketStatus.RESERVED;
  const notIncludeHotel = !existingPaidTicket.TicketType.includesHotel;
  const isRemote = existingPaidTicket.TicketType.isRemote;
  if (notPaid || isRemote || notIncludeHotel) throw paymentRequiredError();
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
