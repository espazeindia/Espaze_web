import requests from "./httpService";
import { validate } from "../utils/jwt-verify";
import Cookies from "js-cookie";

const getValidCookie = () => {
  const cookie = Cookies.get("EspazeCookie");
  if (cookie === undefined) {
    return "Cookie not found";
  }
  const payload = validate(cookie);
  if (payload != null) {
    return cookie;
  }

  return " cookie error";
};

const OnboardingServices = {

    //for seller
    
    OnboardingSeller : async (body) => {
        const token = getValidCookie();
        if (token != "Cookie not found" || token != "cookie error") {
          return requests.post("/onboarding/seller/addBasicDetail", body, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error("cookie error");
        }
      },
  
};

export default OnboardingServices;
