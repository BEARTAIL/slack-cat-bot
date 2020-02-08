import * as rp from 'request-promise';
import * as lambda from 'aws-lambda';
import { ResponseBody } from './types';

export async function postImage(imageUrl: string, text?: string): Promise<ResponseBody> {
  try {
    const options = optionsWithAttachment(imageUrl, text);
    const res = await rp(options);

    console.log(`Slack api result: ${res}`);

    return {
      statusCode: 200,
      message: res,
    };
  } catch (e) {
    console.log(`Error occurred in slack api: ${e}`);

    return {
      statusCode: e.statusCode,
      message: e.statusMessage,
    };
  }
}

function optionsWithAttachment(imageUrl: string, text: string = ''): rp.OptionsWithUrl {
  const body = {
    text,
    attachments: [{
      image_url: imageUrl,
    }],
  };

  return {
    method: 'POST',
    url: process.env.SKACK_INCOMING_WEBHOOK_URL ?? '',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

export function apiGatewayProxyResult(
  statusCode: number,
  message: string,
): lambda.APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-type': 'text/plain',
      'X-Slack-No-Retry': 1,
    },
    body: message,
  };
}
