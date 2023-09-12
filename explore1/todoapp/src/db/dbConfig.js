import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.enc.MONGO_LINK)
        const connection = mongoose.connection

        connection.on('connected', () =>{
            console.log('hehe yeah boi');
        }
        
        )
        connection.on('error', (err)=>{
            console.log('Error',err);
        })
    } catch (error) {
        console.log(error);
    }
}