import { PermissionsAndroid } from 'react-native';
import string from '../localization/string';

export const requestExternalStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: string.PermissionRequired,
                message: string.PermissionWriteExternalStorageRequired
            },
        );
        return granted;
    } catch (err) {
        console.error('Failed to request permission ', err);
        return null;
    }
};
