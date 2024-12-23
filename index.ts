import { firefox } from 'playwright';
// const server = Bun.serve({
//   port: 3000, async fetch() {
//     return new Response(await requestThing())
//   }
//   ,
//   idleTimeout: 255
// });

requestThing();

async function requestThing() {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://webaccount.italkbb.com/CSS/Login.Responsive.loader.html');

  const frame = page.frameLocator('#login_oauth_frame_ifr');

  await frame.getByPlaceholder('Email/Phone').fill(process.env.email!);
  await frame.getByPlaceholder('Password').fill(process.env.password!);

  await frame.getByRole('button', { name: 'Login' }).click();

  await page.getByText('My personal information').waitFor();


  const pagePromise = context.waitForEvent('page');
  await page.locator('css=#img10').click();
  const page2 = await pagePromise;
  await page2.waitForLoadState();
  await page2.getByText('Add-Ons').click();
  const res = await page2.locator("#CNDIDList").getByText(process.env.phone!).textContent();

  await browser.close();
  return res;
}
