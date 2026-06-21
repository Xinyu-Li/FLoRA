package com.monash.flora_backend.controller.handler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Xinyu Li
 * @date 6/6/2024
 */
public class ListLongHandler extends BaseTypeHandler<List<Long>> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<Long> parameter, JdbcType jdbcType) throws SQLException {
        String userIds = parameter.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        ps.setString(i, userIds);
    }

    @Override
    public List<Long> getNullableResult(java.sql.ResultSet rs, String columnName) throws SQLException {
        return null;
    }

    @Override
    public List<Long> getNullableResult(java.sql.ResultSet rs, int columnIndex) throws SQLException {
        return null;
    }

    @Override
    public List<Long> getNullableResult(java.sql.CallableStatement cs, int columnIndex) throws SQLException {
        return null;
    }

}
