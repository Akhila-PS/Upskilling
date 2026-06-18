package java;
import java.util.Scanner;

public class simpleCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = sc.nextDouble();
        System.out.print("Enter second number: ");
        double num2 = sc.nextDouble();
        
        System.out.print("Choose operation (+, -, *, /): ");
        char op = sc.next().charAt(0);
        
        double result = switch (op) {
            case '+' -> num1 + num2;
            case '-' -> num1 - num2;
            case '*' -> num1 * num2;
            case '/' -> num2 != 0 ? num1 / num2 : Double.NaN;
            default -> {
                System.out.println("Invalid operation");
                yield 0;
            }
        };
        
        System.out.println("Result: " + result);
        sc.close();
    }
}