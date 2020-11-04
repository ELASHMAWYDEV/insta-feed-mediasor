const puppeteer = require("puppeteer");
const { performance } = require('perf_hooks');

module.exports = async (username = "mediasor") => {
  try {
    //Initialize vars
    let data = {};

    //Calculate time for operation
    let t0 = performance.now();

    //Scraping Init
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    //Open the user profile page
    await page.goto(`https://www.instagram.com/${username}`);

    //Get user profile info
    const id = await page.$$eval(".-vDIg > a", links => links.map(a => a.getAttribute("author_id"))[0]);
    const bio = await page.evaluate(() => document.querySelector(".-vDIg > span").textContent);
    const followers = await page.evaluate(() => document.querySelector("span.g47SY").textContent)
    const fullName = await page.evaluate(() => document.querySelector("h1.rhpdm").textContent)
    const profilePic = await page.evaluate(() => document.querySelector("img._6q-tv").src)
    const postsCount = await page.evaluate(() => document.querySelector("span.g47SY").textContent)


    /*-------------...Get Posts...------------*/
    let postsLinks = new Set();

    //Scroll to the end first
    while (postsLinks.size < postsCount) {

      try {
        //Get the visible posts links
        const nodes = await page.$$eval("div.v1Nh3.kIKUG._bz0w > a", links => links.map(a => a.href));
        
        //Scroll to end
        await page.evaluate(`window.scrollTo(0, document.body.scrollHeight + 1000)`);
        
        
        //Add nodes to the posts set
        nodes.forEach(post => {
          postsLinks.add(post);
        });
      } catch (e) {
        console.log(e.message);
      }
    }  

    await browser.close();

    //Log taken time to execute
    let t1 = performance.now();
    console.log(`Time taken: ${((t1 - t0) / 1000).toFixed(1)}s`);

    return data;

  } catch (e) {

    console.log(e.message);
  }
};
