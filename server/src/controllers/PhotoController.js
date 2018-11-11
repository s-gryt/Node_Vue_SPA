const Photo = require('../models/Photo')
const upload = require('../utils/PhotoUploader')
const fs = require('fs')

module.exports = {
  // ADMIN - TODO: add showing by genres  -- spread by different components, navigate to the each one on click
  async index (req, res) {
    try {
      const photos = await Photo.find({})
      res.status(200).send({
        data: photos
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async show (req, res) {
    try {
      const id = req.params.id
      const photo = await Photo.findOne({ _id: id })
      res.status(200).send({
        data: photo
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async post (req, res) {
    try {
      await upload(req, res, err => {
        if (err) {
          res.status(500).send({
            error: 'Something went wrong...' + err
          })
        } else {
          if (req.files === undefined) {
            res.status(500).send({
              error: 'Something went wrong...' + err
            })
          } else {
            console.log('PHOTO=>', req.files[0].filename, req.files[0].path)
            Photo.create({
              name: req.files[0].filename,
              path: req.files[0].path
            })
              .then(data => {
                // TODO store 'all' genre by default
                console.log('data', data)
                res.status(201).send({
                  data: data
                })
              })
              .catch(err => {
                // TODO if error  - find and remove stored photo
                res.status(500).send({
                  error: 'Something went wrong...' + err
                })
              })
          }
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async put (req, res) {
    try {
      const id = req.params.id
      const data = req.body
      console.log('ID', req.params.id)
      // console.log('DATA', data)
      // console.log('BODY=>', req)
      const genre = await Photo.findOneAndUpdate({ _id: id }, data)
      res.status(201).send({
        data: genre
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  },
  async destroy (req, res) {
    try {
      const id = req.params.id
      const photo = await Photo.findOne({ _id: id })
      await fs.access(photo.path, err => {
        if (!err) {
          fs.unlink(photo.path, err => {
            if (!err) {
              photo.remove()
              res.status(204).send({
                data: ''
              })
            } else {
              res.status(500).send({
                error: 'Something went wrong...' + err
              })
            }
          })
        } else {
          res.status(500).send({
            error: 'Something went wrong...' + err
          })
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'Something went wrong...' + err
      })
    }
  }
  // CLIENT - TODO: add showing by genres
}
