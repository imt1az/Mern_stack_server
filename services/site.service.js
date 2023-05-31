const httpStatus = require("http-status");
const { ApiError } = require("../middleWare/apiError");
const { Site } = require("../models/site")


const postSiteArgs = async(req)=>{
      try{
          const site = new Site({
            ...req.body
          });
          await site.save();
          return site;
      }
      catch(error){
        throw error
      }
}

const getSiteArgs = async(req)=>{
    try{
        const site = await Site.find({})

        if(!site){
            throw new ApiError(httpStatus.NOT_FOUND,'Site Not Found')
        }

        return site[0];
    }
    catch(error){
      throw error
    }
}

const updateSiteArgs = async(req)=>{
    try{
        const site = await Site.findOneAndUpdate(
            {_id:req.body._id},
            {"$set": req.body},
            {new:true}
        )
        if(!site){
            throw new ApiError(httpStatus.NOT_FOUND,'Site Not Found')
        }

        return site ;
    }
    catch(error){
      throw error
    }
}
 


module.exports ={postSiteArgs,getSiteArgs,updateSiteArgs}