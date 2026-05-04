import { expect, Locator } from '@playwright/test'

export class Input {
  readonly inpLocator: Locator

  constructor(inpLocator: Locator) {
    this.inpLocator = inpLocator
  }

  async checkInputVisible(visible: boolean): Promise<void> {
    await expect(this.inpLocator).toBeVisible({ visible })
  }

  async inputFill(value: string): Promise<void> {
    await this.inpLocator.fill(value);
  }

}