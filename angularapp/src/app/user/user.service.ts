import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userApiUrl = "/user";

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>(this.userApiUrl);
    }

    addUser(user: User) {
        return this.http.post(this.userApiUrl, user);
    }

    editUser(user: User) {
        return this.http.put(this.userApiUrl + "/" + user.id, user);
    }

    deleteUser(id: string) {
        return this.http.delete(this.userApiUrl + "/" + id);
    }
}
