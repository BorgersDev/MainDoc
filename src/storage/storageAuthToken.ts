import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_AUTHORIZATION_64, AUTH_COMPANY_TOKEN_STORAGE, AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export async function saveAuthTokenStorage( token: string ) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
    } catch (error) {
        throw error;
    }
}

export const getAuthTokenStorage = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    return token;
}

export const removeAuthTokenStorage = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

export async function saveCompanyTokenStorage( companyToken: string ) {
    try {
        await AsyncStorage.setItem(AUTH_COMPANY_TOKEN_STORAGE, companyToken);
    } catch (error) {
        throw error;
    }
}

export const getAuthCompanyTokenStorage = async () => {
    const token = await AsyncStorage.getItem(AUTH_COMPANY_TOKEN_STORAGE);
    return token;
}

export const removeAuthCompanyTokenStorage = async () => {
    await AsyncStorage.removeItem(AUTH_COMPANY_TOKEN_STORAGE);
}

export const saveAuthorization64Storage = async ( authorization: string ) => {
    try {
        await AsyncStorage.setItem(AUTH_AUTHORIZATION_64, authorization);
    } catch (error) {
        throw error;
    }
}

export const getAuthorization64Storage = async () => {
    const token = await AsyncStorage.getItem(AUTH_AUTHORIZATION_64);
    return token;
}

export const removeAuthorization64Storage = async () => {
    await AsyncStorage.removeItem(AUTH_AUTHORIZATION_64);
}