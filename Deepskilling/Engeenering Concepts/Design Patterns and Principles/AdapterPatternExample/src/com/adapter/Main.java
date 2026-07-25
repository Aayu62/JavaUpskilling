package com.adapter;

public class Main {
    public static void main(String[] args) {
        PaymentProcessor razorpayAdapter = new RazorpayAdapter();
        razorpayAdapter.processPayment(1000);

        PaymentProcessor paypalAdapter = new PaypalAdapter();
        paypalAdapter.processPayment(5000);
    }
    
}
