// decryption.js

// Decryption function
function decryptSensorValues(encryptedSensorValues, encryptedKeysString, preSharedKey) {
    // Split the comma-separated string of encrypted keys
    var encryptedKeys = encryptedKeysString.split(",");

    // Array to store decrypted sensor values
    var decryptedSensorValues = [];

    // Decrypt each sensor value
    for (var i = 0; i < encryptedSensorValues.length; i++) {
        var encryptedSensorValue = encryptedSensorValues[i];
        var encryptedKey = parseInt(encryptedKeys[i]);

        // Decrypt key using XOR with pre-shared key
        var decryptedKey = encryptedKey ^ preSharedKey;

        // Decrypt sensor data using XOR with decrypted key
        var decryptedSensorValue = encryptedSensorValue ^ decryptedKey;

        // Add the decrypted sensor value to the array
        decryptedSensorValues.push(decryptedSensorValue);
    }

    // Return the array of decrypted sensor values
    return decryptedSensorValues;
}

// Export the decryption function
module.exports = decryptSensorValues;
