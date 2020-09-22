const express = require("express");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
const Profile = require("../../models/Profile");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { remove } = require("../../models/Profile");

// router.post("/", auth, async (req, res) => {
//   const {
//     skills,
//     company,
//     status,
//     website,
//     location,
//     bio,
//     githubusername,
//     handle,
//     twitter,
//     facebook,
//     youtube,
//     linkedin,
//     instagram,
//   } = req.body;

//   try {
//       const profileFields = {}
//       profileFields.user = req.user.id;
//       if(skills) {
//           profileFields.skills = skills.split(',').map(skill => skill.trim())
//         };
//       if(company)  profileFields.company =  company;
//       if(status)   profileFields.status = status;
//       if(website)   profileFields.website = website;
//       if(location)   profileFields.location = location;
//       if(bio)   profileFields.bio = bio;
//       if(githubusername)   profileFields.githubusername = githubusername;
//       if(handle) profileFields.handle = handle

//       profileFields.social = {}

//       if(twitter)   profileFields.social.twitter = twitter;
//       if(facebook)   profileFields.social.facebook = facebook;
//       if(youtube)  profileFields.social.youtube = youtube;
//       if(linkedin )  profileFields.social.linkedin = linkedin;
//       if(instagram )  profileFields.social.instagram = instagram;

//     let profile = await Profile.findOne({ user: req.user.id });

//     if (profile) {
//       profile = await Profile.findOneAndUpdate(
//         { user: req.user.id },
//         { $set: profileFields},
//         { new: true,
//             useFindAndModify: false }
//       );
//       return res.json(profile)
//     }
//     profile = new Profile(profileFields);
//     await profile.save()
//     res.send(profile);
//   } catch (e) {
//     res.status(500).send("Creatation failed");
//     console.log(e.message);
//   }
// });

//create profile
router.post("/", auth, async (req, res) => {
  try {
    // const profileFields = {}
    // profileFields.user = req.user.id;

    let profile = await Profile.findOne({ user: req.user.id });
    //check exist and update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: { ...req.body, user: req.user.id } },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return res.json(profile);
    }

    //create new
    profile = new Profile({ ...req.body, user: req.user.id });

    await profile.save();
    res.send(profile);
  } catch (e) {
    res.status(500).send("Creatation failed");
    console.log(e.message);
  }
});

//get user profile
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

//get all profile
router.get("/all", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Get failed");
  }
});

//get profile by userid
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).send("Profile not found");
    }
    res.send(profile);
  } catch (e) {
    if (e.kind == "ObjectId") {
      return res.status(400).send("Profile not found");
    }
    console.log(e.message);
    res.status(500).send("Get failed");
  }
});

//delete profile, user

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.send({ message: "Deleted success" });
  } catch (e) {
    console.log(e.message);
    res.send("Deleted failed");
  }
});

//delete profile experience by id

router.delete("/experience/:expId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndexs = profile.experience.map((item) => item.id);
    const removeIndex = removeIndexs.indexOf(req.params.expId);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.send({ msg: "Delete sucess", profile });
  } catch (error) {
    console.log(error.message);
    res.send("Delete failed");
  }
});

//delete profile education by id

router.delete("/education/:eduId", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.send({ msg: "Delete sucess", profile });
  } catch (error) {
    console.log(error.message);
    res.send("Delete failed");
  }
});

//update experience from profile

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).send("There are no profile");
      }
      profile.experience.unshift(req.body);

      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Update failed");
    }
  }
);

//update education from profile

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is require").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
      check("fieldofstudy", "Field of Study is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).send("There is no profile");
      }

      profile.education.unshift(req.body);
      await profile.save();
      res.send(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Update failed");
    }
  }
);

//get github repos

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      moethod: 'GET',
      headers: {'user-agent':'node-js'}
    };

    request(options, (error, response, body) => {
      if(error) console.log(error);

      if(response.statusCode !== 200) {
        return res.status(404).send({msg: 'No github profile found'})
      }

      res.send(JSON.parse(body))
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
