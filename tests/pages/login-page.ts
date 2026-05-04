import { Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

export class LoginPage extends BasePage {
  readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Input
  readonly passwordField: Input

  constructor(page: Page) {
    super(page)
    this.signInButton = new Button(page.getByTestId('signIn-button'))
    this.usernameField = new Input(page.getByTestId('username-input'))
    this.passwordField = new Input(page.getByTestId('password-input'))
  }

  async open() {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string) {
    await this.usernameField.inputFill(username)
    await this.passwordField.inputFill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }

  async checkInnerComponents(): Promise<void> {
    await this.usernameField.checkInputVisible(true)
    await this.passwordField.checkInputVisible(true)
    await this.signInButton.checkVisible(true)
  }
}
