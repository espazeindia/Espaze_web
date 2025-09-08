import requests from "./httpService";

const OnboardingServices = {
  //for seller

  OnboardingSeller: (body) => {
    return requests.post("/onboarding/seller/addBasicDetail", body);
  },
  
  GetSellerDetails: () => {
    return requests.get("/onboarding/seller/getBasicDetails");
  },
};

export default OnboardingServices;
