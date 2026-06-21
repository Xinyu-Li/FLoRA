package com.monash.flora_backend;

import com.monash.flora_backend.controller.vo.AnnotationVO;
import com.monash.flora_backend.service.IAnnotationService;
import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ESTest extends FLoRaBackendApplicationTests{
    @Autowired
    private IAnnotationService iAnnotationService;
    @Test
    public void testSearchAnnotationByKeywordsAndUserId() {
        List<AnnotationVO> annotationVOList = iAnnotationService.searchAnnotationByKeywordsAndUserId("note", 97L, "");
        annotationVOList.forEach(System.out::println);
    }

    @Test
    public void testGPTTime() {
        String s1 = "1686126520239\n" +
                "1686126532578\n" +
                "1686126913289\n" +
                "1686127043866\n" +
                "1686127093033\n" +
                "1686127119486\n" +
                "1686127132460\n" +
                "1686127458832\n" +
                "1686135543712\n" +
                "1686135657889\n" +
                "1686135891444\n" +
                "1686195368778\n" +
                "1686195452227\n" +
                "1686195499123\n" +
                "1686195534136\n" +
                "1686195638420\n" +
                "1686195680554\n" +
                "1686298328407\n" +
                "1686374118976\n" +
                "1686374214251\n" +
                "1686374287423\n" +
                "1686374394534\n" +
                "1686374435502\n" +
                "1686374519379\n" +
                "1686374819781\n" +
                "1686374861763\n" +
                "1686374919466\n" +
                "1686374967350\n" +
                "1686375013414";
        String s2 = "1686126566803\n" +
                "1686126642208\n" +
                "1686126925578\n" +
                "1686127088530\n" +
                "1686127141134\n" +
                "1686127155984\n" +
                "1686127191570\n" +
                "1686127490570\n" +
                "1686135560808\n" +
                "1686135677297\n" +
                "1686135934851\n" +
                "1686195408705\n" +
                "1686195486631\n" +
                "1686195530322\n" +
                "1686195627345\n" +
                "1686195675772\n" +
                "1686195725843\n" +
                "1686298371364\n" +
                "1686374152346\n" +
                "1686374248618\n" +
                "1686374324208\n" +
                "1686374427339\n" +
                "1686374464502\n" +
                "1686374551845\n" +
                "1686374847984\n" +
                "1686374894739\n" +
                "1686374949775\n" +
                "1686375002959\n" +
                "1686375137455";
        String[] timeArray1 = s1.split("\n");
        String[] timeArray2 = s2.split("\n");
        for (int i = 0; i < timeArray1.length; i++) {
            DateTime dateTime = new DateTime(Long.parseLong(timeArray1[i]));
            String dateFormat = dateTime.toString("yyyy/MM/dd HH:mm:ss.SSS");
            System.out.println(dateFormat);

            DateTime dateTime2 = new DateTime(Long.parseLong(timeArray2[i]));
            String dateFormat2 = dateTime2.toString("yyyy/MM/dd HH:mm:ss.SSS");
            System.out.println(dateFormat2);
            System.out.println("---------------");
        }
    }
}
