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

//logic for get arithmetic apt questions
exports.getArithQuestions = async(req,res)=>{
    try{
        const arithQuestions = await general_aptitudes.findOne({
            'sections.section_name':'Arithmetic_aptitude',
            'sections.topics.category':'PoT'
        },{
            'sections.$':1
        });

        if(arithQuestions && arithQuestions.sections.length > 0){
            const section = arithQuestions.sections[0];
            const topic = section.topics.find(top=> top.category === 'PoT');

            if(topic && topic.questions.length > 0){
                res.status(200).json(topic.questions);
            } else{
                res.status(404).json('No questions found for pot! ')
            }
        } else{
            res.status(404).json('No sections found!')
        }
    } catch(err){
        res.status(400).json(`Request failed due to ${err}`)
    }
};

//logic for editing a Question
exports.editQuestions = async(req,res)=>{
    const {id} = req.params
    const{question,option_a,option_b,option_c,option_d,answer,explanation} = req.body
    try {
        const updateQuestion = await general_aptitudes.findByIdAndUpdate({_id:id},{question,option_a,option_b,option_c,option_d,answer,explanation},{new:true})
        await updateQuestion.save()
        res.status(200).json(updateQuestion)
    } catch (error) {
        res.status(401).json(error)
    }
}

//logic for deleting arith apt questions
