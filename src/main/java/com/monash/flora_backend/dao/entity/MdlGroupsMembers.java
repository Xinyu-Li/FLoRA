package com.monash.flora_backend.dao.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
/**
 * <p>
 * Link a user to a group.
 * </p>
 *
 * @author xinyu
 * @since 2023-10-15
 */
public class MdlGroupsMembers extends Model<MdlGroupsMembers> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private Long groupid;

    private Long userid;

    private Long timeadded;

    private String component;

    private Long itemid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupid() {
        return groupid;
    }

    public void setGroupid(Long groupid) {
        this.groupid = groupid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getTimeadded() {
        return timeadded;
    }

    public void setTimeadded(Long timeadded) {
        this.timeadded = timeadded;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Long getItemid() {
        return itemid;
    }

    public void setItemid(Long itemid) {
        this.itemid = itemid;
    }

    @Override
    protected Serializable pkVal() {
        return null;
    }

    @Override
    public String toString() {
        return "MdlGroupsMembers{" +
        ", id=" + id +
        ", groupid=" + groupid +
        ", userid=" + userid +
        ", timeadded=" + timeadded +
        ", component=" + component +
        ", itemid=" + itemid +
        "}";
    }
}
