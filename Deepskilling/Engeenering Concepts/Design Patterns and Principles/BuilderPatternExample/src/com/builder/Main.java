package com.builder;

public class Main {
    public static void main(String[] args){

        Computer computer = new Computer.Builder()
                .setCpu("Intel i7")
                .setRam(16)
                .setStorage(512)
                .build();
        
        computer.displayConfiguration();
    }
    
}
