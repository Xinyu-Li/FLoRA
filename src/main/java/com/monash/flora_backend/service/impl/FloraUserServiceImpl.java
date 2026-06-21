package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.FloraUser;
import com.monash.flora_backend.dao.mapper.FloraUserMapper;
import com.monash.flora_backend.service.IFloraUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-24
 */
@Slf4j
@Service
public class FloraUserServiceImpl extends ServiceImpl<FloraUserMapper, FloraUser> implements IFloraUserService {

    @Override
    public Optional<FloraUser> findByUsername(String username) {
        log.info("find By username =======: " + username);
        QueryWrapper<FloraUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        return Optional.ofNullable(super.getOne(queryWrapper));
    }
}
