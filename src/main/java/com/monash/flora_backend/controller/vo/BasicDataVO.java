package com.monash.flora_backend.controller.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

@Data
@AllArgsConstructor
public class BasicDataVO  implements Serializable {
    private ArrayList<Integer> wordCountList = new ArrayList<>();
    private ArrayList<Integer> grammarErrorCountList = new ArrayList<>();
    private ArrayList<Integer> writingErrorCountList = new ArrayList<>();
    private ArrayList<Integer> originalityCountList = new ArrayList<>();
    private ArrayList<Integer> totalScoreList = new ArrayList<>();
    private HashMap<String, ResultVO> resultMap = new HashMap<>();

    public BasicDataVO() {

    }
}
