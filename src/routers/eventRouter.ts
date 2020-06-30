import express from 'express';
import { getEvents, getEvent } from '../controllers/eventController';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEvent);


export default router;
