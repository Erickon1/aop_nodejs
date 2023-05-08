console.log('Loading function');
const getAccessKeyId = process.env.accessKeyId;
const getSecretAccessKey = process.env.secretAccessKey;
const myregion = process.env.AWS_REGION;

const aws = require('aws-sdk');
aws.config.update({region: myregion});
//aws.config.update({accessKeyId: 'mykey', secretAccessKey: 'mysecret', region: 'myregion'});
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = async (event, context) => {
  console.log("myregion", myregion);
  console.log("getAccessKeyId", getAccessKeyId);
  console.log("getSecretAccessKey", getSecretAccessKey);
  try {
    var list = await s3.listBuckets().promise();
    for (var i in list.Buckets) {
      console.log(list.Buckets[i].Name);
    }
    return "hola";
  } catch (error) {
    console.log("Error al listar los buckets");
    throw new Error(error);
  }
};
