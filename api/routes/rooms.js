import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE
router.post("/:hotelId",verifyAdmin, createRoom)

//GET
router.get("/:id", getRoom)

//GET ALL
router.get("/", getRooms)

//UPDATE
router.put("/:id",verifyAdmin, updateRoom)

router.put("/availability/:id", updateRoomAvailability)

//DELETE
router.delete("/:hotelId/:id",verifyAdmin, deleteRoom)


export default router;
