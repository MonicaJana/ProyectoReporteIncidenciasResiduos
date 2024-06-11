import bcrypt from "bcrypt"

const schedulesModels ={

    async getAllSchedules (){
        const url = 'http://localhost:4000/schedules'
        const peticion = await fetch(url)
        const schedules = await peticion.json()

        return schedules
    },

    async createSchedule(newSchedule){

        const url = 'http://localhost:4000/schedules'

        const peticion= await fetch(url,{
            method:"POST",
            body: JSON.stringify(newSchedule),
            headers: {'Content-Type':"aplication/json"}
        })

        const data= await peticion.json()
        return data
    },

    async getScheduleByAdress(address){

        const response = await fetch(`http://localhost:4000/schedules`)
        
        if(!response.ok){
            return{ error:"Zona no encontrada"}
        }
        const data= await response.json()
         // Filtrar los datos para encontrar el que coincida con la dirección
        const schedule = data.find(item => item.address === address.toLowerCase());

         if (!schedule) {
             return { error: "Dirección no encontrada" };
         }

        return schedule;
    },

    async updateScheduleModel(scheduleId, dataSchedule){
        const url = `http://localhost:4000/schedules/${scheduleId}`
        const response = await fetch(url)

        if (!response.ok) {
            return{error:"Horario no encontado"}
        } else {
            const peticion= await fetch(url,{
                method:"PUT",
                body: JSON.stringify(dataSchedule),
                headers:{'Content-type':"application/json"}
            })

            const data=await peticion.json()
            return data 
        }
    },

    async deleteScheduleModel(scheduleId){

        const url = `http://localhost:4000/schedules/${scheduleId}`
        const response = await fetch(url)
        if (!response.ok) {
            return{error:"Horario no encontado"}
        } else {
            const peticion= await fetch(url,{
                method:"DELETE",
            })
            await peticion.json()
            return {msg:"Horario eliminado correctamente"} 
        }
    }
}

export default schedulesModels