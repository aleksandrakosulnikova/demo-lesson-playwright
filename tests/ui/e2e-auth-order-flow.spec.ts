import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker'

test('Login test + order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
})

test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.createOrder()
})

test('Validation test on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.inputFill('1')
  await orderPage.phoneInput.inputFill(faker.phone.number())
  await orderPage.createOrderButton.checkEnable(false)

  await orderPage.nameInput.inputFill(faker.person.firstName())
  await orderPage.phoneInput.inputFill('2')
  await orderPage.createOrderButton.checkEnable(false)

  await orderPage.nameInput.inputFill(faker.person.firstName())
  await orderPage.phoneInput.inputFill(faker.phone.number())
  await orderPage.createOrderButton.checkEnable(true)
})

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.checkFooterComponents()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterComponents()
  await orderPage.logoutButton.click()
  await loginPage.checkInnerComponents()
})
