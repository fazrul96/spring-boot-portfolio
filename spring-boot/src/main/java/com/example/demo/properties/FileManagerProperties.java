package com.example.demo.properties;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Data
@ConfigurationProperties("batch.portfolio.file-manager")
public class FileManagerProperties {
    private String awsS3EndPoint;
    private String awsSecretEndPoint;
    private String region;
    private String sftpHost;
    private String sftpUsername;
    private int sftpPort;
    private String bucketNameSlift;
    private String tempFile;
    private String folderName;
    private String prefixKey;
    private String sftpKeyFilePath;
    private String errorFilePath;
    private String destFilePath;
    private String certFilePath;
    private String srcFilePath;
    private String sliftFilePath;
    private String sliftPassPhrase;
    private String sliftLibJarPath;
    private String sshAuthUser;
    private String sftpSshPkPath;
    private String sftpPassPhrase;
    private String sftpPrefixKey;
}
