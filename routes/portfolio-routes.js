const express = require('express');
const axios = require('axios');
const portfolioRouter  = express.Router();
const Portfolio = require('../models/Portfolio');

// adding API here
portfolioRouter.get('/portfolios/new-folio/api', (req, res, next)=>{
  Portfolio.find()
  .then((listOfFolios)=>{
    console.log('API ACCESSED!')
    res.json(listOfFolios)
  })
  .catch((err)=>{
      next(err);
  })
})
  
portfolioRouter.post('/portfolios/new-folio/api', (req, res, next)=>{
  let siteName = req.body.siteName;
  let siteDomain = req.body.siteDomain;
  let siteIcon = req.body.siteIcon;
  console.log(siteName, siteDomain, siteIcon)

  Portfolio.create({
    siteName: siteName,
    siteDomain: siteDomain,
    siteIcon: siteIcon
  })
  .then((response)=>{
    console.log(response);
      res.json({message: 'Successfully Created Portfolio'});
  })
  .catch((err)=>{
    console.log(err);
      res.json(err);
  })
})
// ending API here

portfolioRouter.get('/portfolios/new-folio', (req, res, next)=>{
  res.render('portfolios/new-folio');
});

portfolioRouter.get('/portfolios/', (req, res, next) => {
  Portfolio.find()
  .then((theThingWeGetBackFromDB)=>{
    console.log('IT LOADED SUCCESSFULLY')
    res.render('portfolios', {allThePortfolios: theThingWeGetBackFromDB})
  })
  .catch((err)=>{
    console.log('PROBLEM!!!')
    next(err);  
  })
  
});

portfolioRouter.post('/portfolios', (req, res, next)=>{
  const {siteName, siteDomain, siteIcon} = req.body;
  let newPortfolio = {siteName: siteName, siteDomain: siteDomain, siteIcon: siteIcon}
  Portfolio.create(newPortfolio)
  .then (()=>{
    res.redirect('/portfolios')
  })
  .catch ((err)=>{
    res.render('portfolios/new')
    next(err);
  })
});


portfolioRouter.post('/portfolios/:id/delete', (req, res, next)=>{
  Portfolio.findByIdAndRemove(req.params.id)
  .then (()=>{
    res.redirect('/portfolios/:id/')
  })
  .catch ((err)=>{
    next(err);
  })
});



portfolioRouter.get('/portfolios/:id/edit', (req, res, next)=>{
  Portfolio.findById(req.params.id)
  .then((portfolioFromDb)=>{
    res.render('portfolios/edit', {portfolio: portfolioFromDb})
    .catch((err)=>{
      next(err);
    })
  })
});

portfolioRouter.get('/portfolios/:id', (req, res, next)=>{
  
  let theID = req.params.id;
  Portfolio.findById(theID)
  .then((oneSinglePortfolio)=>{
    res.render('portfolios/show', {thePortfolio: oneSinglePortfolio})
  })
  .catch((err)=>{
    next(err);
  })
});

portfolioRouter.post('/portfolios/:id', (req, res, next)=>{
  let theID = req.params.id
  Portfolio.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect('/portfolios');
  })
  .catch((err)=>{
    next(err);
  })
});


module.exports = portfolioRouter;