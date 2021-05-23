package ru.volkov.getpass.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;
import lombok.RequiredArgsConstructor;
import ru.volkov.getpass.data.entity.Company;
import ru.volkov.getpass.data.entity.Contact;
import ru.volkov.getpass.data.entity.Status;
import ru.volkov.getpass.data.repository.CompanyRepository;
import ru.volkov.getpass.data.repository.ContactRepository;
import ru.volkov.getpass.data.repository.StatusRepository;

import java.util.List;

@RequiredArgsConstructor
@Endpoint
public class CrmEndpoint {

    private final ContactRepository contactRepository;
    private final CompanyRepository companyRepository;
    private final StatusRepository statusRepository;

    public CrmData getCrmData() {
        CrmData crmData = new CrmData();
        crmData.contacts = contactRepository.findAll();
        crmData.companies = companyRepository.findAll();
        crmData.statuses = statusRepository.findAll();
        return crmData;
    }

    public Contact saveContact(Contact contact) {
        contact.setCompany(companyRepository.findById(contact.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Could not find Company with id" + contact.getCompany().getId())));
        contact.setStatus(statusRepository.findById(contact.getStatus().getId())
                .orElseThrow(() -> new RuntimeException("Could not find Status with id" + contact.getStatus().getId())));
        return contactRepository.save(contact);
    }

    public void deleteContact(Integer contactId) {
        contactRepository.deleteById(contactId);
    }

    public static class CrmData {
        public List<Contact> contacts;
        public List<Company> companies;
        public List<Status> statuses;
    }
}