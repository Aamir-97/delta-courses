import { Injectable } from '@angular/core';
import { ApiRepositoryService } from './interceptors/api-repository.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiRepositoryServices: ApiRepositoryService) {}

  apiPath = 'profile';

  getProfileData() {
    let params = new HttpParams();
    return this.apiRepositoryServices.getAllDataRepository(
      this.apiPath,
      params
    );
  }

  getProfileDataById(id: number) {
    return this.apiRepositoryServices.getDataByIdRepository(this.apiPath, id);
  }

  updateProfileData(id: number, data: any) {
    return this.apiRepositoryServices.updateDataRepository(
      this.apiPath,
      id,
      data
    );
  }
}
