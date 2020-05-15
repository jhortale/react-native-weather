import AsyncStorage from "@react-native-community/async-storage";

// connect Database
export const storeWeather = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    console.log(JSON.parse(jsonValue));
    await setWeather(JSON.parse(jsonValue));
  } catch (e) {
    // saving error
  }
};

export const getWeather = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
