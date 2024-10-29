const { Builder, By, Key, until } = require('selenium-webdriver')
const { expect } = require('chai')

describe('UI Testing using Selenium', function() {
    this.timeout(30000) // set timeout for mocha tests

    let driver;

        //inisialisasi webdriver sebelum menjalankan test case
        before(async function() {
            driver = await new Builder().forBrowser('firefox').build() // Bisa diganti firefox untuk firefox
        })

        // Tutup webdrive setelah semua test selesai
        after(async function() {
            await driver.quit()
        })

        it('should load the login page', async function() {
            await driver.get('C://Users/suxks/ui_dari_html/login.html') // ubah path sesuai lokasi file login.html

            const title = await driver.getTitle()
            expect(title).to.equal('Login Page')
        })

        it('should input username and password', async function() {
            await driver.findElement(By.id('username')).sendKeys('testuser')
            await driver.findElement(By.id('password')).sendKeys('password123')
            const usernameValue = await driver.findElement(By.id('username')).getAttribute('value')
            const passwordValue = await driver.findElement(By.id('password')).getAttribute('value')
            expect(usernameValue).to.equal('testuser')
            expect(passwordValue).to.equal('password123')
        })

        it('should click the login button', async function() {
            await driver.findElement(By.id('loginButton')).click()
            // Lakukan tindakan lebih lanjut, seperti validasi login (ini disimulasikan di sini)
            // misal :  validasi pesan error jika login gagal atau redirect halaman jika berhasil
            await driver.findElement(By.id('username')).clear()
            await driver.findElement(By.id('username')).sendKeys('incorrect credentials')
            await driver.findElement(By.id('password')).clear()
            await driver.findElement(By.id('password')).sendKeys('incorrect credentials')

            await driver.findElement(By.id('loginButton')).click()

            const invalidMessageElement = await driver.wait(until.elementLocated(By.id('invalidMessage')), 5000)
            const invalidMessageIsExist = await invalidMessageElement.isDisplayed()

            expect(invalidMessageIsExist).to.be.true
        })

        it('should find login element and fill the data', async function() {
            await driver.findElement(By.css('#username')).clear()
            await driver.findElement(By.css('#username')).sendKeys('testuser')
            await driver.findElement(By.xpath('//*[@id="password"]')).clear()
            await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123')
            const checkUsername = await driver.findElement(By.css('#username')).getAttribute('value')
            const checkPassword = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value')

            expect(checkUsername).to.equal('testuser')
            expect(checkPassword).to.equal('password123')
        })

        it('should check the button is exist or not', async function() {
            const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed()
            expect(isDisplayed).to.be.true
        })
})