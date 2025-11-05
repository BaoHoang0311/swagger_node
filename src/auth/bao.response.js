'use strict'
class BaoResponse{
    static Success = (message,data)=>{
        return {
            success:true,
            code :200,
            message: message, 
            metadata : data
        }
    }
    static Fail = (code,message,data)=>{
        return {
            success:false,
            code:code,
            message : message,
            metadata : data 
        }
    }
    static PagedList = (data, limit,page)=>{
        return {
            TotalCount: data.length,
            Limit: limit,
            Page: page,
            Data: data
        }
    }
}
module.exports = BaoResponse;