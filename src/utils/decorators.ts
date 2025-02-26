import { test } from '@playwright/test';

/**
 * Функция декоратор, оборачивающая тело функции запроса в test.step.
 * @param stepName - Название степа.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function Step(stepName?: string): MethodDecorator {
  return function decorator(target: TFunction): unknown {
    return function replacementMethod(...args: any) {
      return test.step(stepName, async () => {
        return target.call(this, ...args);
      });
    };
  };
}
