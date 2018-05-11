package com.reporttool.datasources.service;

import com.reporttool.config.PropertyConfig;
import com.reporttool.domain.exeption.EncryptionException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.SecretKey;
import java.security.InvalidKeyException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Slf4j
public class CipherService {

    private final PropertyConfig.EncryptionProperties encryptionProperties;
    private final Cipher cipher;
    private final SecretKey secretKey;

    public String encrypt(String data) throws EncryptionException {

        try {
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        } catch (InvalidKeyException e) {
            log.warn("Wrong secret code was specified during Cipher's encrypt mode initialization");
            throw new EncryptionException(e);
        }

        // Encrypt the data
        try {
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (BadPaddingException e) {
            log.warn("Wrong padding was specified during encryption");
            throw new EncryptionException(e);
        } catch (IllegalBlockSizeException e) {
            log.warn("Illegal block size has occurred during encryption");
            throw new EncryptionException(e);
        }
    }

    public String decrypt(String data) throws EncryptionException {

        try {
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
        } catch (InvalidKeyException e) {
            log.warn("Wrong secret code was specified during Cipher's decrypt mode initialization");
            throw new EncryptionException(e);
        }

        // Decrypt the data
        try {
            byte[] decodedBytes = Base64.getDecoder().decode(data);
            return new String(cipher.doFinal(decodedBytes));
        } catch (BadPaddingException e) {
            log.warn("Wrong padding was specified during decryption");
            throw new EncryptionException(e);
        } catch (IllegalBlockSizeException e) {
            log.warn("Illegal block size has occurred during decryption");
            throw new EncryptionException(e);
        }
    }
}
