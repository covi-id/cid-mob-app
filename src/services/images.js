// const AWS = require('aws-sdk/dist/aws-sdk-react-native');

// const s3 = new AWS.S3();
// const s3AccessKeyId = 'AKIAVA42VALQLKPHWWZL';
// const s3SecretAccessKey = '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';
const s3BucketName = 'coviid-enclave-assets-dev';
// const s3Region = 'eu-west-2';
const s3Expires = 1800; // seconds

export async function getTempImageUrl(fileName) {
  const params = {
    Bucket: s3BucketName,
    Key: `${fileName}.png`,
    Expires: 60 * s3Expires,
  };
  try {
    /* const url = await s3.getSignedUrlPromise('GetObject', params);
    if (!url) {
      throw new Error('Object not found');
    } */
    // const url = '';
    return '';
  } catch (error) {
    console.warn(error);
  }
  return '';
}
