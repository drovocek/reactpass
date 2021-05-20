package com.example.application.data.endpoint;

import com.example.application.data.entity.Company;
import com.example.application.data.entity.Contact;
import com.example.application.data.entity.Status;
import com.example.application.data.repository.CompanyRepository;
import com.example.application.data.repository.ContactRepository;
import com.example.application.data.repository.StatusRepository;
import com.vaadin.flow.server.connect.Endpoint;

import java.util.List;

@Endpoint
public class CrmEndpoint {

    private ContactRepository contactRepository;
    private CompanyRepository companyRepository;
    private StatusRepository statusRepository;

    public CrmEndpoint(ContactRepository contactRepository, CompanyRepository companyRepository,
                       StatusRepository statusRepository) {
        this.contactRepository = contactRepository;
        this.companyRepository = companyRepository;
        this.statusRepository = statusRepository;

    }

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