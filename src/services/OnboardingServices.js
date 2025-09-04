import requests from "./httpService";

const OnboardingServices = {
  //for seller

  OnboardingSeller: (body) => {
    return requests.post("/onboarding/seller/addBasicDetail", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default OnboardingServices;
