import { danger, fail, warn } from 'danger';

class DangerProvider {
  private readonly paths = {
    folders: {
      controller: {
        development: '../src/application/controllers',
        documentation: '../src/domain/controllers'
      },
      useCase: {
        development: '../src/application/use-cases'
      }
    },
    controllers: [
      {
        moduleName: 'health',
        fileNames: ['health']
      }
    ],
    useCases: [
      {
        moduleName: 'health',
        fileNames: ['health']
      }
    ]
  };

  public execute(): void {
    this.verifyDocWithControllers();
    this.verifyTestsWithControllers();
    this.verifyTestsWithService();
  }

  private verifyDocWithControllers(): void {
    for (const module of this.paths.controllers) {
      for (const fileName of module.fileNames) {
        const controllerFile = danger.git.fileMatch(
          `${this.paths.folders.controller.development}/${module.moduleName}/${fileName}.controller.ts`
        );
        const documentationFile = danger.git.fileMatch(
          `${this.paths.folders.controller.documentation}/${module.moduleName}/__docs__/${fileName}.oas.yml`
        );

        if ((controllerFile.edited || controllerFile.created) && !documentationFile.edited) {
          fail(
            `:exclamation: Houveram mudanças no arquivo ${fileName}.controller.ts, mas a documentação do arquivo ${fileName}.oas.yml não foi alterada!`
          );
        }
      }
    }
  }

  private verifyTestsWithControllers(): void {
    for (const module of this.paths.controllers) {
      for (const fileName of module.fileNames) {
        const controllerFile = danger.git.fileMatch(
          `${this.paths.folders.controller.development}/${module.moduleName}/${fileName}.controller.ts`
        );
        const controllerTestFile = danger.git.fileMatch(
          `${this.paths.folders.controller.development}/${module.moduleName}/__tests__/${fileName}.controller.spec.ts`
        );

        if (controllerFile.edited && !controllerTestFile.edited) {
          warn(
            `Existem modificações no arquivo ${fileName}.controller.ts, mas não existem modificações no arquivo ${fileName}.controller.spec.ts de teste. Isto é OK desde que o código esteja sendo refatorado.`
          );
        }
      }
    }
  }

  private verifyTestsWithService(): void {
    for (const module of this.paths.controllers) {
      for (const fileName of module.fileNames) {
        const controllerFile = danger.git.fileMatch(
          `${this.paths.folders.useCase.development}/${module.moduleName}/${fileName}.use-case.ts`
        );
        const controllerTestFile = danger.git.fileMatch(
          `${this.paths.folders.useCase.development}/${module.moduleName}/__tests__/${fileName}.use-case.spec.ts`
        );

        if (controllerFile.edited && !controllerTestFile.edited) {
          warn(
            `Existem modificações no arquivo ${fileName}.use-case.ts, mas não existem modificações no arquivo ${fileName}.use-case.spec.ts de teste. Isto é OK desde que o código esteja sendo refatorado.`
          );
        }
      }
    }
  }
}

export default new DangerProvider();
