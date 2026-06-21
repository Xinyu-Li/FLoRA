package com.monash.flora_backend;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONUtil;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSRLPromptVO;
import com.monash.flora_backend.controller.vo.manage.NeedCheckSubActionPromptVO;
import com.monash.flora_backend.controller.vo.manage.ThresholdPromptVO;
import com.monash.flora_backend.service.IConfigGenericoTemplateService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Xinyu Li
 * @date 2/18/2024
 */
public class ConfigGenericoTemplateServiceTest extends FLoRaBackendApplicationTests{
    @Autowired
    private IConfigGenericoTemplateService iConfigGenericoTemplateService;
    @Test
    public void test() {
        List<NeedCheckSubActionPromptVO> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            NeedCheckSubActionPromptVO temp = new NeedCheckSubActionPromptVO();
            temp.setSubAction("SubAction" + i);
            temp.setNotExistPrompt("asssss" + i);
            temp.setExistPrompt("");
            temp.setThreshold(0 + 1);
            temp.setAppearOverThresholdPrompt("");
            temp.setAppearLessThanEqualThresholdPrompt("");

            list.add(temp);
        }

        System.out.println(JSONUtil.toJsonStr(list));

    }

    @Test
    public void test2() {
        String s = "[{\"threshold\": 0, \"prompt\": \"This student has a high level of knowledge about AI in medicine.\"},\n" +
                "            {\"threshold\": 5, \"prompt\": \"This student has a low level of knowledge about AI in medicine.\"},\n" +
                "            {\"threshold\": 10, \"prompt\": \"This student has a medium level of knowledge about AI in medicine.\"}];\n";

        List<ThresholdPromptVO> list = JSONUtil.toList(s, ThresholdPromptVO.class);
        System.out.println(list);
    }


    @Test
    public void test3() {
        String s = "[\n" +
                "        [\n" +
                "            {\n" +
                "                \"srlProcess\": \"CSAR1\",\n" +
                "                \"notExistPrompt\": \"Learner has not familiarized themselves with table of the learning content.\",\n" +
                "                \"existPrompt\":\"Learner has familiarized themselves with table of the learning content.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CSAR2\",\n" +
                "                \"notExistPrompt\": \"\",\n" +
                "                \"existPrompt\":\"\",\n" +
                "                \"threshold\": 1,\n" +
                "                \"appearOverThresholdPrompt\": \"Learner has tried out all the learning tools.\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"Learner has not tried out all the learning tools.\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CSTR1\",\n" +
                "                \"notExistPrompt\": \"Learner has not made a highlight or note about the task instructions or evaluation rubric.\",\n" +
                "                \"existPrompt\":\"Learner made a highlight or note about the task instructions or evaluation rubric.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CSTR2\",\n" +
                "                \"notExistPrompt\": \"Learner has not visited task instructions or evaluation rubric.\",\n" +
                "                \"existPrompt\":\"Learner has visited task instructions or evaluation rubric.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CMTC1\",\n" +
                "                \"notExistPrompt\": \"Learner has not overseen the time left for the task.\",\n" +
                "                \"existPrompt\":\"Learner has overseen the time left for the task.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "        ], [\n" +
                "            {\n" +
                "                \"srlProcess\": \"OM1\",\n" +
                "                \"notExistPrompt\": \"Learner has not labeled an annotation.\",\n" +
                "                \"existPrompt\": \"Learner has labeled an annotation.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"OM2\",\n" +
                "                \"notExistPrompt\": \"Learner has not created a highlight.\",\n" +
                "                \"existPrompt\": \"Learner has created a highlight.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"OM3\",\n" +
                "                \"notExistPrompt\": \"Learner has not read or deleted an annotation.\",\n" +
                "                \"existPrompt\": \"Learner has read or deleted an annotation.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CMTR1\",\n" +
                "                \"notExistPrompt\": \"Learner has not revisited task instruction or evaluation rubric after writing.\",\n" +
                "                \"existPrompt\": \"Learner has revisited task instruction or evaluation rubric after writing.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CMTR2\",\n" +
                "                \"notExistPrompt\": \"Learner has not revisited task instructions or evaluation rubric.\",\n" +
                "                \"existPrompt\": \"Learner has revisited task instructions or evaluation rubric.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"CMTC1\",\n" +
                "                \"notExistPrompt\": \"Learner has not overseen the time left for the task.\",\n" +
                "                \"existPrompt\": \"Learner has overseen the time left for the task.\",\n" +
                "                \"threshold\": 3,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            }\n" +
                "\n" +
                "        ], [\n" +
                "            {\n" +
                "                \"srlProcess\": \"OA2\",\n" +
                "                \"notExistPrompt\": \"In this current essay draft, learner has not created any of assembling sentences that assemble together a meaningful composite of two or more units of information from the source material.\",\n" +
                "                \"existPrompt\": \"In this current essay draft, learner has created ;;;SRL_PROCESS_NUMBER;;; of assembling sentences that assemble together a meaningful composite of two or more units of information from the source material.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"OR2\",\n" +
                "                \"notExistPrompt\": \"In this current essay draft, learner has not created any of rehearsing sentences that copied information from the source material.\",\n" +
                "                \"existPrompt\": \"In this current essay draft, learner has ;;;SRL_PROCESS_NUMBER;;; of rehearsing sentences that copied information from the source material.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            },\n" +
                "            {\n" +
                "                \"srlProcess\": \"OT2\",\n" +
                "                \"notExistPrompt\": \"In this current essay draft, the learner has not created any of translating sentences which have manipulated the source materials to their own words while preserving critical informational properties.\",\n" +
                "                \"existPrompt\": \"In this current essay draft, the learner has ;;;SRL_PROCESS_NUMBER;;; of translating sentences which have manipulated the source materials to their own words while preserving critical informational properties.\",\n" +
                "                \"threshold\": 0,\n" +
                "                \"appearOverThresholdPrompt\": \"\",\n" +
                "                \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
                "            }\n" +
                "        ]]\n" +
                "    ";
//        String s = "[{\n" +
//                "  \"srlProcess\": \"CMTR2\",\n" +
//                "  \"notExistPrompt\": \"Up until this point in the learning session, students who performed well in this task would double-check task instructions at least once. This doesn’t seem to be the case with this student. Could you please provide the student with paragraph-style feedback on how to make sure they checked task instructions and they do this regularly until the end of this writing session?\\n\\nPlease don’t advise the student on conditions listed above, just provide advice on how to check task instructions and keep doing this occasionally until the end of this writing session.\\n\\nFor this feedback, please follow the effective feedback framework. It is learner-centred and it should include three main components:\\n1. Highlight both strengths and weaknesses of the student’s performance in relation to what they did in the task so far. This should come from conditions listed above.\\n2. Focus on the future impact by providing comments with actionable information to help the student achieve the learning outcomes for the task. This should come from the advice listed above.\\n3. Support the student to feel in control of their learning, attend to their social, emotional and motivational needs, and encourage them to be open to evaluative comments.\\nThe feedback should not exceed 50 words.\",\n" +
//                "  \"existPrompt\": \"\",\n" +
//                "  \"threshold\": 0,\n" +
//                "  \"appearOverThresholdPrompt\": \"\",\n" +
//                "  \"appearLessThanEqualThresholdPrompt\": \"\"\n" +
//                "}]";
//        List<NeedCheckSRLPromptVO> list = JSONUtil.toList(s, NeedCheckSRLPromptVO.class);
//        NeedCheckSRLPromptVO t = JSONUtil.toBean(s, NeedCheckSRLPromptVO.class);

        JSONArray jsonArray = JSONUtil.parseArray(s);

        // 遍历外层数组，每个元素是一个内层数组
        for (Object innerArrayObj : jsonArray) {
            // 将内层数组解析为指定的Java对象列表
            List<NeedCheckSRLPromptVO> srlProcessList = JSONUtil.toList((JSONArray)innerArrayObj, NeedCheckSRLPromptVO.class);
            System.out.println(srlProcessList);
            // 现在可以处理srlProcessList了
        }

    }


    @Test
    public void testGenerate() {
        System.out.println(iConfigGenericoTemplateService.generateGenericoBody(123L));
    }
}
