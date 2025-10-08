export const authorize = async (event) => {
  // console.log("Authorizing request:", event);

  // Return a response that always denies access
  return {
    isAuthorized: false,
    context: {
      reason: "Access temporarily disabled",
    },
  };
};