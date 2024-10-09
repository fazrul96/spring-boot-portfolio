package com.example.demo.controller;

import com.example.demo.data.entity.Certification;
import com.example.demo.service.modules.CertificationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CertificationControllerTest {

    @InjectMocks
    private CertificationController certificationController;

    @Mock
    private CertificationService certificationService;

    @Test
    public void testGetCertifications() {
        // Arrange
        Certification mockCertification = createMockCertification();
        List<Certification> mockCertifications = Collections.singletonList(mockCertification);

        // Mocking the service call
        when(certificationService.getAllCertifications()).thenReturn(mockCertifications);

        // Act
        ResponseEntity<List<Certification>> responseEntity = certificationController.getAllCertifications();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockCertifications.size(), responseEntity.getBody().size());
        assertCertificationEquals(mockCertification, responseEntity.getBody().get(0));
    }

    @Test
    public void testGetCertificationById() {
        // Arrange
        Certification mockCertification = createMockCertification();
        when(certificationService.getCertificationById(1)).thenReturn(mockCertification);

        // Act
        ResponseEntity<Certification> responseEntity = certificationController.getCertificationById(1);

        // Assert
        assertNotNull(responseEntity); // Check if responseEntity is not null
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode()); // Verify the status code is 200 OK
        assertNotNull(responseEntity.getBody()); // Check if the body is not null
        assertCertificationEquals(mockCertification, responseEntity.getBody()); // Compare the certification details
    }

    private Certification createMockCertification() {
        Certification certification = new Certification();
        certification.setId(1);
        certification.setCredId("ATC1001761");
        certification.setIssuedDate("Oct 2017");
        certification.setTitle("Android Certified Application Developer");
        certification.setName("Android ATC");
        certification.setReference("http://androidatc.com/_transcript.php?action=transcript");
        certification.setLogo("https://androidatc.com/template/style/img/new_theme/logo.png");
        return certification;
    }

    private void assertCertificationEquals(Certification expected, Certification actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getCredId(), actual.getCredId());
        assertEquals(expected.getIssuedDate(), actual.getIssuedDate());
        assertEquals(expected.getTitle(), actual.getTitle());
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getReference(), actual.getReference());
        assertEquals(expected.getLogo(), actual.getLogo());
    }
}