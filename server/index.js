const {Configuration, OpenAIApi} = require("openai");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 4000;
const fs = require("fs");
const multer = require("multer");
const dotenv = require('dotenv');

app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
dotenv.config();

const generateID = () => Math.random().toString(36).substring(2, 10);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename:(req, file,cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024 * 5}
});

const configuration = new Configuration({
    apiKey:`${process.env.REACT_APP_OPENAI_SECRET_KEY}`,
})

const openai = new OpenAIApi(configuration);

let database = [];

const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty:1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
}

app.post("/study/create", upload.single("snapshotImage"), async (req, res) =>{
    const {
        headline,
        intro,
        problem,
        solution,
        results,
        inspiration,
        quote
    } = req.body;

    //GROUP THE VALUES INTO AN OBJECT
    const newEntry = {
        id: generateID(),
        headline,
        intro,
        problem,
        solution,
        results,
        inspiration,
        quote,
        image_url: `http://localhost:4000/uploads/${req.file.filename}`,
    };

        //CASE STUDY PROMPTS
        // INTRODUCTION PROMPT
        const prompt1 = `I am writing a technical case study on ${headline}, Can you write a 100 words introduction for the top of the technical case study(first person writing)?`;
        //problem prompt
        const prompt2 = `I am writing a technical case study on ${headline}. This is the  ${problem}, Can you write  50 words describing the problem of the technical case study(first person writing)?`;
        //  solution prompt
        const prompt3 = `I am writing a technical case study on ${headline}. This is the  ${solution} offered, Can you write 150 words solution offered in the technical case study(first person writing)?`;
        //RESULTS PROMPT
        const prompt4 = `I am writing a technical case study on ${headline}. This is the  ${results}, Can you write 75 words explaining the results of the technical case study(first person writing)?`;
        //  INSPIRATION PROMPT
        const prompt5 =  `I am writing a technical case study on ${headline}. This is the  ${inspiration}, Can you write  20 words describing the inspiration of the technical case study(first person writing)?`;

        //genarate a GPT-3 result
        const introduction = await GPTFunction(prompt1);
        const problems = await GPTFunction(prompt2);
        const solutionPoints = await GPTFunction(prompt3);
        const resultsPoints = await GPTFunction(prompt4);
        const inspirationPoints = await GPTFunction(prompt5);

        //  put them into an object
        const chatgptData = {introduction, problems, solutionPoints, resultsPoints, inspirationPoints};

        //log the result
        // console.log(chatgptData)

        const data = {...newEntry, ...chatgptData};
        database.push(data);

        res.json({
            message:"Request successful!",
            data,
        })
    
});

app.listen(PORT, () =>{
    console.log(`Server listening on ${PORT}`);
});
