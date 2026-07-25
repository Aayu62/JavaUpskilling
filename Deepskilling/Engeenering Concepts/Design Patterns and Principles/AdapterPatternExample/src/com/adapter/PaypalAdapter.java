package com.adapter;

public class PaypalAdapter implements PaymentProcessor {
    private PaypalGateway paypalGateway;

    public PaypalAdapter(){
        this.paypalGateway = new PaypalGateway();
    }

    @Override
    public void processPayment(double amount){
        paypalGateway.sendPayment(amount);
    }
    
}
