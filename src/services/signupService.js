import { http } from "./httpService";

export const signUpService = (data) => {
return http.post("user/register" , data)
}