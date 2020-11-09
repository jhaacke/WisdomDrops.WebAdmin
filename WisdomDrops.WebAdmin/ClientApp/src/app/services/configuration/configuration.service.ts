import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable(({
  providedIn: 'root'
}) as any)
export class ConfigurationService {

  constructor() { }

  get apiUrl(): string {
    return environment.apiUrl;
  }
}
