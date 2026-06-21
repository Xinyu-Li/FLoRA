package com.monash.flora_backend.controller.vo;

import lombok.Data;

@Data
public class LabUserInteractionKeyEventsVO {

    private Long writingStartTimestamp;
    private String writingStartEventName;

    private Long genAiSendTimestamp;
    private String genAiSendEventName;

    private Long pasteToWritingTimestamp;
    private String pasteToWritingEventName;

    private Long copyFromGenAITimestamp;
    private String copyFromGenAiEventName;

    private Long scaffold1TriggerTimestamp;
    private String scaffold1TriggerEventName;

    private Long scaffold2TriggerTimestamp;
    private String scaffold2TriggerEventName;

    private Long scaffold3TriggerTimestamp;
    private String scaffold3TriggerEventName;

}