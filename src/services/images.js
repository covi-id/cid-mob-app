const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const s3BucketName = 'coviid-enclave-assets-dev';
const s3Expires = 1800; // seconds
const s3AccessKeyId = 'AKIAVA42VALQLKPHWWZL';
const s3SecretAccessKey = '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';
const s3Region = 'eu-west-2';

const s3 = new AWS.S3({
  accessKeyId: s3AccessKeyId,
  secretAccessKey: s3SecretAccessKey,
  region: s3Region,
});

export async function getTempImageUrl(fileName) {
  const params = {
    Bucket: s3BucketName,
    Key: `${fileName}.png`,
    Expires: 60 * s3Expires,
  };
  try {
    console.log('Sending Params');
    console.log(params);
    const url = await s3.getSignedUrlPromise('GetObject', params);
    if (!url) {
      throw new Error('Object not found');
    }
    console.log(url);
    return url;
  } catch (error) {
    console.log('error here');
    console.warn(error);
  }
  console.log('now we here');
  return undefined;
}
