import Claim from '../models/claims.js'; // Ajusta la ruta según la ubicación de tu modelo de reclamo
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs-extra';

const getClaims = async (req, res) => {
    try {
        const claims = await Claim.find();
        res.status(200).json(claims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener reclamos' });
    }
};

const createClaim = async (req, res) => {
    const { direccion, descripcion } = req.body;

    const newClaimData = {
        direccion,
        descripcion,
        fecha: new Date(), 
    };

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, { folder: 'Claims' });

        newClaimData.imagen = cloudinaryResponse.secure_url;
        newClaimData.public_id = cloudinaryResponse.public_id;

        const claim = new Claim(newClaimData);
        await claim.save();

        await fs.unlink(req.files.imagen.tempFilePath);

        res.status(201).json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear reclamo' });
    }
};

const getClaimById = async (req, res) => {
    try {
        const { id } = req.params;
        const claim = await Claim.findById(id);

        if (!claim) {
            return res.status(404).json({ error: 'Claim no encontrado' });
        }

        res.status(200).json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener reclamo por ID' });
    }
};

const updateClaimById = async (req, res) => {
    const { direccion, descripcion } = req.body;
    const { id } = req.params;

    const updatedClaimData = {
        direccion,
        descripcion,
    };

    try {
        if (req.files && req.files.imagen) {
            const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, { folder: 'Claims' });
            updatedClaimData.imagen = cloudinaryResponse.secure_url;
            await fs.unlink(req.files.imagen.tempFilePath);
        }

        const claim = await Claim.findByIdAndUpdate(id, updatedClaimData, { new: true });

        if (!claim) {
            return res.status(404).json({ error: 'Claim no encontrado' });
        }

        res.status(200).json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar reclamo' });
    }
};

const deleteClaimById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el reclamo por el ID para obtener el public_id
        const claim = await Claim.findById(id);

        if (!claim) {
            return res.status(404).json({ error: 'Reclamo no encontrado' });
        }

        // Verificar si existe public_id en el reclamo
        if (!claim.public_id) {
            return res.status(400).json({ error: 'Missing required parameter - public_id' });
        }

        // Eliminar la imagen de Cloudinary utilizando el public_id
        await cloudinary.uploader.destroy(claim.public_id);

        // Eliminar el reclamo de la base de datos
        await Claim.findByIdAndDelete(id);

        res.json({ message: 'Reclamo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el reclamo' });
    }
};

export {
    getClaims,
    createClaim,
    getClaimById,
    updateClaimById,
    deleteClaimById
};
