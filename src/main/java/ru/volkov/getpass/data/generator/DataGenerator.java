package ru.volkov.getpass.data.generator;

import com.vaadin.flow.spring.annotation.SpringComponent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;
import ru.volkov.getpass.data.entity.*;
import ru.volkov.getpass.data.repository.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@SpringComponent
public class DataGenerator {

    private final PasswordEncoder passwordEncoder;
    private final ContactRepository contactRepository;
    private final CompanyRepository companyRepository;
    private final StatusRepository statusRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CarPassRepository carPassRepository;

    @Bean
    public CommandLineRunner loadData() {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (contactRepository.count() != 0L) {
                logger.info("\n<<< Using existing database >>>");
                return;
            }

            logger.info("Generating demo data");

            initOther();

            List<User> users = getUsers();
            List<CarPass> carPasses = getCarPasses();

            carPasses.stream().skip(0).limit(20).forEach(cp -> {
                cp.setCompany(users.get(2));
                cp.setCreator(users.get(4));
            });
            carPasses.stream().skip(20).limit(20).forEach(cp -> {
                cp.setCompany(users.get(3));
                cp.setCreator(users.get(5));
            });
            carPasses.stream().skip(40).limit(20).forEach(cp -> {
                cp.setCompany(users.get(0));
                cp.setCreator(users.get(1));
            });

            List<Role> roles = roleRepository.saveAll(getRoles());
            users.get(0).setRole(roles.get(0));
            users.get(1).setRole(roles.get(1));
            users.get(2).setRole(roles.get(2));
            users.get(3).setRole(roles.get(2));
            users.get(4).setRole(roles.get(3));
            users.get(5).setRole(roles.get(3));

            userRepository.saveAll(users);
            carPassRepository.saveAll(carPasses);

            logger.info("Generated demo data");
        };
    }

    private List<Role> getRoles() {
        return Stream.of(
                "Owner",
                "Guard",
                "Company",
                "Employee")
                .map(Role::new)
                .collect(Collectors.toList());
    }

    private List<User> getUsers() {
        User user1 = new User("OOO OWNER", "owner", "owner@email.ru", "+7 (777) 777-77-77", LocalDateTime.now());
        User user2 = new User("Guard Vasia", "guard", "guard@email.ru", "+6 (666) 666-66-66", LocalDateTime.now());
        User user3 = new User("OOO COMPANY", "company", "company@email.ru", "+5 (555) 555-55-55", LocalDateTime.now());
        User user4 = new User("OOO ROGA&COPITA", "rogacopita", "rogacopita@email.ru", "+8 (888) 888-88-88", LocalDateTime.now());
        User user5 = new User("Employee Ivan", "employee", "employee@email.ru", "+4 (444) 444-44-44", LocalDateTime.now());
        User user6 = new User("Anansky Andrey", "mhsn", "mhsn@email.ru", "+9 (999) 999-99-99", LocalDateTime.now());

        List<User> users = Arrays.asList(user1, user2, user3, user4, user5, user6);

        user1.setCompany(null);
        user1.setCreator(null);
        user1.setEnabled(true);
        user1.setPassword(passwordEncoder.encode("ownerpass"));

        user2.setCompany(user1);
        user2.setCreator(user1);
        user2.setPassword(passwordEncoder.encode("guardpass"));

        user3.setCompany(null);
        user3.setCreator(user1);
        user3.setPassword(passwordEncoder.encode("companypass"));

        user4.setCompany(null);
        user4.setCreator(user1);
        user4.setPassword(passwordEncoder.encode("rogacopitapass"));

        user5.setCompany(user3);
        user5.setCreator(user3);
        user5.setPassword(passwordEncoder.encode("employeepass"));

        user6.setCompany(user4);
        user6.setCreator(user4);
        user6.setPassword(passwordEncoder.encode("mhsnpass"));

        users.forEach(user -> {
            user.setRegDateTime(LocalDateTime.now());
            user.setLastActivity(LocalDateTime.now().minus(14, ChronoUnit.DAYS));
        });

        return users;
    }

    private List<CarPass> getCarPasses() {
        ExampleDataGenerator<CarPass> carPassGenerator = new ExampleDataGenerator<>(CarPass.class,
                LocalDateTime.now());
        carPassGenerator.setData(CarPass::setRegNum, DataType.IBAN);
        carPassGenerator.setData(CarPass::setArrivalDate, DataType.DATE_NEXT_7_DAYS);
        carPassGenerator.setData(CarPass::setRegDateTime, DataType.DATETIME_LAST_7_DAYS);

        int seed = 123;
        List<CarPass> carPasses = carPassGenerator.create(50, seed);
        carPasses.forEach(itm -> itm.setRegNum(itm.getRegNum().replaceAll(" ", "").substring(0, 8)));
        return carPasses;
    }

    private void initOther() {
        int seed = 123;
        ExampleDataGenerator<Company> companyGenerator = new ExampleDataGenerator<>(Company.class,
                LocalDateTime.now());
        companyGenerator.setData(Company::setName, DataType.COMPANY_NAME);
        List<Company> companies = companyRepository.saveAll(companyGenerator.create(5, seed));

        List<Status> statuses = statusRepository
                .saveAll(Stream.of("Imported lead", "Not contacted", "Contacted", "Customer", "Closed (lost)")
                        .map(Status::new).collect(Collectors.toList()));

        ExampleDataGenerator<Contact> contactGenerator = new ExampleDataGenerator<>(Contact.class,
                LocalDateTime.now());
        contactGenerator.setData(Contact::setFirstName, DataType.FIRST_NAME);
        contactGenerator.setData(Contact::setLastName, DataType.LAST_NAME);
        contactGenerator.setData(Contact::setEmail, DataType.EMAIL);

        Random r = new Random(seed);
        List<Contact> contacts = contactGenerator.create(50, seed).stream().map(contact -> {
            contact.setCompany(companies.get(r.nextInt(companies.size())));
            contact.setStatus(statuses.get(r.nextInt(statuses.size())));
            return contact;
        }).collect(Collectors.toList());

        contactRepository.saveAll(contacts);
    }
}
