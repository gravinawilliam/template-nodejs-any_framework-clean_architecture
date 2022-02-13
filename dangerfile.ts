import { danger, fail, markdown, message, warn } from 'danger';

const serviceFiles = danger.git.fileMatch('src/services/**');
const serviceTestFiles = danger.git.fileMatch('src/__tests__/services/**');

const controllerFiles = danger.git.fileMatch('src/controllers/**');
const routeFiles = danger.git.fileMatch('src/routes/**');
const documentation = danger.git.fileMatch('auth.apib');

const changelog = danger.git.fileMatch('CHANGELOG.md');

const middlewares = danger.git.fileMatch('src/middlewares/**');

// if (serviceFiles.edited && !serviceTestFiles.edited) {
//   warn(
//     'Existem modificações em arquivos de serviço, mas não existem modificações em arquivos de teste. Isto é OK desde que o código esteja sendo refatorado.'
//   );
// }

// if ((controllerFiles.edited || routeFiles.edited) && !documentation.edited) {
//   fail(':exclamation: Houveram mudanças em arquivos de controllers/rotas, mas a documentação não foi alterada!');
// }

if (!changelog.edited) {
  warn(
    'Não foram detectadas mudanças no changelog. Por favor, verifique as nossas regras sobre CHANGELOG [aqui](https://google.com).'
  );
}

console.log(danger.github.pr);

// if(danger.github.pr.body.length <= 10) {
//     fail("Por favor descreva melhor a sua PR!");
// }

// if((danger.github.pr.additions + danger.github.pr.deletions) > 0) {
//     warn(":exclamation: Wow, essa PR parece grande! _Se ela contém mais de uma modificação, tenta separá-las em PRs menores para facilitar o review_");
// }

// if(danger.github.pr.requested_reviewers.length === 0) {
//     warn(":exclamation: Não se esqueça de marcar alguém para revisar esta PR!");
// }

if (middlewares.edited) {
  message(
    'É recomendado marcar o @eduardotkoller para fazer o review desta PR, dado que houveram mudanças em arquivos de _middleware_'
  );
}
