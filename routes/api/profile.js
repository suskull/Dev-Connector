const express = require("express");
const Profile = require('../../models/Profile')
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.send({ error: "There are no profile" });
    }
    res.send(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Get failed");
  }
});

router.post("/", auth, async (req, res) => {
  const {
    skills,
    company,
    status,
    website,
    location,
    bio,
    githubusername,
    handle,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = req.body;

  try {
      const profileFields = {}
      profileFields.user = req.user.id;
      if(skills) {
          profileFields.skills = skills.split(',').map(skill => skill.trim())
        };
      if(company)  profileFields.company =  company;
      if(status)   profileFields.status = status;
      if(website)   profileFields.website = website;
      if(location)   profileFields.location = location;
      if(bio)   profileFields.bio = bio;
      if(githubusername)   profileFields.githubusername = githubusername;
      if(handle) profileFields.handle = handle

      profileFields.social = {}

      if(twitter)   profileFields.social.twitter = twitter;
      if(facebook)   profileFields.social.facebook = facebook; 
      if(youtube)  profileFields.social.youtube = youtube; 
      if(linkedin )  profileFields.social.linkedin = linkedin; 
      if(instagram )  profileFields.social.instagram = instagram; 

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields},
        { new: true,
            useFindAndModify: false }
      );
      return res.json(profile)
    }
    profile = new Profile(profileFields);
    await profile.save()
    res.send(profile);
  } catch (e) {
    res.status(500).send("Creatation failed");
    console.log(e.message);
  }
});

module.exports = router;
