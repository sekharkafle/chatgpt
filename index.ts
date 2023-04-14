import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import query from './interface/query';
import * as dotenv from 'dotenv';
export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  dotenv.config();
  if (event.body) {
    let body = JSON.parse(event.body)
    if (body.domain && body.question){
        
      const resp = await query(body.domain, body.question, null)
      return {
          statusCode: 200,
          body: JSON.stringify(resp),
      };
    }
  }
  return {
    statusCode: 400,
    body: `{'error':'Invalid input params. Required "domain" and "questions" as inputs.'}`,
  };
};

//handler(null, null).then(res=>console.log(res));
