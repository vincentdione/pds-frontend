import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  verifyToken(token: string): boolean {
    // Implement your token verification logic here
    // Example: return !this.isTokenExpired(token);
    return true; // Placeholder, replace with actual logic
  }

  // You can add a method to check if the token is expired
  private isTokenExpired(token: string): boolean {
    // Implement your logic to check if the token is expired
    // Example: return jwt_decode(token).exp < Date.now() / 1000;
    return false; // Placeholder, replace with actual logic
  }
}
