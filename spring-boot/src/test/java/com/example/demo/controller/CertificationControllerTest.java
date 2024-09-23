package com.example.demo.controller;

import com.example.demo.data.entity.Certification;
import com.example.demo.service.modules.CertificationService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CertificationControllerTest {
    @InjectMocks
    private CertificationController certificationController;
    @Mock
    private CertificationService certificationService;

    @Test
    public void testGetCertifications() {
        List<Certification> mockCertifications = new ArrayList<>();
        Certification certification = new Certification();

        certification.setId(1);
        certification.setCredId("ATC1001761");
        certification.setIssuedDate("Oct 2017");
        certification.setTitle("Android Certified Application Developer");
        certification.setName("Android ATC");
        certification.setReference("http://androidatc.com/_transcript.php?action=transcript");
        certification.setLogo("https://androidatc.com/template/style/img/new_theme/logo.png");
        mockCertifications.add(certification);

        when(certificationService.getCertifications()).thenReturn(mockCertifications);
        List<Certification> actualCertifications = certificationController.getCertifications();

        assertEquals(mockCertifications.size(), actualCertifications.size());
        assertEquals(mockCertifications.get(0).getId(), actualCertifications.get(0).getId());
        assertEquals(mockCertifications.get(0).getCredId(), actualCertifications.get(0).getCredId());
        assertEquals(mockCertifications.get(0).getIssuedDate(), actualCertifications.get(0).getIssuedDate());
        assertEquals(mockCertifications.get(0).getTitle(), actualCertifications.get(0).getTitle());
        assertEquals(mockCertifications.get(0).getName(), actualCertifications.get(0).getName());
        assertEquals(mockCertifications.get(0).getReference(), actualCertifications.get(0).getReference());
        assertEquals(mockCertifications.get(0).getLogo(), actualCertifications.get(0).getLogo());

        when(certificationService.getCertificationById(1)).thenReturn(certification);
        Certification actualCertification = certificationController.getCertificationById(1);

        assertNotNull(actualCertification);
        assertEquals(mockCertifications.get(0).getId(), actualCertification.getId());
        assertEquals(mockCertifications.get(0).getCredId(), actualCertification.getCredId());
        assertEquals(mockCertifications.get(0).getIssuedDate(), actualCertification.getIssuedDate());
        assertEquals(mockCertifications.get(0).getTitle(), actualCertification.getTitle());
        assertEquals(mockCertifications.get(0).getName(), actualCertification.getName());
        assertEquals(mockCertifications.get(0).getReference(), actualCertification.getReference());
        assertEquals(mockCertifications.get(0).getLogo(), actualCertification.getLogo());
    }
}
