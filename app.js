const express=require('express');
      app=express();
      swaggerUI=require('swagger-ui-express');
      YAML = require('yamljs');

      
//Initialize
    swaggerDocument = YAML.load('./api/swagger_api.yaml');      




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));




app.listen(8080)
