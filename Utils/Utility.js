global.saveImageMultiPart=function(image,fileName,next){
    image.mv('./resources/upload/'+fileName, function(err) {
        if(err){
            next(err)
        }
    });
};
