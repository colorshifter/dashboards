import { Injectable } from '@angular/core';
import { Config } from './Config';
import { environment } from './environments/environment';

@Injectable()
export class ServerUrlService {

  mapUrl(): (config: Config) => string {
    return (config: Config) => {
      let host: string = environment.production ? config.serverUrl : 'http://localhost';
      return host + ':' + config.port;
    };
  }

}
