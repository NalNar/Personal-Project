package com.store.demo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    @Value("${spring.application.name}")
    private String appName;


    @GetMapping("/")
    public String index(){
        return "forward:/index.html";

    }


    
}
