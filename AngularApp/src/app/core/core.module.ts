
import {
  NgModule,
  Optional, SkipSelf
} from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
