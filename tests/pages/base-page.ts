import { expect, Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class BasePage {
  readonly page: Page
  readonly footer: Locator
  readonly langBtnRu: Button
  readonly langBtnEn: Button
  readonly navFooter: Locator

  constructor(page: Page) {
    this.page = page
    this.footer = page.locator('.Footer')
    this.langBtnRu = new Button(this.footer.locator('.language__button').nth(1))
    this.langBtnEn = new Button(this.footer.locator('.language__button').nth(0))
    this.navFooter = this.footer.locator('.nav-footer')
  }

  async checkFooterComponents(): Promise<void> {
    await expect(this.navFooter).toBeVisible()
    await this.langBtnRu.checkVisible(true)
    await this.langBtnEn.checkVisible(true)
  }
}
