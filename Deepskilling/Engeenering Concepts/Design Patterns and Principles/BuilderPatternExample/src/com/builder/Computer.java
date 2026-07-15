package com.builder;

public class Computer {

    private String cpu;
    private int ram;
    private int storage;

    private Computer(Builder builder){
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
    }

    public void displayConfiguration() {
        System.out.println("Computer Configuration:");
        System.out.println("CPU: " + cpu);
        System.out.println("RAM: " + ram + " GB");
        System.out.println("Storage: " + storage + " GB");
    }

    public static class Builder {
        private String cpu;
        private int ram;
        private int storage;

        public Builder setCpu(String cpu){
            this.cpu = cpu;
            return this;
        }
        public Builder setRam(int ram){
            this.ram = ram;
            return this;
        }
        public Builder setStorage(int storage){
            this.storage = storage;
            return this;
        }

        public Computer build(){
            return new Computer(this);
        }
    }
    
}
