import React, { AsyncStorage } from "react";

// const ACCESS_TOKEN = "access_token";

class Auth {
  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.log("something went wrong");
    }
  }
}

export default Auth;
