import claimsModel from "../models/claims.js";
import {v4 as uuiv4} from 'uuid'
import {v2 as cloudinary } from 'cloudinary'
import fs from "fs-extra"


const getClaim = async (req,res) => {

    try{
        const obtener = await claimsModel.getAllclaims()
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

        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.Images.tempFilePath,{folder:'Claims'})

        newClaimData.Images = cloudinaryResponse.secure_url

        newClaimData.public_id = cloudinaryResponse.public_id

        const creacion = await claimsModel.createClaimModel(newClaimData)
        await fs.unlink(req.files.Images.tempFilePath)
        res.status(201).json(creacion)

    } catch(error){
        res.status(500).json.error
    }
    
} 

const getClaimByIdController = async (req,res) =>{

    try {
    
        const {id} = req.params

        const tour = await claimsModel.getClaimByIdModel(id)
        const status = tour.error ? 404 : 200
    
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }

}

const updateClaimController = async (req,res) =>{

    const newClaimData = {
        id: uuiv4(),
        ...req.body
    }
    
    try {

        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.Images.tempFilePath,{folder:'Claims'})

        newClaimData.Images = cloudinaryResponse.secure_url

        newClaimData.public_id = cloudinaryResponse.public_id

        const {id} = req.params
        const claim = await claimsModel.updateClaimModel(id,newClaimData)
        await fs.unlink(req.files.Images.tempFilePath)

        const status = claim.error ? 404 : 200
        res.status(status).json(claim)
    } catch (error) {
        res.status(500).json.error
    }
}

const deleteClaimController = async (req,res) =>{

    try {

        const {id} = req.params
        
        const tourFind = await claimsModel.getClaimByIdModel(id)
        await cloudinary.uploader.destroy(tourFind.public_id)

        const tour = await claimsModel.deleteClaimModel(id)
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