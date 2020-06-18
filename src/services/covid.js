// eslint-disable-next-line import/extensions
import '../../shim.js';
import crypto from 'crypto';
import axios from 'axios';
import Wallet from 'ethereumjs-wallet';
import api from '../utils/api';
import { getLocation } from './location';
import { getTempImageUrl } from './images';

const jaysonBrowserClient = require('jayson/lib/client/browser');
const enigma = require('enigma-js/lib/enigma-js.js');
const ethUtil = require('ethereumjs-util');

// eslint-disable-next-line camelcase
const JSON_RPC_Server = 'http://13.82.53.99:8080';

const callServer = function (request, callback) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  };
  axios
    .post(JSON_RPC_Server, JSON.parse(request), config)
    .then((response) => {
      if ('error' in response.data) {
        callback(response.data.error, null);
      } else {
        const text = JSON.stringify(response.data.result);
        callback(null, text);
      }
    })
    .catch(function (err) {
      callback({ code: -32000, message: err.message }, null);
    });
};

const client = jaysonBrowserClient(callServer, {});

function getClientKeys(seed = '') {
  if (seed === '') {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 9; i++) {
      // eslint-disable-next-line no-param-reassign
      seed += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  /* const random = forge.random.createInstance();
  random.seedFileSync = function (needed) {
    return forge.util.fillString(seed, needed);
  }; */

  console.log('Generating bytes ...');
  const privateKeyBytes = crypto.randomBytes(32);
  console.log('bytes generated');
  let privateKey = ethUtil.bufferToHex(privateKeyBytes);
  privateKey = privateKey.substr(2, privateKey.length - 2);
  console.log('Private key');
  console.log(privateKey);
  let publicKey = Wallet.fromPrivateKey(privateKeyBytes).getPublicKeyString();
  publicKey = publicKey.substr(2, publicKey.length - 2);
  console.log('Public key');
  console.log(publicKey);
  return { privateKey, publicKey };
}

async function getEncryptionKey(publicKey) {
  console.log('getting encryption key...');
  const getEncryptionKeyResult = await new Promise((resolve, reject) => {
    client.request('newTaskEncryptionKey', { userPubKey: publicKey }, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });
  console.log('Public Key before');
  console.log(publicKey);
  const { result, id } = getEncryptionKeyResult;
  const { taskPubKey, sig } = result;
  // ToDo: verify signature
  return taskPubKey;
}

function decrypt(taskPubKey, privateKey, enc_variable) {
  // Generate derived key from enclave public encryption key and user's private key
  const derivedKey = enigma.utils.getDerivedKey(taskPubKey, privateKey);
  // Decrypt function and ABI-encoded args
  const outputHex = enigma.utils.decryptMessage(derivedKey, enc_variable);
  const outputStr = enigma.utils.hexToAscii(outputHex);
  return JSON.parse(outputStr);
}

function encrypt(taskPubKey, privateKey, variable) {
  // Generate derived key from enclave public encryption key and user's private key
  const derivedKey = enigma.utils.getDerivedKey(taskPubKey, privateKey);
  // Encrypt function and ABI-encoded args
  return enigma.utils.encryptMessage(derivedKey, variable);
}

/**
 * Get Wallet Status
 * { id: String, firstName: String, lastName: String }
 * @param {*} userId
 * @param {*} data
 */
export async function submitQR(userId) {
  const { publicKey, privateKey } = getClientKeys();

  try {
    const taskPubKey = await getEncryptionKey(publicKey);
    const encryptedUserId = encrypt(taskPubKey, privateKey, userId);

    console.log('getWalletStatus');
    console.log('Sending as encrypted data');
    const payload = {
      userPubKey: publicKey,
      encryptedUserId,
    };
    console.log('Encrypted Payload');
    console.log(payload);
    const getWalletStatusResult = await new Promise((resolve, reject) => {
      client.request('getWalletStatus', payload, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
    console.log('Output');
    console.log(getWalletStatusResult);
    const { getWalletStatus } = getWalletStatusResult;

    if (getWalletStatus.status === 0) {
      console.log('getWalletStatusResult added successfully to the enclave.');
      // Decrypt
      console.log('Encrypted response');
      console.log(getWalletStatus.encryptedOutput);
      const decryptedData = decrypt(taskPubKey, privateKey, getWalletStatus.encryptedOutput);
      console.log('Decrypted Output');
      console.log(decryptedData);
      const photoUrl = await getTempImageUrl(userId);
      console.log('Photo Url');
      console.log(photoUrl);
      return {
        data: {
          ...decryptedData,
          firstName: decryptedData.first_name,
          lastName: decryptedData.last_name,
          photoUrl: photoUrl || decryptedData.photo_reference,
          resultStatus: decryptedData.status,
        },
      };
    }
    console.log('Something went wrong. Time to debug...');
  } catch (err) {
    console.log(err);
    // Or throw an error
    throw new Error(err);
  }

  // Or throw an error
  throw new Error('Unknown Error Occured');
}

/**
 * { id: String, firstName: String, lastName: String }
 * @param {*} userId
 * @param {*} data
 */
async function addWalletLocationReceipt(userId, data) {
  const { publicKey, privateKey } = getClientKeys();

  try {
    const taskPubKey = await getEncryptionKey(publicKey);
    const encryptedUserId = encrypt(taskPubKey, privateKey, userId);
    const encryptedData = encrypt(taskPubKey, privateKey, data);

    console.log('addWalletLocationReceipt');
    console.log('Sending as encrypted data');
    console.log(data);
    const payload = {
      userPubKey: publicKey,
      encryptedUserId,
      encryptedData,
    };
    console.log('Encrypted Payload');
    console.log(payload);
    const addWalletLocationReceiptResult = await new Promise((resolve, reject) => {
      client.request('addWalletLocationReceipt', payload, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
    console.log('Output');
    console.log(addWalletLocationReceiptResult);
    const { addWalletLocationReceipt: addWalletLocationReceiptData } = addWalletLocationReceiptResult;

    if (addWalletLocationReceiptData.status === 0) {
      console.log('AddWalletLocationReceipt successful.');
    } else {
      console.log('Something went wrong. Time to debug...');
    }
  } catch (err) {
    console.log(err);
    // Or throw an error
  }
}

export async function getOrganisationQR(id) {
  const response = await api.get(`organisation/${id}`);
  return response.data;
}

export async function subtractCount(id, deviceIdentifier, url) {
  const response = await api.put(`organisation/subtract/${id}`, { deviceIdentifier }, { baseURL: url });
  return response.data;
}

// NOTE: legacy organisation checkin/checkout

/* export async function checkIn(id, walletId) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/check_in`, {
    walletId,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}

export async function checkOut(id, walletId) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/check_out`, {
    walletId,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
} */

function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export async function checkIn(walletId) {
  const location = await getLocation();
  await addWalletLocationReceipt(
    walletId,
    JSON.stringify({
      lat: round(location.coords.latitude),
      lng: round(location.coords.longitude),
      created_at: Date.now(),
      scan_type: 'CheckIn',
    })
  );
}

export async function checkOut(walletId) {
  const location = await getLocation();
  await addWalletLocationReceipt(
    walletId,
    JSON.stringify({
      lat: round(location.coords.latitude),
      lng: round(location.coords.longitude),
      created_at: Date.now(),
      scan_type: 'CheckOut',
    })
  );
}

export async function checkInMobile(id, mobileNumber) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/mobile_check_in`, {
    mobileNumber,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}

export async function checkOutMobile(id, mobileNumber) {
  const location = await getLocation();
  const response = await api.post(`organisations/${id}/mobile_check_out`, {
    mobileNumber,
    lat: location.coords.latitude,
    long: location.coords.longitude,
  });
  return response.data;
}
