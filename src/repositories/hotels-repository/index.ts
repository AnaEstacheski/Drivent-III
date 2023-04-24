import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
};

export default hotelRepository;
