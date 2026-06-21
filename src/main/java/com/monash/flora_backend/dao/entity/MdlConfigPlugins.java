package com.monash.flora_backend.dao.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;


/**
 * ClassName: MdlConfigPlugins
 * Description:
 *
 * @author Xinyu Li
 * @since 12/31/2022 12:52 PM
 */
public class MdlConfigPlugins extends Model<MdlConfigPlugins> {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String plugin;
    private String name;
    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlugin() {
        return plugin;
    }

    public void setPlugin(String plugin) {
        this.plugin = plugin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "MdlConfigPlugins{" +
                "id=" + id +
                ", plugin='" + plugin + '\'' +
                ", name='" + name + '\'' +
                ", value='" + value + '\'' +
                '}';
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }
}
