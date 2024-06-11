import { createClaim } from "../controllers/reclamo_controller.js"

const reclamosModel = {

    //Obtener todos los reclamos
    async getAllclaims (){

        const peticion = await fetch ('http://localhost:4000/Reclamos')
        const claim = await peticion.json()

        return claim
    }
    ,

    //Crear un reclamo 
    async createClaimModel (newClaim){

        const url = 'http://localhost:4000/Reclamos'
        const peticion = await fetch (url,{
            method: "POST",
            body: JSON.stringify(newClaim),
            headers: {'Content-Type' : "aplication/json"}
        })
        const data = await peticion.json()
        return data

    },

    //Obtener un reclamo especifico
    async getClaimByIdModel (claimId){

        const response = await fetch(`http://localhost:4000/Reclamos/${claimId}`)
        if (!response.ok){
            return {error: "Claim no encontrado"}
        }
        const data = await response.json()
        return data
    },

    //Actualizar un reclamo
    async updateClaimModel (claimId,dataClaim){

        const url = `http://localhost:4000/Reclamos/${claimId}`
        const response = await fetch(url)
        if(!response.ok){
            return {error:"Claim no encontrado"}
        }else{
            const peticion = await fetch (url,{
                method : "PUT",
                body: JSON.stringify(dataClaim),
                headers: {'Content-Type':"aplication/json"}
            })
            const data = await peticion.json()
            return data
        }

    },


    //Eliminar un reclamo
    async deleteClaimModel(claimId){
        const url = `http://localhost:4000/Reclamos/${claimId}`
        const response = await fetch(url)
        if(!response.ok){
            return {error:"Claim no encontrado"}
        }else{
            const peticion = await fetch (url,{
                method : "DELETE"

            })
            await peticion.json()
            
            return {msg: "Claim eliminado correctamente"}
        }
    }
}

export default reclamosModel
