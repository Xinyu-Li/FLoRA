package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * modules available in the site
 * </p>
 *
 * @author xinyu
 * @since 2023-09-15
 */
public class MdlModules extends Model<MdlModules> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String name;

    private Long cron;

    private Long lastcron;

    private String search;

    private Boolean visible;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCron() {
        return cron;
    }

    public void setCron(Long cron) {
        this.cron = cron;
    }

    public Long getLastcron() {
        return lastcron;
    }

    public void setLastcron(Long lastcron) {
        this.lastcron = lastcron;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlModules{" +
        ", id=" + id +
        ", name=" + name +
        ", cron=" + cron +
        ", lastcron=" + lastcron +
        ", search=" + search +
        ", visible=" + visible +
        "}";
    }
}
