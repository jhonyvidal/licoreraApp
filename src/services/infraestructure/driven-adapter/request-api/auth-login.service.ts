import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/store/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  private url = environment.apiUrlV2;
  private refreshTokenUrl = `${this.url}api/v2/refresh`;
 
  constructor(private http: HttpClient, private userService:UserService,) { }

  async getRefreshToken() {
    try {
      const data = await this.userService.getUserData();
      // console.log('Api token: ', data.refresh_token);
      return data.refresh_token;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return 'Error al obtener los datos del usuario';
    }
  }
  
  refreshToken(): Observable<any> {
    return from(this.getRefreshToken()).pipe(
      mergeMap(refreshToken => {
        console.log("refresh token:", refreshToken);
        return this.http.post(this.refreshTokenUrl, { refresh_token: refreshToken });
      })
    );
  }
}