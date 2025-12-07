export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  window.location.href = "/login";
};
