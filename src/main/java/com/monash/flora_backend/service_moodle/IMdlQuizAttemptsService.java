package com.monash.flora_backend.service_moodle;

import com.monash.flora_backend.controller.vo.MdlQuizVO;
import com.monash.flora_backend.dao.entity.MdlQuizAttempts;
import com.baomidou.mybatisplus.extension.service.IService;
import java.util.List;
/**
 * <p>
 * Stores users attempts at quizzes. 服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-10-26
 */
public interface IMdlQuizAttemptsService extends IService<MdlQuizAttempts> {
    MdlQuizVO findUserTakePreviousStudy(String quizName, Long courseId, Long userId);
    List <MdlQuizVO> getQuizResponseAllUser(String quizName, Long courseId); //added by Lin

}
