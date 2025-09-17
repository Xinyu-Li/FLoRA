package com.monash.flora_backend.dao.customize_entity;

import lombok.Data;

/**
 * <p>
 * Main questionnaire table.
 * </p>
 *
 * @author xinyu
 * @since 2023-09-29
 */
@Data
public class MdlQuestionnaireResponseRankResult extends MdlQuestionnaireResponseBaseResult {
    private Integer rankValue;

}
