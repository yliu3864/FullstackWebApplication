const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlSongs = require('../controllers/songs.controller');
const ctrlReviews = require('../controllers/reviews.controller');
const ctrlPlaylists= require('../controllers/playlists.controller');
const ctrlManager=require('../controllers/manager.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/secure/register', ctrlUser.register);
router.post('/secure/googlelogin', ctrlUser.googlelogin);
router.post('/authenticate', ctrlUser.authenticate);
// router.get('/:varify',ctrlUser.varify);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/email/:varify',ctrlUser.varify);
router.get('/resend/:id',ctrlUser.resendemail);

router.post('/secure/oauth/google',ctrlUser.authenticateGoogle);

router.post('/secure/addsongs', ctrlSongs.addsongs);
router.post('/secure/addreviews', ctrlReviews.addreviews);
// router.get('/secure/getreviews/:id', ctrlReviews.getreviews);

router.post('/secure/changetitle', ctrlPlaylists.changedtitl);
router.get('/secure/getreviews/:id',ctrlReviews.getreviews);
router.post('/secure/addplaylists', ctrlPlaylists.addplaylists);
router.get('/secure/getplaylist/:id', ctrlPlaylists.getplaylist);
router.get('/secure/searchplaylist/:id', ctrlPlaylists.searchplaylist);
router.post('/secure/delectsong', ctrlPlaylists.delectsong);

router.post('/secure/changedstatus', ctrlPlaylists.changedstatus);
router.post('/secure/changedescript', ctrlPlaylists.changedescript);
router.get('/open/song/search/:id',ctrlSongs.songsearch);
router.get('/open/song/rate',ctrlSongs.songrate);

router.post('/secure/manager/setType',ctrlManager.setType);
router.get('/secure/manager/getAllsongs',ctrlManager.getAllsongs);
router.get('/secure/manager/getAllusers',ctrlManager.getAllusers);
router.post('/secure/manager/setSong',ctrlManager.setSong);

module.exports = router;



