import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

async function findHotel(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function findTicketPaid(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  findHotel,
  findTicketPaid,
};

export default hotelRepository;
