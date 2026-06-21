package com.monash.flora_backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.monash.flora_backend.dao.entity.FloraUserLoginToken;

import java.util.List;
import java.util.Optional;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-24
 */
public interface IFloraUserLoginTokenService extends IService<FloraUserLoginToken> {
    Optional<FloraUserLoginToken> findByToken(String token);
    List<FloraUserLoginToken> findAllValidTokenByUser(Long userId);
}
