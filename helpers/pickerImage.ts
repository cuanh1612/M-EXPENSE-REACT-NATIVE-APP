import * as ImagePicker from 'expo-image-picker'

export const openImagePicker = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true
    });
    return pickerResult
}

export const openImageByCamera = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
        base64: true
    });
    return pickerResult
}