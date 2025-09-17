package com.monash.flora_backend.controller.vo;

import com.monash.flora_backend.dao.entity.*;
import lombok.Data;

import java.util.List;

/**
 * ClassName: GenericoTemplateVO
 * Description:
 *
 * @author Xinyu Li
 * @since 2/15/2024 11:30 AM
 */
@Data
public class GenericoTemplateVO {
    private ConfigGenericoTemplate configGenericoTemplate;
    private List<ConfigAnnotationLabelColor> configAnnotationLabelColorList;
    private List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSubActionList;
    private List<ConfigGptScaffoldSubActionOrSrlProcess> configGptScaffoldSrlProcessList;
    private List<ConfigIsdimuScorePrompt> configIsdimuScorePromptList;
    private List<ConfigPlanner> configPlannerList;
    private List<ConfigPretestGradePrompt> configPretestGradePromptList;
    private List<ConfigRuleBasedScaffold> configRuleBasedScaffoldList;
}
