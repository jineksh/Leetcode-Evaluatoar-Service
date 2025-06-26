
import { createSubmissonDto } from "../dtos/submissonDto";
import { Request , Response} from "express";

export const createSubmissonController = async(req : Request , res : Response)=>{

    try{
        const submisson = req.body as createSubmissonDto;

        res.status(201).json({
            message : 'Recive the data',
            data : submisson
        })
    }catch(error){
        res.status(201).json({
            message : 'Not Recive the data',
            data : {}
        })
    }
}

