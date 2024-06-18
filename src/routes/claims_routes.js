import { Router } from 'express';
import { createClaim, getClaims, getClaimById, updateClaimById, deleteClaimById } from '../controllers/claims_controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();

router.get('/claims', verifyToken, getClaims);
router.get('/claims/:id', verifyToken, getClaimById);
router.post('/claims', verifyToken, createClaim);
router.put('/claims/:id', verifyToken, updateClaimById);
router.delete('/claims/:id', verifyToken, deleteClaimById);

export default router;
