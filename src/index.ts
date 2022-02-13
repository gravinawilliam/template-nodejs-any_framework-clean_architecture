import { bootstrap } from '@infra/bootstrap.infra';

import { Main } from './main';

async function start() {
  await bootstrap();
  new Main().start();
}
start();
