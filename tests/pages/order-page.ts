import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { NotFoundPage } from './order-not-found-page'
import { OrderDetailsPage } from './order-details-page'
import { Input } from '../atoms/Input'

export class OrderPage extends BasePage {
  readonly title: Locator
  readonly statusButton: Button
  readonly createOrderButton: Button
  readonly nameInput: Input
  readonly phoneInput: Input
  readonly commentInput: Input
  readonly confirmationPopup: Locator
  readonly logoutButton: Button

  // Search popup
  protected readonly searchPopup: Locator
  readonly searchInput: Input
  readonly searchButton: Button

  constructor(page: Page) {
    super(page)
    this.title = page.locator('h2')
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.createOrderButton = new Button(page.getByTestId('createOrder-button'))
    this.nameInput = new Input(page.getByTestId('username-input'))
    this.phoneInput = new Input (page.getByTestId('phone-input'))
    this.commentInput = new Input (page.getByTestId('comment-input'))
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page.getByTestId('logout-button'))

    // Search popup
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = new Input(this.searchPopup.getByTestId('searchOrder-input'))
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }

  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await this.statusButton.checkVisible(true)
    await this.createOrderButton.checkVisible(true)
    await this.nameInput.checkInputVisible(true)
    await this.phoneInput.checkInputVisible(true)
    await this.commentInput.checkInputVisible(true)
  }

  async createOrder(): Promise<void> {
    await this.nameInput.inputFill(faker.person.firstName())
    await this.phoneInput.inputFill(faker.phone.number())
    await this.commentInput.inputFill(faker.lorem.sentence(5))
    await this.createOrderButton.click()
    await expect(this.confirmationPopup).toBeVisible()
  }

  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.inputFill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }

  async checkOrderFound(id: number): Promise<OrderDetailsPage> {
    await this.statusButton.click()
    await this.searchInput.inputFill(`${id}`)
    await this.searchButton.click()
    return new OrderDetailsPage(this.page)
  }
}
