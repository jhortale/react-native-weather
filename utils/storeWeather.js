import AsyncStorage from "@react-native-community/async-storage";

// connect Database
export const storeWeather = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
    console.log("data recorded");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};

export const getWeather = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    console.log("data retrieved");
    if (jsonValue === undefined) console.log("No Data Retrieved");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};
