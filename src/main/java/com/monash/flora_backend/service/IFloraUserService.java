package com.monash.flora_backend.service;

import com.monash.flora_backend.dao.entity.FloraUser;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.Optional;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-24
 */
public interface IFloraUserService extends IService<FloraUser> {
    Optional<FloraUser> findByUsername(String username);
}
