package com.fe.atom;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.fe.atom"})
@MapperScan("com.fe.atom.mapper")
public class KnoveApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnoveApplication.class, args);
	}
}
