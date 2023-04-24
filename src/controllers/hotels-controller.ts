import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
// import hotelsService from '@/services/hotels-service';

// export async function getAllHotels(req: AuthenticatedRequest, res: Response): Promise<Response> {
//   const { userId } = req;
//   try {
//     const hotels = await hotelsService.getAllHotels(userId);
//     return res.status(httpStatus.OK).send(hotels);
//   } catch (error) {
//     return res.sendStatus(httpStatus.BAD_REQUEST);
//   }
// }

// export async function getHotelById(req: AuthenticatedRequest, res: Response) {

// }
