export interface JwtPayload {
  email: string;
  sub: number; // Assuming user ID is a number
}
