package com.gamesrentall.renta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RentaApplication {
    public static void main(String[] args) {
        SpringApplication.run(RentaApplication.class, args);
    }
}
