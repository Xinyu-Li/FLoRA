package com.monash.flora_backend.fit5145_send_email;

import cn.hutool.core.util.StrUtil;
import com.monash.flora_backend.FLoRaBackendApplicationTests;
import com.monash.flora_backend.controller.vo.UserChatgptLogVO;
import com.monash.flora_backend.service.IUserChatgptLogService;
import com.monash.flora_backend.service_func.AsyncTaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.InaccessibleObjectException;
import java.util.List;
import java.util.Random;

/**
 * @author Xinyu Li
 * @date 3/6/2024
 */
public class AsyncTaskServiceTest extends FLoRaBackendApplicationTests {

    @Autowired
    private AsyncTaskService asyncTaskService;

    private String[][] studentsEmailPassword = {};

    private static String[][] studentEmailId = {
            {"xinyu.li1@monash.edu", "111111"},
            {"guanliang.chen@monash.edu", "221111"}
    };

    private static String[][] studentEmailFirstname = {

};

    private String generate8RandomChar() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Create a StringBuilder to build the random string
        StringBuilder stringBuilder = new StringBuilder();

        // Create an instance of Random class
        Random random = new Random();

        // Generate a random 8-character string
        for (int i = 0; i < 8; i++) {
            // Pick a random index from chars string
            int randomIndex = random.nextInt(chars.length());

            // Append the character at randomIndex in chars to the StringBuilder
            stringBuilder.append(chars.charAt(randomIndex));
        }

        // Convert the StringBuilder to String
        return stringBuilder.toString();
    }



    @Test
    public void generatePassword() {
        for (int i = 0; i < studentsEmailPassword.length; i++) {
            String[] emailPassword = studentsEmailPassword[i];
            String email = emailPassword[0];
            String password = emailPassword[1];
//            System.out.println("{\"" + email + "\", \"" + generate8RandomChar() + "\"},");
            System.out.println(password);
        }
    }

    @Autowired
    private IUserChatgptLogService iUserChatgptLogService;

    @Test
    public void testGenerateDataFile() {
        for (int i = studentEmailId.length - 1; i >= 0; i--) {
            String[] emailId = studentEmailId[i];
            String email = emailId[0];
            Long studentId = Long.parseLong(emailId[1]);

            List<UserChatgptLogVO> userChatgptLogVOList = iUserChatgptLogService.findAllChatgptLogByUserIdAndCourseId(studentId, "26");
            System.out.println("userChatgptLogVOList size:" + userChatgptLogVOList.size());
            if (userChatgptLogVOList.isEmpty()) {
                System.out.println("email:" + email + ", id:" + studentId + "-----empty");
                continue;
            }

            // 写入文件，用email作为文件名
            String filePath = "C:\\Users\\xlii0161\\Downloads\\guanliang\\" + email + ".csv";
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
                for (UserChatgptLogVO vo: userChatgptLogVOList) {

                    writer.write(vo.getId() + "," + vo.getUserId() + "," + vo.getUserQuestions() + "," + vo.getChatgptAnswer() + "\n");
                    System.out.println("write:" + vo.getId() + "," + vo.getUserId());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void testSendEmailAboutData() {
        for (int i = studentsEmailPassword.length - 1; i >= 0; i--) {
            String[] emailPassword = studentsEmailPassword[i];
            String email = emailPassword[0];
            String password = emailPassword[1];

            String content = "Dear All,\n" +
                    "\n" +
                    "To accomplish Assignment 1 in FIT5145, please use the following login credentials to access the FLoRA platform:\n" +
                    "Username: " + email + "\n" +
                    "Password: " + password + "\n" +
                    "FLoRA Address: https://www.floraengine.org/moodle\n" +
                    "\n" +
                    "For any technical issues in using FLoRA, please contact guanliang.chen@monash.edu and xinyu.li1@monash.edu \n" +
                    "\n" +
                    "Best regards,\n" +
                    "Guanliang Chen & Xinyu Li";

//            asyncTaskService.sendEmailWithFile(email, "FIT5145 Assignment1 Data", content, "filepath");
        }
    }

    @Test
    public void testSendEmail() {


        for (int i = studentsEmailPassword.length - 1; i >= 0; i--) {
            String[] emailPassword = studentsEmailPassword[i];
            String email = emailPassword[0];
            String password = emailPassword[1];

            String content = "Dear All,\n" +
                    "\n" +
                    "To accomplish Assignment 1 in FIT5145, please use the following login credentials to access the FLoRA platform:\n" +
                    "Username: " + email + "\n" +
                    "Password: " + password + "\n" +
                    "FLoRA Address: https://www.floraengine.org/moodle\n" +
                    "\n" +
                    "For any technical issues in using FLoRA, please contact guanliang.chen@monash.edu and xinyu.li1@monash.edu \n" +
                    "\n" +
                    "Best regards,\n" +
                    "Guanliang Chen & Xinyu Li";

//            asyncTaskService.sendEmail(email, "FIT5145 Assignment1", content);
        }
//        String email = "lixinyu@gmail.com";
//        String password = "123123";
//
//        asyncTaskService.sendEmail("lixinyu6688558@gmail.com", "FIT5145 Assignment1", content);
//        asyncTaskService.sendEmail("guanliang.chen@monash.edu", "FIT5145 Assignment1", "this is the main message");
    }

    @Test
    public void testSendEmailForDataAnalysis() {
//        Set<Integer> studentIdSet = Set.of(
//                1849, 1827, 1465, 1463, 1461, 1460, 1452, 1449, 1424, 1417,
//                1415, 1412, 1406, 1402, 1380, 1369, 1356, 1332, 1327, 1321,
//                1320, 1274, 1256, 1185, 1161, 1157, 1124, 1116, 1115, 1110,
//                1855, 1843, 1828, 1487, 1437, 1434, 1416, 1400, 1390, 1374,
//                1368, 1358, 1342, 1325, 1286, 1282, 1257, 1255, 1253, 1246,
//                1242, 1219, 1202, 1175, 1155, 1151, 1140, 1132, 1129, 1125,
//                1863, 1862, 1861, 1859, 1858, 1857, 1853, 1850, 1846, 1840,
//                1839, 1837, 1833, 1832, 1830, 1829, 1826, 1825, 1824, 1820,
//                1818, 1815, 1494, 1493, 1491, 1489, 1488, 1486, 1485, 1482,
//                1476, 1471, 1470, 1462, 1457, 1456, 1450, 1446, 1445, 1443,
//                1442, 1441, 1439, 1438, 1436, 1433, 1432, 1431, 1426, 1413,
//                1407, 1405, 1399, 1397, 1388, 1382, 1381, 1376, 1375, 1371,
//                1361, 1355, 1354, 1353, 1352, 1348, 1345, 1343, 1340, 1339,
//                1335, 1333, 1317, 1315, 1313, 1311, 1310, 1304, 1303, 1301,
//                1300, 1293, 1291, 1288, 1279, 1275, 1270, 1268, 1267, 1266,
//                1264, 1261, 1258, 1254, 1249, 1244, 1240, 1235, 1233, 1232,
//                1231, 1228, 1227, 1222, 1221, 1220, 1218, 1213, 1210, 1207,
//                1205, 1203, 1200, 1198, 1196, 1194, 1191, 1190, 1187, 1182,
//                1181, 1171, 1164, 1160, 1156, 1154, 1150, 1148, 1139, 1135,
//                1133, 1126, 1123, 1122, 1120, 1117, 1113, 1111, 1109
//
//
//        );

        for (int i = studentEmailFirstname.length - 1; i >= 0; i--) {
            String[] emailId = studentEmailFirstname[i];
            String email = emailId[1];
//            String studentId = emailId[0];
            String firstname = emailId[0];
//            String content = "Dear FIT5145 students,\n" +
//                    "\n" +
//                    "Hope everything is well with you. " +
//                    "For Assignment 4, you need to analyse your own dialogue with the FLoRA chatbot " +
//                    "and the Dialogue_ID of your dialogue is " + studentId + ".\n" +
//                    "\n" +
//                    "Please feel free to let us know if you have any questions.\n" +
//                    "\n" +
//                    "Best regards,\n" +
//                    "Xinyu & Guanliang";
            String content = "Dear " + firstname + ",\n" +
                    "\n" +
                    "I hope everything is well with you. In case you have not filled out the SETU surveys for FIT5145 yet, if you have time, could you please provide us with your valuable feedback via the following link and help us improve? Currently, only a small number of students have responded to the survey. If you have already done this, please ignore my email. \uD83D\uDE42\n" +
                    "\n" +
                    "https://my-monash-bc.bluera.com/sv.aspx?pid=4ddef503-3c84-4600-b1a0-8c034bc2e457&sid=bc8351d6afb975d6292eaa154f9504ad&tid=9bd56560ad3f872986b55a69baa76def&uid=1e60b7c2d626a92e31625df5dd52bcd2&gid=14EB4536-9F00-4AC5-B8C6-685A3339BB4C&regl=en-US" +
                    "\n\n" +
                    "Thanks! Good luck with your future data science journey and please feel free to let me know if there is any help I can provide (even after this semester).\n" +
                    "\n" +
                    "Best regards,\n" +
                    "Guanliang";
//            if (studentIdSet.contains(Integer.parseInt(studentId))) {
//                if (studentId.equals("111111") || studentId.equals("221111")) {
//            asyncTaskService.sendEmail(email, "FIT5145 SETU Survey Reminder", content);
//                }
//            }
        }
    }
}
