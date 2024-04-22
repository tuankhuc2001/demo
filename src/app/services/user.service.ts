import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUser, objectApi } from '../constant/api';
import { ILoginResponse } from '../types/login';
import { IAddUser, IGetUser, IUpdateUser, IUser, IUserRequest, IUserRequestUpdate } from '../types/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUser(): IUser {
        const userDataString = localStorage.getItem('user')
        return userDataString ? JSON.parse(userDataString) : null;
    }

    setUser(value: ILoginResponse): void {
        localStorage.setItem('user', JSON.stringify({
            id: value.id,
            phone: value.phone,
            email: value.email,
            fullname: value.fullname,
            avatar: value.avatar,
            role: value.role,
            token: value.token,
            refreshToken: value.refreshToken
        }));
    }

    header(refreshToken?: string): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken ? refreshToken : localStorage.getItem("token")}`
        });
        return headers
    }

    headerUpload(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        });
        return headers
    }

    login(userName: string, password: string): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`http://localhost:8080/api/v1/auth/signin`, { phone: userName, password })
    }

    getAllAccount(): Observable<IGetUser> {
        const headers = this.header()
        return this.http.get<IGetUser>(`${apiUser.getAllAccount}`, {headers})
    }

    addAccount(accountRequest: IUserRequest): Observable<IAddUser> {
        const headers = this.header()
        return this.http.post<IAddUser>(`${apiUser.addAccount}`, accountRequest, {headers})
    }

    updateAccount(idUser: number, accountRequest: IUserRequestUpdate): Observable<IUpdateUser> {
        const headers = this.header()   
        return this.http.put<IUpdateUser>(`${apiUser.updateAccount}${idUser}`, accountRequest, {headers})
    }

    loginRefreshToken(refreshToken: string) : Observable<ILoginResponse> {
        const headers = this.header(refreshToken)
        return this.http.post<ILoginResponse>(`${objectApi.loginRefreshToken}`,{token:refreshToken}, {headers})
    }
    
}
