package com.adapter;

public class RazorpayAdapter implements PaymentProcessor{
    private RazorpayGateway razorpayGateway;

    public RazorpayAdapter(){
        this.razorpayGateway = new RazorpayGateway();
    }

    @Override
    public void processPayment(double amount){
        razorpayGateway.makePayment(amount);
    }
    
}
