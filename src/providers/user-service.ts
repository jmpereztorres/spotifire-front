import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  getFires() {
    return this.http.get('http://192.168.171.47:8080/api/fires');
  }
}