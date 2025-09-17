package com.monash.flora_backend.exception;



/**
 * ClassName: BusinessExceptionEnum
 * Description:
 *
 * @author Xinyu Li
 * @since 5/17/2023 9:14 PM
 */

public enum BusinessExceptionEnum {
    FLORA_USER_USERNAME_EXIST("Add flora user error, username exist."),
    FLORA_USER_USERNAME_NOT_EXIST("username not exist, contact admin"),
    FLORA_USER_PASSWORD_INVALID("password invalid, please try again");

    private String desc;

    BusinessExceptionEnum(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "BusinessExceptionEnum{" +
                "desc='" + desc + '\'' +
                '}';
    }
}
