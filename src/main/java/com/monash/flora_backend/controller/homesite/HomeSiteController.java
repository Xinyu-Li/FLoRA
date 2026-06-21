package com.monash.flora_backend.controller.homesite;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Xinyu Li
 * @date 3/8/2024
 */
@Slf4j
@RestController
@AllArgsConstructor
public class HomeSiteController {
    private static List<String> publicationList = List.of(
            "Lim, L., Bannert, M., van der Graaf, J., Molenaar, I., Fan, Y., Kilgour, J., Moore, J. and Gašević, D. (2021). Temporal Assessment of Self-Regulated Learning by Mining Students’ Think-Aloud Protocols. Frontiers in Psychology, 12. ;;;;;https://www.frontiersin.org/articles/10.3389/fpsyg.2021.749749/full"
    );

}
