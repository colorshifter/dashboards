import { Injectable } from '@angular/core';
import { Config } from './Config';

@Injectable()
export class ServerUrlService {

  mapUrl(): (config: Config) => string {
    return (config: Config) => {
      let host: string = this.isLocal() ? 'http://localhost' : config.serverUrl;
      return host + ':' + config.port;
    };
  }

  private isLocal() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

}
