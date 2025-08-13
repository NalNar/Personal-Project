import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {
        record Person(String name, int age) {}
        Gson gson = new Gson();
        
        // Object to JSON
        String json = gson.toJson(new Person("Alice", 25));
        System.out.println("JSON: " + json);

        // JSON to Object
        Person p2 = gson.fromJson(json, Person.class);
        System.out.println("Name: " + p2.name() + ", Age: " + p2.age());
    }
}
