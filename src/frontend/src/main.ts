import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//inicia a aplicacao e direciona para o app.module.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
