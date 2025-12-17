package com.monash.flora_backend;

import com.monash.flora_backend.constant.MyConstantCopesModelSRLPattern;
import com.monash.flora_backend.controller.vo.MdlFeedbackVO;
import com.monash.flora_backend.dao.entity.TraceData;
import com.monash.flora_backend.service_func.ActionAndProcessService;
import com.monash.flora_backend.service_func.GptScaffoldPromptService;
import com.monash.flora_backend.service_moodle.IMdlFeedbackService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GptScaffoldPromptServiceTest extends FLoRaBackendApplicationTests{
    @Autowired
    private ActionAndProcessService actionAndProcessService;
    @Autowired
    private GptScaffoldPromptService gptScaffoldPromptService;
    @Autowired
    private IMdlFeedbackService iMdlFeedbackService;
    @Test
    public void test() {
        long timeSpecifiedMinutePoint = 1763880240157L + 5 * 60 * 1000;
        List<String> processPatternBeforeSpecifiedMinList = MyConstantCopesModelSRLPattern.BEFORE_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
        List<String> processPatternAfterSpecifiedMinList = MyConstantCopesModelSRLPattern.AFTER_5MIN_COPES_MODEL_PROCESS_PATTERN_LIST;
        Map<String, String> srlProcessPatternRegexMap = MyConstantCopesModelSRLPattern.COPES_MODEL_PROCESS_PATTERN_REGEX_MAP;
//        String allActionString = "2286491--TABLE_OF_CONTENT=====2286485--PAGE_NAVIGATION=====2286486--TABLE_OF_CONTENT=====2286487--TABLE_OF_CONTENT=====2286490--TABLE_OF_CONTENT=====2286492--PAGE_NAVIGATION=====2286493--PAGE_NAVIGATION=====2286495--PAGE_NAVIGATION=====2286496--RELEVANT_READING=====2286497--RELEVANT_READING=====2286530--RELEVANT_READING=====2286531--TABLE_OF_CONTENT=====2286532--TABLE_OF_CONTENT=====2286541--TABLE_OF_CONTENT=====2286542--RELEVANT_READING=====2286543--RELEVANT_REREADING=====2286546--PAGE_NAVIGATION=====2286547--PAGE_NAVIGATION=====2286558--PAGE_NAVIGATION=====2286559--TABLE_OF_CONTENT=====2286560--TABLE_OF_CONTENT=====2286561--TABLE_OF_CONTENT=====2286562--PAGE_NAVIGATION=====2286563--PAGE_NAVIGATION=====2286591--PAGE_NAVIGATION=====2286592--TASK_REQUIREMENT=====2286593--TASK_REQUIREMENT=====2286594--TASK_REQUIREMENT=====2286595--TABLE_OF_CONTENT=====2286596--TABLE_OF_CONTENT=====2286600--TABLE_OF_CONTENT=====2286601--TASK_REQUIREMENT=====2286602--TASK_REQUIREMENT=====2286604--PAGE_NAVIGATION=====2286605--PAGE_NAVIGATION=====2286610--PAGE_NAVIGATION=====2286611--TABLE_OF_CONTENT=====2286612--TABLE_OF_CONTENT=====2286614--TABLE_OF_CONTENT=====2286615--PAGE_NAVIGATION=====2286616--PAGE_NAVIGATION=====2286622--PAGE_NAVIGATION=====2286623--TABLE_OF_CONTENT=====2286624--TABLE_OF_CONTENT=====2286626--TABLE_OF_CONTENT=====2286627--PAGE_NAVIGATION=====2286628--PAGE_NAVIGATION=====2286650--PAGE_NAVIGATION=====2286651--TABLE_OF_CONTENT=====2286652--TABLE_OF_CONTENT=====2286661--TABLE_OF_CONTENT=====2286662--PAGE_NAVIGATION=====2286663--PAGE_NAVIGATION=====2286675--PAGE_NAVIGATION=====2286676--TRY_OUT_TOOLS=====2286677--PAGE_NAVIGATION=====2286678--PAGE_NAVIGATION=====2286687--PAGE_NAVIGATION=====2286688--TABLE_OF_CONTENT=====2286689--TABLE_OF_CONTENT=====2286695--TABLE_OF_CONTENT=====2286696--TASK_REQUIREMENT=====2286697--TASK_REQUIREMENT=====2286698--PAGE_NAVIGATION=====2286699--PAGE_NAVIGATION=====2286718--PAGE_NAVIGATION=====2286719--RELEVANT_REREADING=====2286720--PAGE_NAVIGATION=====2286721--PAGE_NAVIGATION=====2286722--PAGE_NAVIGATION=====2286750--TRY_OUT_TOOLS=====2286723--READ_ESSAY=====2286724--READ_ESSAY=====2286726--READ_ESSAY=====2286727--WRITE_ESSAY=====2286728--WRITE_ESSAY=====2286730--WRITE_ESSAY=====2286731--WRITE_ESSAY_O.R.2=====2286732--WRITE_ESSAY_O.R.2=====2286734--WRITE_ESSAY_O.R.2=====2286735--READ_ESSAY=====2286736--READ_ESSAY=====2286740--READ_ESSAY=====2286741--SAVE_ESSAY=====2286742--READ_ESSAY=====2286743--READ_ESSAY=====2286749--READ_ESSAY=====2286751--TRY_OUT_TOOLS=====2286752--RELEVANT_REREADING=====2286753--RELEVANT_REREADING=====2286776--RELEVANT_REREADING=====2286777--OPEN_ESSAY=====2286778--RELEVANT_REREADING=====2286779--READ_ESSAY=====2286780--READ_ESSAY=====2286784--READ_ESSAY=====2286785--WRITE_ESSAY=====2286786--READ_ESSAY=====2286787--READ_ESSAY=====2286788--WRITE_ESSAY=====2286789--WRITE_ESSAY=====2286792--WRITE_ESSAY=====2286793--WRITE_ESSAY_O.R.2=====2286794--WRITE_ESSAY_O.R.2=====2286795--READ_ESSAY=====2286796--READ_ESSAY=====2286802--READ_ESSAY=====2286803--SAVE_ESSAY=====2286804--READ_ESSAY=====2286805--READ_ESSAY=====2286810--READ_ESSAY=====2286811--CLOSE_ESSAY=====2286812--RELEVANT_REREADING=====2286813--RELEVANT_REREADING=====2286814--RELEVANT_REREADING=====2286815--WRITE_ESSAY_O.R.2=====2286816--RELEVANT_REREADING=====2286817--RELEVANT_REREADING=====2286822--RELEVANT_REREADING=====2286823--TABLE_OF_CONTENT=====2286824--TABLE_OF_CONTENT=====2286827--TABLE_OF_CONTENT=====2286828--RELEVANT_REREADING=====2286829--RELEVANT_REREADING=====2286830--TABLE_OF_CONTENT=====2286831--TABLE_OF_CONTENT=====2286832--RELEVANT_REREADING=====2286833--RELEVANT_REREADING=====2286835--RELEVANT_REREADING=====2286836--TABLE_OF_CONTENT=====2286837--TABLE_OF_CONTENT=====2286839--TABLE_OF_CONTENT=====2286840--RELEVANT_REREADING=====2286841--RELEVANT_REREADING=====2286842--TABLE_OF_CONTENT=====2286843--RELEVANT_REREADING=====2286844--RELEVANT_REREADING=====2286930--RELEVANT_REREADING=====2286935--TABLE_OF_CONTENT=====2286936--TABLE_OF_CONTENT=====2286937--TABLE_OF_CONTENT=====2286938--RELEVANT_REREADING=====2286939--RELEVANT_REREADING=====";
        List<TraceData> needUpdateList = new ArrayList<>();
        List<TraceData> traceDataList = actionAndProcessService.getTraceDataFromRedisOrDB(1276L, "25", 1763880240157L, 0, 7);
        Map<Boolean, List<TraceData>> specifiedMinTimeGroupingMap = traceDataList.stream().collect(Collectors.groupingBy(x->Long.parseLong(x.getSaveTime()) <= timeSpecifiedMinutePoint));
        List<TraceData> beforeSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(true) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(true);
        List<TraceData> afterSpecifiedMinTraceDataList = specifiedMinTimeGroupingMap.get(false) == null ? new ArrayList<>() : specifiedMinTimeGroupingMap.get(false);
        List<String> srlProcessAppearListBeforeSpecifiedMin = actionAndProcessService.findSrlProcess(beforeSpecifiedMinTraceDataList, processPatternBeforeSpecifiedMinList, "copes", needUpdateList, srlProcessPatternRegexMap);
        List<String> srlProcessAppearListAfterSpecifiedMin = actionAndProcessService.findSrlProcess(afterSpecifiedMinTraceDataList, processPatternAfterSpecifiedMinList, "copes", needUpdateList, srlProcessPatternRegexMap);

        System.out.println(srlProcessAppearListBeforeSpecifiedMin);
        System.out.println(srlProcessAppearListAfterSpecifiedMin);
        /// [CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR1, CSAR2, CSAR2, CSAR2, CSTR2, CSTR2, CSTR2, OS3, OS3, OS3, OS3, OS3, OS3, OS3, OS3, OS3, OS3, OS3, OR2, OR2, OR2]
        /// [CSAR1, CSAR1, CSAR1, CSAR1, OS3, OS3]
    }
    @Test
    public void test2() {
        List feedbackVOList = iMdlFeedbackService.findMdlFeedbackVOByFeedbackNameAndCourseIdAndUserId("Activity 3: knowledge in learning tactics", 2L, 2723L);
        System.out.println(feedbackVOList.size());
        for (Object feedbackVO : feedbackVOList) {
            System.out.println((MdlFeedbackVO)feedbackVO);
        }
        int[] ints = gptScaffoldPromptService.maiCalculatorForHighEdu(feedbackVOList);
        System.out.println(Arrays.toString(ints));
    }
}
