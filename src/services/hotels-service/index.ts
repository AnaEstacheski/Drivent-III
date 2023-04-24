import { TicketStatus } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getAllHotels(userId: number) {
  await verifyPaymentAndEnrollment(userId);
  const findHotels = await hotelRepository.findHotels();
  if (!findHotels.length) throw notFoundError();
  return findHotels;
}

async function verifyPaymentAndEnrollment(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const findPaidTicket = await hotelRepository.findTicketPaid(userId);
  if (!findPaidTicket) throw notFoundError();

  const notPaid = findPaidTicket.status !== TicketStatus.PAID;
  const notIncludeHotel = !findPaidTicket.TicketType.includesHotel;
  const isRemote = findPaidTicket.TicketType.isRemote;
  if (notPaid || isRemote || notIncludeHotel) throw paymentRequiredError();
}

async function getHotelById(hotelId: number, userId: number) {
  await verifyPaymentAndEnrollment(userId);
  const hotel = await hotelRepository.findHotel(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

const hotelsService = {
  getAllHotels,
  getHotelById,
};

export default hotelsService;
