const puppeteer = require("puppeteer");
const { performance } = require("perf_hooks");
const axios = require("axios");

module.exports = async (username = "mediasor") => {
  try {
    //Initialize vars
    let data = {};

    //Calculate time for operation
    let t0 = performance.now();
    console.log("Started Scraping...");

    //Init browser
    let browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    let page = await browser.newPage();

    //Login first
    await loginAnonymos(page, username);

    // Get profile info
    const { id, bio, followers, fullName, profilePic, postsCount } =
      (await getProfileInfo(page, username)) || {};

    //Get links
    let postsLinks = await getLinks(page, postsCount, username);
    console.log("Finished getting links...");

    //Get each post data
    let posts = await getPostsData(page ,postsLinks);
    console.log("Getting Posts Data Done...");

    //Add vars to data object
    data = {
      id,
      bio,
      followers,
      fullName,
      profilePic,
      postsCount,
      posts,
    };

    await browser.close();

    //Log taken time to execute
    let t1 = performance.now();
    console.log(`Time taken: ${((t1 - t0) / 1000).toFixed(1)}s`);

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

const getProfileInfo = async (page, username = "mediasor") => {
  try {
    //Get the user object from __a=1
    await page.goto(`https://www.instagram.com/${username}?__a=1`, {
      timeout: 0,
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    }); //Open the user profile page

    console.log("Profile Info puppeteer current: ", await page.url());
    let jsonContent = await page.evaluate(() =>
      JSON.parse(document.querySelector("pre").innerText)
    );
    let { graphql } = jsonContent || {};
    let { user } = graphql || {};

    let profileInfo = {
      id: user.id || "",
      bio: user.biography || "",
      followers: user.edge_followed_by.count || "",
      fullName: user.full_name || "",
      profilePic: user.profile_pic_url_hd || "",
      postsCount: user.edge_owner_to_timeline_media.count || "",
    };

    return profileInfo;
  } catch (e) {
    console.log(e.message);
  }
};

//Get all posts links
const getLinks = async (page, postsCount, username = "mediasor") => {
  /*-------------...Get Posts' Links...------------*/
  let postsLinks = new Set();
  await page.goto(
    `https://www.instagram.com/${username}`,
    {
      timeout: 0,
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    }
  );

  //Scroll to the end
  while (postsLinks.size < postsCount) {
    try {
      //Get the visible posts links
      const nodes = await page.$$eval("div.v1Nh3.kIKUG._bz0w > a", (links) =>
        links.map((a) => a.href)
      );

      //Scroll to end
      await page.evaluate(
        `window.scrollTo(0, document.body.scrollHeight + 1000)`
      );

      //Add nodes to the posts set
      nodes.forEach((post) => {
        postsLinks.add(post);
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  return [...postsLinks];
};

const getPostsData = async (page, postsLinks) => {
  //Init empty object
  let postsData = [];
  let error = null;

  do {
    try {
      //Open new tab in puppeteer & open post link
      for (let link of postsLinks) {
        await page.goto(`${link}?__a=1`);
        const data = await page.evaluate(() => JSON.parse(document.querySelector("pre").innerText));

        //log after every 20 posts
        if (postsLinks.indexOf(link) % 20 == 0 && postsLinks.indexOf(link) != 0) {
          console.log("Got 20 posts");
        }

        //Get neccessary data only
        let postData = {
          id: data.graphql.shortcode_media.id,
          type: data.graphql.shortcode_media.__typename,
          url: `https://instagram.com/p/${data.graphql.shortcode_media.shortcode}`,
          imageUrl: data.graphql.shortcode_media.display_url,
          isVideo: data.graphql.shortcode_media.is_video,
          viewsCount: data.graphql.shortcode_media.video_view_count || null,
          caption:
            data.graphql.shortcode_media.edge_media_to_caption.edges[0].node
              .text,
          commentsCount:
            data.graphql.shortcode_media.edge_media_to_parent_comment.count,
          commentsDisabled: data.graphql.shortcode_media.comments_disabled,
          timestamp: data.graphql.shortcode_media.taken_at_timestamp,
          likesCount:
            data.graphql.shortcode_media.edge_media_preview_like.count,
          comments: data.graphql.shortcode_media.edge_media_to_parent_comment.edges.map(
            ({ node }) => {
              return {
                id: node.id,
                text: node.text,
                timestamp: node.created_at,
                username: node.owner.username,
                imageUrl: node.owner.profile_pic_url,
                likesCount: node.edge_liked_by.count,
                repliesCount: node.edge_threaded_comments.count,
                replies: node.edge_threaded_comments.edges.map(({ node }) => {
                  return {
                    id: node.id,
                    text: node.text,
                    timestamp: node.created_at,
                    username: node.owner.username,
                    imageUrl: node.owner.profile_pic_url,
                    likesCount: node.edge_liked_by.count,
                  };
                }),
              };
            }
          ),
        };

        postsData.push(postData);
      }
    } catch (e) {
      console.log(e.message);
      error = e.message;
    }
  } while (error);

  return postsData;
};

const loginAnonymos = async (page, username = "mediasor") => {
  const instaEmail = "mediasor@elashmawydev.com";
  const instaPass = "qwerasdf";

  //go to login page
  await page.goto(
    `https://www.instagram.com/accounts/login/?next=/${username}/%3F__a%3D1`,
    {
      timeout: 0,
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    }
  );
  await page.waitForTimeout(2000);
  await page.type("._2hvTZ.pexuQ.zyHYP[name='username']", instaEmail);
  await page.type("._2hvTZ.pexuQ.zyHYP[name='password']", instaPass);
  await page.click(".sqdOP.L3NKy.y3zKF");
  await page.waitForTimeout(3000);
  console.log(`Logged in: ${await page.url()}`);
};
