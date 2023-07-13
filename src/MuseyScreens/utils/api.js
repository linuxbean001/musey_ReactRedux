const BASE_URL = "http://localhost:8000"; // Update with your API base URL

export const Register = async (userData) => {
  const response = await fetch(`${BASE_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

export const loginData = async (userData) => {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "");
  urlencoded.append("username", userData.username);
  urlencoded.append("password", userData.password);
  urlencoded.append("scope", "");
  urlencoded.append("client_id", "");
  urlencoded.append("client_secret", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(`${BASE_URL}/login/`, requestOptions);
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData.message);
  }
  return response.json();
};

export const ForgotData = async (userData) => {
  const params = userData.email;

  const url = `${BASE_URL}/forgetpassword/?email=${encodeURIComponent(params)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
