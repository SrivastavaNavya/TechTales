const { Router } = require("express");
const { handleAddNewBlog, handlePostBlog, handleViewSingleBlog, handleCreateComment } = require("../controllers/blog");
const multer = require('multer')
const path=require('path')

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now()}-${file.originalname}`
        cb(null,fileName)
    }
})

const upload = multer({ storage: storage })

router.get('/add-new', upload.single('coverImage'), handleAddNewBlog)

router.post('/', upload.single('coverImage'), handlePostBlog)

router.get('/:id', handleViewSingleBlog)

router.post('/comment/:blogId', handleCreateComment)

module.exports = router