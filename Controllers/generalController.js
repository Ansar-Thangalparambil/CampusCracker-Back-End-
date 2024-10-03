//Controller for adding a question (for admin)

//import general aptitude model
const general_aptitudes = require('../Models/generalSchema');
// const general_aptitude = require('../Models/generalSchema')

//logic for add question
exports.addQuestion = async(req,res)=>{
    console.log('Inside general controller');
    const {section_name,category,question,option_a,option_b,option_c,option_d,answer,explanation} = req.body;

    const question1 = {question,option_a,option_b,option_c,option_d,answer,explanation}

    try{
        // find the section and topic if they exist
        let generalAptitude = await general_aptitudes.findOne({"sections.section_name":section_name});

        if(generalAptitude){
             let section = generalAptitude.sections.find((sec)=>sec.section_name === section_name);

             let topic = section.topics.find((top)=>top.category === category);

             if(topic){
                const newQuestion = question1
                topic.questions.push(newQuestion);
             }
             else{
                const newTopic = {
                    category,
                    questions:[question1]
                };
                section.topics.push(newTopic);
             }
             await generalAptitude.save();
             res.status(200).json(generalAptitude);
        }
        else{
            const newSection = {
                section_name,
                topics:[
                    {
                        category,
                        questions:[question1]
                    }
                ]
            };
            generalAptitude = new general_aptitudes({
                sections:[newSection]
            });

            await generalAptitude.save();
            res.status(200).json(generalAptitude)
        }
    }catch(err){
        res.status(500).json(`Add question request failed due to ${err}`);
    }
}