package com.monash.flora_backend.constant;

/**
 * ClassName: MyConstantGPTPrompt
 * Description:
 *
 * @author Xinyu Li
 * @since 11/13/2023 3:05 PM
 */
public class MyConstantGPTPrompt {
    public static String CELLA_MONASH_MEDICINE_INSTRUCTION_RUBRIC_PROMPT = "This student is working on an essay writing task. \n" +
            "\n" +
            "These are task instructions:\n" +
            "They are reading the material on (1) artificial intelligence and (2) the medicine of the future. The student cannot use reading materials outside of those provided in the environment. Based on these, they need to write an essay (200-300 words) in which they describe in their own words how AI is part of their daily life and how health care now and in the future would look like. \n" +
            "The essay should reflect the student's own vision and the essay will be automatically checked on how much is copied from the text and/or from other internet sources.\n" +
            "The student has 45 minutes to study the topics and write the essay. This means that they should work efficiently. They may not have sufficient time to read everything, so they must select their activities carefully. The student is advised to focus on the two topics, how AI works and how new technologies can be used in health care in the future.  \n" +
            "At the end of the learning session, the student should be able to: explain the concept of AI, explain how AI applies to their daily life, explain how AI based technologies can change health care.\n" +
            "The student can use different tools provided in the learning environment to help them with the task: annotator (to highlight and tag parts of texts and to take notes), planner and essay writing tool.\n" +
            "This is an individual task, so asking for help from a teacher of peers is not allowed.\n" +
            "\n" +
            "This is how the essay will be scored:\n" +
            "\n" +
            "The rubric is used to evaluate the essay. There are two global criteria and three components on which the essay will be graded.  \n" +
            "The two global criteria are:\n" +
            "1.    The essay consists of 200 to 300 words. \n" +
            "2.    The essay is written clearly and in the student's own words, meaning that no part in the essay can be copied from the text or from other sources. \n" +
            "The three components are: \n" +
            "1.     Discussion of the concept of AI  \n" +
            "2.     Discussion of the use of AI-based technologies in medicine\n" +
            "3.     Discussion of the future integration of AI in your daily life and in health care (See Table 1.)\n" +
            "This is the rubric. The rubric is used to score the essay, and the full score is 16 points. \n" +
            "There are two global criteria:\n" +
            "Word count: The essay consists of 200 to 400 words; Yes (2 points), No (0 points)\n" +
            "Originality: Your writing should be your own opinion elaborated in your own words, not simply copy-pasted sentences from the material; Yes (2 points), Partial (1 point) No (0 point)\n" +
            "In addition, the essay response will be evaluated according to the following criteria: \n" +
            "Description of topic AI: the essay has a weak description of the topic AI (1 point); the essay has a sufficient description of the topic AI (2 points); the essay has an in-depth description of the topic AI (3 points); the essay has a in depth description of the topic AI and application to daily life (4 points)\n" +
            "Discussion of topic AI-based technologies in medicine: the essay has a weak description of AI-based technologies in medicine (1 point); the essay has a sufficient description of AI-based technologies in medicine (2 points); the essay has an in-depth description of AI-based technologies in medicine (3 points); the essay has an in-depth description of AI-based technologies in medicine and application to the future (4 points)\n" +
            "Combining topics: the essay does not reflect combining of the topics (1 point); the combination of topics is superficial (2 points); the combination of topic is detailed and aligns with the text (3 points); combination of topics is beyond the text and applications to daily life and future health care are discussed (4 points)\n";
    public static String CELLA_MONASH_MEDICINE_BACKGROUND_PROMPT = "This is the reading material for the task:\n" +
            "Artificial intelligence: \n" +
            " \n" +
            "1.     What is artificial intelligence? \n" +
            "Artificial intelligence (AI) is the ability of computers to perform tasks for which humans will use their intelligence. You can consider solving problems, identifying objects, making predictions, and interacting with the environment as examples of AI tasks. For example, a robot can talk to a child to help the child enhance communication skills and improve learning. Intelligent robots can also be involved to assist doctors treating young patients. Intelligent robots can be used for psychological treatment by providing interactive support for people who have depression.\n" +
            " \n" +
            "2.     How does AI work? \n" +
            "Systems that use artificial intelligence (AI) can simulate human intelligence by analysing data and predicting future events. Typically, AI consists of two components: algorithms and data. Each algorithm includes a set of steps that the system needs to perform to find a solution. You can consider an algorithm like a recipe when you are baking a cake. Data is the ingredient that makes the cake. By analysing more data, the algorithm can make better recommendations. Just like when you have more variety of ingredients, you can make a fancier cake. A key difference between AI and other technologies is that the AI-incorporated systems can learn from the data. Another example, the more analysed data in the health field, the more efficient recommendations that doctors can get.\n" +
            " \n" +
            "3.     AI in practice\n" +
            "During the COVID-19 pandemic, researchers developed an AI tool to predict which patients might get COVID and how severe their symptoms might be. They tested it on 53 patients, gathering their health details. Instead of common signs like fever or age, the AI successfully used unique factors like liver enzymes, muscle pain, and blood hemoglobin levels to predict breathing problems with up to 80% accuracy. This shows the powerful potential of AI in medical practices.\n" +
            " \n" +
            "4.     Difference between AI and regular programming\n" +
            "When you build a program to check a person's temperature, it simply reads the thermometer and gives a number. That's regular programming. But with AI, it's different. Imagine you're trying to create a program that looks at pictures of skin and tells if someone has a rash or not. Instead of telling the program exactly what every rash looks like, you show it thousands of skin pictures, some with rashes and some without. The AI learns by studying these photos and spotting patterns or differences. For a human, checking all those photos would be tough, but AI can do it quickly. Once trained, the AI can check new skin photos on its own. But if it doesn't see new pictures regularly, it won't keep learning.\n" +
            " \n" +
            "5.     The role of the human remains crucial. \n" +
            "Although AI is being increasingly used in hospitals and healthcare, doctors’ roles are still important for many reasons. Firstly, doctors should always review the outcomes of AI systems to make sure that there are no potential mistakes. Secondly, some medical cases are unique or they rarely happen, so AI couldn’t learn about them. So, these special cases need expert doctors to make the right diagnosis based on their previous experiences. Finally, doctors can understand the patients' feelings better than AI systems.\n" +
            "  \n" +
            "6.     Are AI machines smarter than humans?\n" +
            "There are some differences between artificial intelligence and human intelligence. For example, AI systems can analyse and learn from patients’ data very quickly which will take a long time for doctors. However, doctors can think in a more flexible way. They could often spot patients' behaviours better than AI systems.\n" +
            " \n" +
            "7.     The current limits and possibilities of AI.\n" +
            "Although artificial intelligence has facilitated our daily life, there are some limitations and possibilities to use it. For example, AI systems that are used in hospitals can solve problems based on identified data which sometimes is not enough for illness diagnosing. Also, AI systems can not realise their mistakes like humans which could sometimes be dangerous. On the other hand, intelligent systems can assist doctors to do the routine tasks which can save their as well as patients’ time who wait for treatment. For example, the AI system can read and discover the illness signs from the patient scan picture.\n" +
            " \n" +
            "The medicine and the future:\n" +
            " \n" +
            "1.     Technology changing medicine\n" +
            "Globally, many countries are updating their health systems to be based on AI due to many advantages. First, AI could reduce the cost of healthcare and the cost of patient travel by minimising the visits to clinics. Second, AI systems can help people to monitor their health and predict their possible illnesses, even in the long term. Finally, many healthcare providers could use virtual robots to provide their services while patients are at home.\n" +
            " \n" +
            "2.     AI and disease detection \n" +
            "Researchers at a US university developed an AI system to help identify patients at high risk of heart problems. They recognized that many heart patients faced dangers because there wasn't enough knowledge about their health problems. To fix this, they used AI to analyse data from hundreds of heart patients. They collected hundreds of heart images. They also created another AI system that analysed 10 years of data, considering factors like age and weight. Both AI systems were very accurate in predicting heart health risks. This shows that AI can play a crucial role in helping doctors prevent heart-related complications.\n" +
            " \n" +
            "It often takes doctors some time to study X-ray images. But researchers from two US groups made an AI tool that can look at X-ray results in just 10 seconds, which is very quick! They used this AI to make clearer pictures for people with lung problems. They trained the AI using 188,000 chest images to tell if someone has a lung issue. This fast and clear way of checking X-rays with AI might help doctors study other diseases, too.\n" +
            " \n" +
            "3.     AI and mental illness \n" +
            "Previously, more people were suffering from mental health problems. Researchers at Mayo Clinic made an AI tool to guess how well medicine for depression works. They tested it on kids and adults with depression, looking at 6 depression points and how they improved over 10 to 12 weeks. The AI was right about 76% of the time. This shows that AI can help in treating mental health issues.\n" +
            " \n" +
            "4.     Patients’ perspectives\n" +
            "Researchers at a US university found that many patients do not trust AI systems to get advice due to privacy reasons. For example, an AI doctor (robot) may sometimes ask the patient too many questions that would make her or him uncomfortable. Also, some patients may feel that AI systems are too far from reality.\n" +
            " \n" +
            "5.     Doctor’s perspectives \n" +
            "Researchers explained that doctors should know how AI systems “think” before applying them in their work, to avoid any risk. Also, researchers have discussed that many doctors do not know how to use those intelligent systems due to the shortage of their technical skills.\n" +
            " \n" +
            "6.     AI accuracy in medicine \n" +
            "AI is getting popular in health care, but it's not always perfect. Some researchers wanted to see if AI could identify lung problems by looking at chest photos from 5 different places across the world. They tested it with 158,000 pictures! But, the AI didn't work well in 3 of those countries. This shows that while AI can be helpful, it's important to test it a lot and use it carefully, especially in health care.\n" +
            " \n" +
            "In another study, researchers at two big universities found that using AI for medical images isn't perfect yet. They tested an AI program on a number of images and found mistakes. So, they warn doctors to be careful using AI-made pictures. However, AI can make clear medical images fast. This could mean patients spend less time using MRI devices, which is safer and more efficient. But for AI to work well in medicine, it needs to be accurate and stable. Programmers should check their AI programs well before using them in hospitals. Remember, the more data an AI looks at, the better it can get.\n" +
            " \n" +
            "7.     AI and data security in health field  \n" +
            "Many online AI systems can be tricked by hackers. Researchers found that hackers can change medical images, which might make doctors give the wrong advice to a patient. To help stop this, researchers made a smart AI tool that can tell if medical images have been changed. They also made another AI tool that can explain how these changes happened. The researchers found that many medical images were changed. This means researchers and engineers need to ensure that AI used in hospitals is safe from hackers.\n" +
            " \n" +
            "8.     How does hospitals in the future looks like with AI\n" +
            "In the future hospitals, AI systems might play a huge role in patient care. When a patient first arrives, AI can assist doctors in understanding symptoms quickly and in recommending treatments. As the patient gets better, the system might adjust its advice, trusting the doctor's judgement more. For instance, if the AI suggests a particular medicine, but the doctor, with her or his experience, believes another medicine  is more suitable, the AI system gets updated and learns from the doctor’s choice. Over time, the AI gets to understand more about the doctor's approach, making the doctor-AI collaboration smoother. As a result, AI adapts to doctor’s expertise, ensuring the best care for patients.\n";
    public static String CELLA_MONASH_MEDICINE_SCAFFOLD_PROMPT = "Scaffold:\n" +
            "\n" +
            "Up until this point in the learning session, students who performed well in this task made sure they had already started adding novel information in their own words, based on the reading material. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style (don't use the bullet points and numbered lists) feedback on how to expand on the information they used from reading materials. The student should do this in their own words.\n" +
            "\n" +
            "\n" +
            "Please don’t advise the student on conditions listed above, just provide advice on how to expand on the information they used from reading materials.\n" +
            "\n" +
            "For this feedback, please follow the effective feedback framework. It is learner-centred and it should include three main components: \n" +
            "1. Highlight both strengths and weaknesses of the student’s performance in relation to what they did in the task so far. This should come from conditions listed above.\n" +
            "2. Focus on the future impact by providing comments with actionable information to help the student achieve the learning outcomes for the task. This should come from the advice listed above.\n" +
            "3. Support the student to feel in control of their learning, attend to their social, emotional and motivational needs, and encourage them to be open to evaluative comments.\n" +
            "\n" +
            "The feedback should not exceed 50 words.\n";
}
