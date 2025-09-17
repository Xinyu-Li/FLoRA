package com.monash.flora_backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.monash.flora_backend.dao.entity.FloraUserLoginToken;
import com.monash.flora_backend.dao.mapper.FloraUserLoginTokenMapper;
import com.monash.flora_backend.service.IFloraUserLoginTokenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author xinyu
 * @since 2023-09-24
 */
@Service
public class FloraUserLoginTokenServiceImpl extends ServiceImpl<FloraUserLoginTokenMapper, FloraUserLoginToken> implements IFloraUserLoginTokenService {

    @Override
    public Optional<FloraUserLoginToken> findByToken(String token) {
        QueryWrapper<FloraUserLoginToken> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token);
        return Optional.ofNullable(super.getOne(queryWrapper));
    }

    @Override
    public List<FloraUserLoginToken> findAllValidTokenByUser(Long userId) {
        QueryWrapper<FloraUserLoginToken> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        return super.list(queryWrapper);

    }
}
