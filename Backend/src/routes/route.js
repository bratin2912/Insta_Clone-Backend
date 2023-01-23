const router = require("express").Router();
const fs = require("fs")
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
router.post('/user', (req, res) => {
    const { author, location, description } = req.body;
    const { image_file } = req.files;
    const fileExtension = image_file.name.split(".");
    const extract = fileExtension[fileExtension.length - 1];
    if (['jpg', 'png', 'svg', 'jpeg'].includes(extract)) {
        const img_id = uuidv4();
        const likes = Math.floor(Math.random() * (70 - 1 + 1)) + 1
        // image_file.mv(`../Uploads/${img_id}.${extract}`,async(err)=>{
        //         if(err){
        //             console.log(err);
        //             return res.status(502).send({
        //                 status:"Failed",
        //                 message:"Failed to upload image"
        //             })
        //         }
        //         try{
        //             const data=await User.create({
        //                 ...{author,location,description},
        //                 file_name:file_name,
        //                 likes

        //             })
        //             console.log(data,"gujyguigliuguil");
        //             return res.status(201).send({
        //                 status:"Success",
        //                 message:"Data uploaded successfully"
        //             });
        //         }catch(err){
        //             return res.status(502).send({
        //                 status:'Failed',
        //                 message:err.message
        //             });
        //         }
        //     })
        fs.writeFile(path.resolve(__dirname,`../Uploads/${img_id}.${extract}`), image_file.data, "utf-8", async (err) => {
            if (err) {
                res.send({
                    status: "Failed",
                    message: "Failed to upload image",
                    statusCode:500
                })
            }
            else{
                try {
                    const data = await User.create({
                        author,
                        location,
                        description,
                        file_name: `${img_id}.${extract}`,
                        likes
    
                    })
                    res.send({
                        status: "Success",
                        message: "Data uploaded successfully",
                        statusCode:200

                    });
                } catch (err) {
                    res.status(502).send({
                        status: 'Failed',
                        message: err.message
                   });
                }
            }
            
    })
    }
    else {
        return res.status(404).send({
            status: "Failed",
            message: "File extension must be jpg/jpeg/png/svg"
        })
    }
});

router.get("/user", async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).send({
            result:data
        })
    } catch (e) {
        res.status(502).send({
            status: 'Failed',
            message: e.message
        })
    }
})

router.get("/user/image/:fileName", async (req, res) => {
    res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`));
})
module.exports = router;