package com.yusufcakal.userapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class UserAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserAppApplication.class, args);
	}
}
