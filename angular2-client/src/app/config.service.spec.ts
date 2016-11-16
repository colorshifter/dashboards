/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { MockBackend } from '@angular/http/testing/mock_backend';
import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { async } from '@angular/core/testing/async';
import { ServerUrlService } from './server-url.service';
import { Config } from './Config';

describe('Service: Config', () => {

  let mockBackend: MockBackend;
  let serverUrlService: ServerUrlService;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        ServerUrlService,
        ConfigService
      ]
    });
  });

  beforeEach(inject([MockBackend, ServerUrlService], (_mockBackend_, _serverUrlService_) => {
    mockBackend = _mockBackend_;
    serverUrlService = _serverUrlService_;
  }));

  const givenLocalServer = () => {
    spyOn(serverUrlService, 'mapUrl').and.returnValue((config: Config) => {
      return 'http://localhost:' + config.port;
    });
  };

  const givenRemoteServer = () => {
    spyOn(serverUrlService, 'mapUrl').and.returnValue((config: Config) => {
      return config.serverUrl + ':' + config.port;
    });
  };

  describe('with success backend', () => {

    beforeEach(() => {
      let response = new Response(new ResponseOptions({
        body: `{
        "api": "https://your-webservice.com/api/",
        "serverUrl": "https://your-webservice.com",
        "port": 42
      }`
      }));
      mockBackend.connections.subscribe(connection => connection.mockRespond(response));
    });

    beforeEach(inject([ConfigService], (_configService_) => {
      configService = _configService_;
    }));

    it('creates an instance of Config', () => {
      expect(configService).toBeTruthy();
    });

    it('executes the input handler with the right API base', async(() => {
      configService
        .getApiBase()
        .subscribe((apiBase: string) => {
          expect(apiBase).toBe('https://your-webservice.com/api/');
        });
    }));

    it('executes the input handler with the right server local url', async(() => {
      givenLocalServer();

      configService
        .getServerUrl()
        .subscribe((serverUrl: string) => {
          expect(serverUrl).toBe('http://localhost:42');
        });
    }));

    it('executes the input handler with the right server remote url', async(() => {
      givenRemoteServer();

      configService
        .getServerUrl()
        .subscribe((serverUrl: string) => {
          expect(serverUrl).toBe('https://your-webservice.com:42');
        });
    }));

  });

  describe('with failing backend', () => {

    beforeEach(() => {
      mockBackend.connections.subscribe(connection => connection.mockError(new Error('Some network error')));
    });

    beforeEach(inject([ConfigService], (_configService_) => {
      configService = _configService_;
    }));

    it('executes the input handler with a null API base', () => {
      configService
        .getApiBase()
        .subscribe(null, (error: Error) => {
          expect(error.message).toContain('config.json');
        });
    });

  });

});
