import { HealthController } from '@application/controllers/health/health.controller';
import { IHealthController } from '@domain/controllers/health/health.controller';

export const makeHealthController = (): IHealthController => {
  return new HealthController();
};
