const express=require('express');
      app=express();
      swaggerUI=require('swagger-ui-express');
      YAML = require('yamljs');
      port= 8080 || process.env.PORT
      
//Initialize
    swaggerDocument = YAML.load('./api/swagger_api.yaml');      




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));




app.listen(process.env.PORT || 5000)
