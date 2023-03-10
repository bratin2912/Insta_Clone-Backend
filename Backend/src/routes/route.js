const router = require("express").Router();
const cloudinary = require("../Utils/cloudinary");
const User = require("../model/userModel");

router.post('/api/user', async (req, res) => {
    const { author, location, description } = req.body;
    const { imageFile } = req.files;
    const fileExtension = imageFile.name.split(".");
    const extract = fileExtension[fileExtension.length - 1];
    if (['jpg', 'png', 'svg', 'jpeg'].includes(extract)) {
        const likes = Math.floor(Math.random() * (70 - 1 + 1)) + 1;
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        const fileUrl = reader.result;
        cloudinary.uploader.upload(fileUrl, { upload_preset: "10x_Project" }, async (err, result) => {
            if (err) {
                res.send({
                    status: "Failed",
                    message: "Failed to upload image",
                    statusCode: 500
                })
            }
            else {
                try {
                    const data = await User.create({
                        author,
                        location,
                        description,
                        url: result.url,
                        likes

                    })
                    res.send({
                        status: "Success",
                        message: "Data uploaded successfully",
                        statusCode: 200

                    });
                } catch (err) {
                    res.status(502).send({
                        status: 'Failed',
                        message: err.message
                    });
                }
            }
        });
    }
    else {
        return res.status(404).send({
            status: "Failed",
            message: "File extension must be jpg/jpeg/png/svg"
        })
    }
})


router.get("/user", async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).send({
            result: data
        })
    } catch (e) {
        res.status(502).send({
            status: 'Failed',
            message: e.message
        })
    }
})

module.exports = router;
