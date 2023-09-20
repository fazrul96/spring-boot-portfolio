package com.example.demo.service;

import com.example.demo.model.Certification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CertificationServiceImpl implements CertificationService {

    @Override
    public List<Certification> getCertifications() {
        return createListOfCertifications();
    }

    private List<Certification> createListOfCertifications() {
        List<Certification> certifications = new ArrayList<>();

        String[][] certificationData = {
                {
                        "Android Certified Application Developer",
                        "Android ATC",
                        "Oct 2017",
                        "ATC1001761",
                        "http://androidatc.com/_transcript.php?action=transcript",
                        "https://androidatc.com/template/style/img/new_theme/logo.png"
                },
                {
                        "Certified Professional Requirements Engineer (CPRE-FL)",
                        "IREB",
                        "Jan 2017",
                        "MY-CPRE-FL-2017-00007",
                        "http://www.mstb.org/IREB.php",
                        "https://th.bing.com/th/id/R.cd12ed352bce0c80fc5fcf5c9e81d991?rik=9WE5d%2bkNI9KbOQ&riu=http%3a%2f%2fwww.gripoprequirements.nl%2fimg%2flogo-ireb.jpg&ehk=EwXrzLBz%2btzxziwTZfDWobZqQfiu9bWESXGA2u5Jqr0%3d&risl=&pid=ImgRaw&r=0"
                }
        };

        // Loop through the certification data and create Certification instances
        for (int id = 1; id <= certificationData.length; id++) {
            String[] data = certificationData[id - 1]; // Get certification data for the current ID
            certifications.add(new Certification(id, data[0], data[1], data[2], data[3], data[4], data[5]));
        }

        return certifications;
    }
}