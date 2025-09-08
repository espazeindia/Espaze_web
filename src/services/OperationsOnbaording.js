import requests from "./httpService";

const OperationsOnboardingForm = {
  
  OperationsOnboardingForm: (body) => {
    
    const token = localStorage.getItem("jwtToken"); 
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    return requests.post("/onboarding/operational_guy/register", body, { headers });
  },
};

export default OperationsOnboardingForm;