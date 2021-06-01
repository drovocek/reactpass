package ru.volkov.getpass.data.generator;

import com.vaadin.flow.spring.annotation.SpringComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;
import ru.volkov.getpass.data.entity.*;
import ru.volkov.getpass.data.repository.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(ContactRepository contactRepository, CompanyRepository companyRepository,
                                      StatusRepository statusRepository, UserRepository userRepository, RoleRepository roleRepository) {

        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (contactRepository.count() != 0L) {
                logger.info("\n<<< Using existing database >>>");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");
            ExampleDataGenerator<Company> companyGenerator = new ExampleDataGenerator<>(Company.class,
                    LocalDateTime.now());
            companyGenerator.setData(Company::setName, DataType.COMPANY_NAME);
            List<Company> companies = companyRepository.saveAll(companyGenerator.create(5, seed));

            List<Status> statuses = statusRepository
                    .saveAll(Stream.of("Imported lead", "Not contacted", "Contacted", "Customer", "Closed (lost)")
                            .map(Status::new).collect(Collectors.toList()));

            logger.info("... generating 50 Contact entities...");
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

            List<Role> roles = roleRepository
                    .saveAll(Stream.of("Owner", "Guard", "Company", "Employee")
                            .map(Role::new).collect(Collectors.toList()));

            List<User> users = Arrays.asList(
                    new User("OOO OWNER", "owner", "owner@email.ru", "+7 (777) 777-77-77"),
                    new User("Guard Vasia", "guard", "guard@email.ru", "+6 (666) 666-66-66"),
                    new User("OOO COMPANY", "company", "company@email.ru", "+5 (555) 555-55-55"),
                    new User("OOO ROGA&COPITA", "rogacopita", "rogacopita@email.ru", "+8 (888) 888-88-88"),
                    new User("Employee Ivan", "employee", "employee@email.ru", "+4 (444) 444-44-44"),
                    new User("Anansky Andrey", "mhsn", "mhsn@email.ru", "+9 (999) 999-99-99")
            );

            users.get(0).setRole(roles.get(0));
            users.get(1).setRole(roles.get(1));
            users.get(2).setRole(roles.get(2));
            users.get(3).setRole(roles.get(2));
            users.get(4).setRole(roles.get(3));
            users.get(5).setRole(roles.get(3));

            userRepository.saveAll(users);

            logger.info("Generated demo data");
        };
    }

}
