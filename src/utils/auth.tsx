import jwt_decode from "jwt-decode";

export function decodeToken(token: string): any | null {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
