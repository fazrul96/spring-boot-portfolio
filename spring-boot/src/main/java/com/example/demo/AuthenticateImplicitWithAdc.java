//package com.example.demo;
//
//
//import com.google.api.gax.paging.Page;
//import com.google.cloud.storage.Bucket;
//import com.google.cloud.storage.Storage;
//import com.google.cloud.storage.StorageOptions;
//import java.io.IOException;
//
//public class AuthenticateImplicitWithAdc {
//
//    public static void main(String[] args) throws IOException {
//        String projectId = "springbootmap-404006";
//        authenticateImplicitWithAdc(projectId);
//    }
//
//    // When interacting with Google Cloud Client libraries, the library can auto-detect the
//    // credentials to use.
//    public static void authenticateImplicitWithAdc(String project) throws IOException {
//
//        // *NOTE*: Replace the client created below with the client required for your application.
//        // Note that the credentials are not specified when constructing the client.
//        // Hence, the client library will look for credentials using ADC.
//        //
//        // Initialize client that will be used to send requests. This client only needs to be created
//        // once, and can be reused for multiple requests.
//        Storage storage = StorageOptions.newBuilder().setProjectId(project).build().getService();
//
//        System.out.println("Buckets:");
//        Page<Bucket> buckets = storage.list();
//        for (Bucket bucket : buckets.iterateAll()) {
//            System.out.println(bucket.toString());
//        }
//        System.out.println("Listed all storage buckets.");
//    }
//}