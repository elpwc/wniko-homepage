//@ts-ignore
const { generateService } = require('@umijs/openapi');
//import appconfig from './appconfig';

generateService({
  requestLibPath: "import request from '../../utils/request'",
  schemaPath: `http://localhost:8001/api-json`,
  serversPath: './src/services/',
  hook: {
    customFunctionName: (data: any) => {
      return data.operationId + data.tags[0];
    },
  },
});
