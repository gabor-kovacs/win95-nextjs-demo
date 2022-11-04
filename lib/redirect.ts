import * as React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const redirect = () => {
  const router = useRouter();
  const verify = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return null;
    } else {
      try {
        const response = await axios.post("/api/verify", { token });
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error?.response?.data?.error === "invalid token") {
            router.push("/login");
          }
        }
      }
    }
  };

  React.useLayoutEffect(() => {
    verify();
  }, []);
};

export default redirect;
