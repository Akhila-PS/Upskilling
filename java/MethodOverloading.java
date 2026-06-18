public class MethodOverloading {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        MethodOverloading obj = new MethodOverloading();
        System.out.println("Sum of 5 + 10 = " + obj.add(5, 10));
        System.out.println("Sum of 5.5 + 10.5 = " + obj.add(5.5, 10.5));
        System.out.println("Sum of 5 + 10 + 15 = " + obj.add(5, 10, 15));
    }
}