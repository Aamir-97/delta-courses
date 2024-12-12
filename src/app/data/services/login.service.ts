import { ApiRepositoryService } from './interceptors/api-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiRepository: ApiRepositoryService) {}
  apiPath: string = 'login';

  login(data: any) {
    return this.apiRepository.saveDataRepository(this.apiPath, data);
  }
}
