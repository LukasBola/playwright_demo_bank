# Test Automation training form jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site
  https://demo-bank.vercel.app/  
  If link broken check first lesson for update:
  https://jaktestowac.pl/lesson/pw1s01l01/
- code repository: https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright:  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
  `npx playwright test` lub konkretny test:
  `npx playwright test tests/pulpit.spec.ts`
- run test with browser GUI:  
  `npx playwright test --headed`
- viewing report  
  `npx playwright show-report`

## Playwright Config modifications

- config file `playwright.config.ts`
- disabling browsers, i.e. Firefox:
  ```json
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual studio code

- Preview: for README.md
- Autosave: in File -> Auto Save
- Opcja: Prawy klawisz myszy oraz na pliku -> Open Timeline

## Opcje powtarzania testów

`npx playwright test --repeat-each=10`  
`npx playwright test  --retries=3`
Możemy też wykonać kombinacje --repeat-each oraz --reties
`npx playwright test tests/pulpit.spec.ts --repeat-each=10 --retries=3`

więcej tutaj: https://jaktestowac.pl/lesson/pw1s01l03b/
