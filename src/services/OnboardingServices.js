import requests from "./httpService";

const OnboardingServices = {
  //for seller

  OnboardingSeller: (body) => {
    return requests.post("/onboarding/seller/addBasicDetail", body);
  },
};

export default OnboardingServices;
