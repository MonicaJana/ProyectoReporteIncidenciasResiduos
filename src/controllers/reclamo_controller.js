import reclamosModel from "../models/reclamos.js";
import {v4 as uuiv4} from 'uuid'
import {v2 as cloudinary } from 'cloudinary'
import fs from "fs-extra"


const getClaim = async (req,res) => {

    try{
        const obtener = await reclamosModel.getAllclaims()
        res.status(200).json(obtener)
    } catch (error){
        console.log(error);
    }
}

const createClaim = async (req, res) => {


    const newClaimData = {
        id: uuiv4(),
        ...req.body
    }
    try{

        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'Claims'})

        newClaimData.imagen = cloudinaryResponse.secure_url

        newClaimData.public_id = cloudinaryResponse.public_id

        const creacion = await reclamosModel.createClaimModel(newClaimData)
        await fs.unlink(req.files.imagen.tempFilePath)
        res.status(201).json(creacion)

    } catch(error){
        res.status(500).json.error
    }
    
}

const getClaimByIdController = async (req,res) =>{

    try {
    
        const {id} = req.params

        const tour = await reclamosModel.getClaimByIdModel(id)
        const status = tour.error ? 404 : 200
    
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }

}

const updateClaimController = async (req,res) =>{

    const {id} = req.params

    try {

        const tour = await reclamosModel.updateClaimModel(id,req.body)
        const status = tour.error ? 404 : 200
        
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }

}

const deleteClaimController = async (req,res) =>{

    try {

        const {id} = req.params
        
        const tourFind = await reclamosModel.getClaimByIdModel(id)
        await cloudinary.uploader.destroy(tourFind.public_id)

        const tour = await reclamosModel.deleteClaimModel(id)
        const status = tour.error ? 404 : 200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }

}

export {
    getClaim,
    createClaim,
    getClaimByIdController,
    updateClaimController,
    deleteClaimController
}