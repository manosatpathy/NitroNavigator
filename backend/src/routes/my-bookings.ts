import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../types";
const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });
    if (!results) {
      return res.status(404).json({ message: "No Bookings found" });
    }

    return res.status(200).send(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
