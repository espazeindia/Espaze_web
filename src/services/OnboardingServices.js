import requests from "./httpService";

const OnboardingServices = {
  //for seller

  OnboardingSeller: (body) => {
    return requests.post("/onboarding/seller/addBasicDetail", body);
  },

  EditSellerBasicDetails: (body) => {
    return requests.put("/onboarding/seller/editBasicDetails", body);
  },
};

export default OnboardingServices;
