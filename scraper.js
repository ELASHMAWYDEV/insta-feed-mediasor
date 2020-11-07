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
    let browser = await puppeteer.launch({args: ['--no-sandbox']});
    let page = await browser.newPage();
    await page.goto(`https://www.instagram.com/${username}`); //Open the user profile page

    //Get profile info
    const { id, bio, followers, fullName, profilePic, postsCount } =
      (await getProfileInfo(username)) || {};

    //Get links
    let postsLinks = await getLinks(page, postsCount);

    //Get each post data
    let posts = await getPostsData(postsLinks);

    //Add vars to data object
    data = {
      id,
      bio,
      followers,
      fullName,
      profilePic,
      postsCount,
      posts
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

const getProfileInfo = async (username) => {
  //Get the user object from __a=1
  let response = await axios.get(`https://www.instagram.com/${username}?__a=1`);
  let data = await response.data;

  let profileInfo = {
    id: data.graphql.user.id,
    bio: data.graphql.user.biography,
    followers: data.graphql.user.edge_followed_by.count,
    fullName: data.graphql.user.full_name,
    profilePic: data.graphql.user.profile_pic_url_hd,
    postsCount: data.graphql.user.edge_owner_to_timeline_media.count,
  };

  return profileInfo;
};

//Get all posts links
const getLinks = async (page, postsCount) => {
  /*-------------...Get Posts' Links...------------*/
  let postsLinks = new Set();

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

const getPostsData = async (postsLinks) => {
  try {
    //Init empty object
    let postsData = [];

    //Open new tab in puppeteer & open post link
    for (let link of postsLinks) {
      const response = await axios.get(`${link}?__a=1`);
      const data = await response.data;

      //Get neccessary data only
      let postData = {
        id: data.graphql.shortcode_media.id,
        type: data.graphql.shortcode_media.__typename,
        url: `https://instagram.com/p/${data.graphql.shortcode_media.shortcode}`,
        imageUrl: data.graphql.shortcode_media.display_url,
        isVideo: data.graphql.shortcode_media.is_video,
        viewsCount: data.graphql.shortcode_media.video_view_count || null,
        caption:
          data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text,
        commentsCount:
          data.graphql.shortcode_media.edge_media_to_parent_comment.count,
        commentsDisabled: data.graphql.shortcode_media.comments_disabled,
        timestamp: data.graphql.shortcode_media.taken_at_timestamp,
        likesCount: data.graphql.shortcode_media.edge_media_preview_like.count,
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

    return postsData;
  } catch (e) {
    console.log(e);
    return [];
  }
};
